<script lang="ts">
    import { getColor } from '$lib/utils/colors';
    import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    import { fade, slide } from 'svelte/transition';

    // Props with $props()
    let {
        mode = 'full',
        value = new Date(),
        min = null,
        max = null,
        disabled = false,
        colorIndex = 0,
        label = undefined,
        error = undefined,
        success = undefined,
        helper = undefined,
        format = 'MM/dd/yyyy',
        size = 'md',
        timeFormat = '24h',
        startOfWeek = 0
    } = $props<{
        mode?: 'full' | 'year' | 'month-year' | 'time' | 'datetime';
        value?: Date;
        min?: Date | null;
        max?: Date | null;
        disabled?: boolean;
        colorIndex?: number;
        label?: string;
        error?: string;
        success?: string;
        helper?: string;
        format?: string;
        size?: 'sm' | 'md' | 'lg';
        timeFormat?: '12h' | '24h';
        startOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday, etc.
    }>();

    // Internal states - remove $state from viewDate since it's derived
    let viewDate = new Date(value);
    let showCalendar = $state(false);
    let containerRef: HTMLDivElement;
    let currentYear = viewDate.getFullYear();

    // Derived values
    let containerClasses = $derived([
        'neo-brutalist-input-container',
        error ? 'input-error' : '',
        success ? 'input-success' : '',
    ].join(' '));

    let sizeClasses = $derived({
        sm: 'text-sm p-1',
        md: 'p-2',
        lg: 'text-lg p-3'
    }[size]);

    // Adjust days array based on start of week
    let sortedDays = $derived(() => {
        const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return [...daysArray.slice(startOfWeek), ...daysArray.slice(0, startOfWeek)];
    });

    // Update viewDate when value changes
    $effect(() => {
        viewDate = new Date(value);
        currentYear = viewDate.getFullYear();
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];

    // Helper functions
    function getDaysInMonth(year: number, month: number): number {
        return new Date(year, month + 1, 0).getDate();
    }

    function getMonthDays() {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = getDaysInMonth(year, month);
        
        const days: (number | null)[] = [];
        const adjustedFirstDay = (firstDay - startOfWeek + 7) % 7;
        
        for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);
        
        return days;
    }

    function isValidDate(date: Date): boolean {
        if (min && date < min) return false;
        if (max && date > max) return false;
        return true;
    }

    function formatTime(date: Date): string {
        if (timeFormat === '12h') {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        }
        return date.toTimeString().slice(0, 5);
    }

    function formatDate(date: Date): string {
        let result = format;
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        result = result.replace('dd', day);
        result = result.replace('MM', month);
        result = result.replace('yyyy', year.toString());
        result = result.replace('HH', hours);
        result = result.replace('mm', minutes);
        
        return result;
    }

    // Event handlers
    function selectDate(day: number) {
        if (disabled) return;
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        if (isValidDate(newDate)) {
            if (mode === 'datetime') {
                // Preserve time from existing value
                newDate.setHours(value.getHours(), value.getMinutes());
            }
            value = newDate;
            showCalendar = false;
        }
    }

    function updateTime(timeStr: string) {
        if (disabled) return;
        
        let hours: number;
        let minutes: number;
        
        if (timeFormat === '12h') {
            const [time, period] = timeStr.split(' ');
            const [h, m] = time.split(':').map(Number);
            hours = h % 12;
            if (period === 'PM') hours += 12;
            minutes = m;
        } else {
            [hours, minutes] = timeStr.split(':').map(Number);
        }

        const newDate = new Date(value);
        newDate.setHours(hours, minutes);
        if (isValidDate(newDate)) {
            value = newDate;
        }
    }

    $effect(() => {
        // Keep viewDate in sync with value
        if (value) {
            viewDate = new Date(value);
        }
    });

    function handleInputClick(event: MouseEvent) {
        event.stopPropagation();
        if (!disabled) {
            showCalendar = !showCalendar;
        }
    }

    // Add show/hide functions
    function toggleCalendar(event?: MouseEvent) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (!disabled) {
            showCalendar = !showCalendar;
        }
    }

    function hideCalendar() {
        showCalendar = false;
    }

    onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef && !containerRef.contains(event.target as Node)) {
                hideCalendar();
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // Add year range calculation
    let yearRange = $derived(() => {
        const currentYear = new Date().getFullYear();
        const minYear = min ? min.getFullYear() : currentYear - 100;
        const maxYear = max ? max.getFullYear() : currentYear + 100;
        return Array.from(
            { length: maxYear - minYear + 1 },
            (_, i) => minYear + i
        );
    });

    // Modify month navigation to handle year changes
    function changeMonth(delta: number) {
        const newDate = new Date(viewDate);
        newDate.setMonth(viewDate.getMonth() + delta);
        
        if ((!min || newDate >= min) && (!max || newDate <= max)) {
            viewDate = newDate;
        }
    }

    // Add date validation check
    function isDateDisabled(date: Date): boolean {
        if (min && date < new Date(min.setHours(0,0,0,0))) return true;
        if (max && date > new Date(max.setHours(23,59,59,999))) return true;
        return false;
    }

    // Instead, modify the currentYear binding to update viewDate directly:
    function handleYearChange(year: number) {
        const newDate = new Date(viewDate);
        newDate.setFullYear(year);
        if ((!min || newDate >= min) && (!max || newDate <= max)) {
            viewDate = newDate;
        }
    }
</script>

<div class={containerClasses} bind:this={containerRef}>
    {#if label}
        <label class="block mb-2 font-mono font-bold">{label}</label>
    {/if}

    <div class="relative">
        <input
            type="text"
            class="neo-brutalist-input {sizeClasses} {getColor(colorIndex)}"
            readonly
            value={formatDate(value)}
            on:click={toggleCalendar}
            {disabled}
        />

        {#if showCalendar}
            <div 
                class="calendar neo-brutalist-container {getColor(colorIndex)} absolute top-full left-0 mt-2 p-4 z-50"
                transition:fade={{ duration: 150 }}
                on:click|stopPropagation
            >
                <div class="header flex justify-between items-center mb-4">
                    <div class="flex gap-2 items-center">
                        <button
                            class="neo-brutalist-button p-1 {getColor(colorIndex)}"
                            on:click={() => changeMonth(-1)}
                            disabled={min && viewDate.getMonth() === min.getMonth() && viewDate.getFullYear() === min.getFullYear()}
                        >
                            <ArrowLeftOutline class="w-4 h-4" />
                        </button>
                        
                        <select
                            class="neo-brutalist-input p-1 {getColor(colorIndex)}"
                            value={currentYear}
                            on:change={(e) => handleYearChange(parseInt(e.currentTarget.value))}
                        >
                            {#each yearRange as year}
                                <option value={year}>{year}</option>
                            {/each}
                        </select>
                        
                        <button
                            class="neo-brutalist-button p-1 {getColor(colorIndex)}"
                            on:click={() => changeMonth(1)}
                            disabled={max && viewDate.getMonth() === max.getMonth() && viewDate.getFullYear() === max.getFullYear()}
                        >
                            <ArrowRightOutline class="w-4 h-4" />
                        </button>
                    </div>
                    <span class="font-mono font-bold">
                        {months[viewDate.getMonth()]}
                    </span>
                </div>

                <div class="days-grid grid grid-cols-7 gap-1">
                    {#each sortedDays as day}
                        <div class="text-center font-mono font-bold text-sm">{day}</div>
                    {/each}

                    {#each getMonthDays() as day}
                        {#if day === null}
                            <div></div>
                        {:else}
                            {@const currentDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)}
                            {@const isDisabled = isDateDisabled(currentDate)}
                            <button
                                class="neo-brutalist-button p-1 w-8 h-8 flex items-center justify-center
                                       {day === value.getDate() && 
                                        viewDate.getMonth() === value.getMonth() && 
                                        viewDate.getFullYear() === value.getFullYear()
                                            ? `${getColor(colorIndex)} font-bold`
                                            : isDisabled 
                                                ? 'opacity-50 cursor-not-allowed'
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'}"
                                on:click={() => selectDate(day)}
                                disabled={disabled || isDisabled}
                                title={isDisabled ? 'Date not available' : undefined}
                            >
                                {day}
                            </button>
                        {/if}
                    {/each}
                </div>

                {#if mode === 'datetime'}
                    <div class="mt-4" transition:slide>
                        <div class="time-picker neo-brutalist-container p-2 {getColor(colorIndex)}">
                            {#if timeFormat === '12h'}
                                <div class="flex items-center justify-center gap-2">
                                    <input
                                        type="time"
                                        class="neo-brutalist-input w-32 text-center text-xl font-mono {getColor(colorIndex)}"
                                        value={value.toTimeString().slice(0, 5)}
                                        on:input={(e) => updateTime(e.currentTarget.value)}
                                        {disabled}
                                    />
                                    <select
                                        class="neo-brutalist-input w-20 text-center text-xl font-mono {getColor(colorIndex)}"
                                        value={value.getHours() >= 12 ? 'PM' : 'AM'}
                                        on:change={(e) => {
                                            const newHours = value.getHours() % 12 + (e.currentTarget.value === 'PM' ? 12 : 0);
                                            updateTime(`${newHours}:${value.getMinutes()}`);
                                        }}
                                        {disabled}
                                    >
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                </div>
                            {:else}
                                <input
                                    type="time"
                                    class="neo-brutalist-input w-full text-center text-xl font-mono {getColor(colorIndex)}"
                                    value={formatTime(value)}
                                    on:input={(e) => updateTime(e.currentTarget.value)}
                                    {disabled}
                                />
                            {/if}
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    {#if error}
        <p class="mt-2 font-mono text-sm text-red-500 dark:text-red-400">{error}</p>
    {/if}
    {#if success}
        <p class="mt-2 font-mono text-sm text-green-500 dark:text-green-400">{success}</p>
    {/if}
    {#if helper}
        <p class="mt-2 font-mono text-sm text-gray-500 dark:text-gray-400">{helper}</p>
    {/if}
</div>

<style lang="postcss">
    .datepicker {
        position: relative;
        display: inline-block;
    }

    .calendar {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border: 1px solid #ccc;
        padding: 1rem;
        z-index: 1000;
        min-width: 300px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .days-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .days-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.5rem;
    }

    .selected {
        background: #007bff;
        color: white;
    }

    button {
        padding: 0.5rem;
        border: 1px solid #ccc;
        background: none;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    input {
        padding: 0.5rem;
        border: 1px solid #ccc;
    }

    input:disabled {
        background: #eee;
        cursor: not-allowed;
    }

    .time-picker {
        border-radius: 4px;
        padding: 0.5rem;
    }

    .time-picker input[type="time"] {
        border: none;
        background: transparent;
        font-size: 1.25rem;
        width: 100%;
        text-align: center;
        font-family: monospace;
    }

    .time-picker input[type="time"]::-webkit-calendar-picker-indicator {
        display: none;
    }

    select {
        appearance: none;
        padding: 0.25rem 1rem;
        border-radius: 4px;
        font-family: monospace;
        cursor: pointer;
    }

    /* Hide spinner buttons for time input */
    input[type="time"]::-webkit-inner-spin-button,
    input[type="time"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>