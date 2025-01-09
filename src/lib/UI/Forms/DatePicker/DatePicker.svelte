<script lang="ts">
  import Calendar from './Calendar.svelte';
  import TimePicker from './TimePicker.svelte';
  import { fade } from 'svelte/transition';
  import { getColor } from '$lib/utils/colors';
  import { formatDate } from './utils';

  // Props
  let {
    value = new Date(),
    min,
    max,
    mode = 'date',
    format = 'MM/dd/yyyy',
    timeFormat = '24h',
    startOfWeek = 0,
    colorIndex = 0,
    disabled = false,
    label,
    error,
    success,
    helper,
    size = 'md',
    change = (date: Date) => {}  // Add callback prop
  } = $props<{
    value?: Date;
    min?: Date;
    max?: Date;
    mode?: 'date' | 'time' | 'datetime';
    format?: string;
    timeFormat?: '12h' | '24h';
    startOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    colorIndex?: number;
    disabled?: boolean;
    label?: string;
    error?: string;
    success?: string;
    helper?: string;
    size?: 'sm' | 'md' | 'lg';
    change?: (date: Date) => void;  // Add to type definition
  }>();

  // Core state
  let selectedDate = $state(value);
  let isOpen = $state(false);
  let containerRef: HTMLDivElement;

  // Computed styles 
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

  // Ensure initial date is within min/max range
  $effect(() => {
    if (min && value < min) value = new Date(min);
    if (max && value > max) value = new Date(max);
    selectedDate = value;
  });

  // Keep selectedDate in sync with value 
  $effect(() => {
    selectedDate = value;
  });

  // Event handlers without emit
  function handleDateChange(date: Date) {
    if (disabled) return;
    selectedDate = date;
    value = date;
    change(date);
    if (mode === 'date') {
      isOpen = false;
    }
  }

  function handleTimeChange(time: Date) {
    if (disabled || !(time instanceof Date)) return;
    
    selectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    value = selectedDate;
    change(selectedDate);
  }

  // Click outside handling
  function handleClickOutside(e: MouseEvent) {
    if (containerRef && !containerRef.contains(e.target as Node)) {
      isOpen = false;
    }
  }

  $effect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  });
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
      value={formatDate(selectedDate, { format, mode, timeFormat })} 
      on:click={() => !disabled && (isOpen = !isOpen)}
      {disabled}
    />

    {#if isOpen}
      <div
        class="absolute top-full left-0 mt-2 z-50"
        transition:fade={{ duration: 150 }}
        on:click|stopPropagation
      >
        <div class="neo-brutalist-container p-4 {getColor(colorIndex)}">
          {#if mode !== 'time'}
            <Calendar
              {selectedDate}
              {min}
              {max}
              {startOfWeek}
              {colorIndex}
              select={handleDateChange}
            />
          {/if}

          {#if mode !== 'date'} 
            <TimePicker
              value={selectedDate}
              {timeFormat}
              {colorIndex}
              change={handleTimeChange}
            />
          {/if}
        </div>
      </div>
    {/if}
  </div>

  {#if error}
    <p class="mt-2 font-mono text-sm text-red-500">{error}</p>
  {/if}
  {#if success}  
    <p class="mt-2 font-mono text-sm text-green-500">{success}</p>
  {/if}
  {#if helper}
    <p class="mt-2 font-mono text-sm text-gray-500">{helper}</p>
  {/if}
</div>
