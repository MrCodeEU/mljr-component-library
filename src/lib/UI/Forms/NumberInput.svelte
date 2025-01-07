<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { SvelteComponent } from 'svelte';
    import { getColor } from '$lib/utils/colors';
    import { ArrowUpOutline, ArrowDownOutline } from 'flowbite-svelte-icons';

    const dispatch = createEventDispatcher();

    // Props
    let {
        value = 0,
        min = -Infinity,
        max = Infinity,
        step = 1,
        label = '',
        placeholder = 'Enter a number',
        disabled = false,
        readonly = false,
        showButtons = true,
        required = false,
        error = '',
        success = '',
        size = 'md', // sm, md, lg
        colorIndex = 0,
        leftIcon = null as typeof SvelteComponent | null,
        rightIcon = null as typeof SvelteComponent | null,
    } = $props();

    // Internal states
    let inputElement: HTMLInputElement;
    let currentValue = $state(value);
    let touched = $state(false);
    let focused = $state(false);

    // Watch for prop changes
    $effect(() => {
        currentValue = value;
    });

    // Computed classes
    let containerClasses = $derived([
        'neo-brutalist-input-container',
        error ? 'input-error' : '',
        success ? 'input-success' : '',
        size === 'sm' ? 'text-sm' : '',
        size === 'lg' ? 'text-lg' : '',
    ].join(' '));

    let inputClasses = $derived([
        'neo-brutalist-input',
        getColor(colorIndex),
        size === 'sm' ? 'px-2 py-1' : '',
        size === 'md' ? 'px-3 py-2' : '',
        size === 'lg' ? 'px-4 py-3' : '',
        leftIcon ? 'pl-10' : '',
        rightIcon || showButtons ? 'pr-10' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
    ].join(' '));

    // Event handlers
    function handleInput(event: Event) {
        const input = event.target as HTMLInputElement;
        // Only allow numbers and some special characters
        const sanitizedValue = input.value.replace(/[^0-9.-]/g, '');
        const newValue = sanitizedValue === '' ? null : Number(sanitizedValue);
        
        if (!isNaN(newValue)) {
            currentValue = clampValue(newValue);
            dispatch('change', { value: currentValue });
        }
        // Always update input value to ensure it's clean
        input.value = currentValue?.toString() ?? '';
    }

    // Add keydown handler to prevent invalid input
    function handleKeyDown(event: KeyboardEvent) {
        // Allow: backspace, delete, tab, escape, enter, decimal point, minus
        if ([46, 8, 9, 27, 13, 110, 190, 189].indexOf(event.keyCode) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
            // Allow: home, end, left, right, up, down
            (event.keyCode >= 35 && event.keyCode <= 40)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
            (event.keyCode < 96 || event.keyCode > 105)) {
            event.preventDefault();
        }
    }

    function handleBlur() {
        touched = true;
        focused = false;
        dispatch('blur');
    }

    function handleFocus() {
        focused = true;
        dispatch('focus');
    }

    function increment() {
        if (disabled || readonly) return;
        currentValue = clampValue((currentValue || 0) + step);
        dispatch('change', { value: currentValue });
    }

    function decrement() {
        if (disabled || readonly) return;
        currentValue = clampValue((currentValue || 0) - step);
        dispatch('change', { value: currentValue });
    }

    function clampValue(val: number | null): number {
        if (val === null) return 0;
        return Math.min(Math.max(val, min), max);
    }
</script>

<style>
    /* Hide browser's default number input spinners */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    .movement-wrapper {
        @apply relative transition-transform;
    }

    .movement-wrapper:hover {
        @apply translate-x-[3px] translate-y-[3px];
    }

    .movement-wrapper:focus-within {
        @apply translate-x-[6px] translate-y-[6px];
    }

    .input-wrapper {
        @apply relative;
    }

    .number-input-buttons {
        @apply absolute inset-y-0 right-0 flex flex-col border-l-2 border-black z-10;
    }

    .number-input-buttons button {
        @apply flex-1 px-2 hover:bg-black/10 disabled:opacity-50 disabled:cursor-not-allowed;
        @apply flex items-center justify-center;
    }

    .number-input-buttons button:last-child {
        @apply border-t-2 border-black;
    }

    .icon-container {
        @apply absolute inset-y-0 flex items-center pointer-events-none z-10;
    }

    .icon-container.left {
        @apply left-0 pl-3;
    }

    .icon-container.right {
        @apply right-0 pr-3;
    }
</style>

<div class={containerClasses}>
    {#if label}
        <label for="number-input" class="block mb-2 font-bold">{label}</label>
    {/if}
    
    <div class="movement-wrapper">
        <div class="input-wrapper">
            {#if leftIcon}
                <div class="icon-container left">
                    <svelte:component this={leftIcon} class="w-5 h-5" />
                </div>
            {/if}

            <input
                id="number-input"
                type="number"
                bind:this={inputElement}
                value={currentValue ?? ''}
                class={inputClasses}
                {min}
                {max}
                {step}
                {disabled}
                {readonly}
                {required}
                {placeholder}
                on:input={handleInput}
                on:keydown={handleKeyDown}
                on:blur={handleBlur}
                on:focus={handleFocus}
            />

            {#if showButtons}
                <div class="number-input-buttons">
                    <button
                        type="button"
                        on:click={increment}
                        disabled={disabled || readonly || currentValue === max}
                        aria-label="Increment"
                    >
                        <ArrowUpOutline class="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        on:click={decrement}
                        disabled={disabled || readonly || currentValue === min}
                        aria-label="Decrement"
                    >
                        <ArrowDownOutline class="w-4 h-4" />
                    </button>
                </div>
            {:else if rightIcon}
                <div class="icon-container right">
                    <svelte:component this={rightIcon} class="w-5 h-5" />
                </div>
            {/if}
        </div>
    </div>
    {#if error && touched}
        <p class="mt-2 text-red-500 text-sm">{error}</p>
    {/if}

    {#if success && touched && !error}
        <p class="mt-2 text-green-500 text-sm">{success}</p>
    {/if}
</div>