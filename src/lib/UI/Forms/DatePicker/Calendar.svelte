<script lang="ts">
  import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
  import { getColor } from '$lib/utils/colors';
  import { DAYS, MONTHS } from './utils';  // Add this import!
  import { getMonthDays } from './utils';  // Add this import!
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    select: Date;
  }>();

  // Props
  let {
    selectedDate,
    min,
    max,
    startOfWeek = 0,
    colorIndex = 0,
    select = (date: Date) => {} // Add callback prop
  } = $props<{
    selectedDate: Date;
    min?: Date;
    max?: Date; 
    startOfWeek?: number;
    colorIndex?: number;
    select?: (date: Date) => void; // Add to type definition
  }>();

  // State
  let viewDate = $state(new Date(selectedDate));

  // Reactive values
  let monthDays = $derived(getMonthDays(viewDate, startOfWeek));
  let yearRange = $derived(getYearRange(min, max));

  // Navigation
  function navigate(amount: number) {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + amount);
    if (isValidNavigation(newDate)) {
      viewDate = newDate;
    }
  }

  function setYear(year: number) {
    const newDate = new Date(viewDate);
    newDate.setFullYear(year);
    if (isValidNavigation(newDate)) {
      viewDate = newDate;
    }
  }

  function selectDay(date: Date) {
    if (isValidDate(date)) {
      select(date);
    }
  }

  // Add these helper functions
  function getYearRange(min?: Date, max?: Date): number[] {
    const currentYear = new Date().getFullYear();
    const minYear = min ? min.getFullYear() : currentYear - 100;
    const maxYear = max ? max.getFullYear() : currentYear + 100;
    return Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => minYear + i
    );
  }

  function isValidNavigation(date: Date): boolean {
    if (min && date < new Date(min.getFullYear(), min.getMonth(), 1)) return false;
    if (max && date > new Date(max.getFullYear(), max.getMonth() + 1, 0)) return false;
    return true;
  }

  function isValidDate(date: Date): boolean {
    if (min && date < new Date(min.setHours(0,0,0,0))) return false;
    if (max && date > new Date(max.setHours(23,59,59,999))) return false;
    return true;
  }

  function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
</script>

<div class="w-full {getColor(colorIndex)}">
  <!-- Calendar header -->
  <div class="flex justify-between items-center mb-4">
    <div class="flex gap-2 items-center">
      <button
        class="neo-brutalist-button p-1 {getColor(colorIndex)}"
        on:click={() => navigate(-1)}
        disabled={!isValidNavigation(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}
      >
        <ArrowLeftOutline class="w-4 h-4" />
      </button>

      <select
        class="neo-brutalist-input p-1 {getColor(colorIndex)}"
        value={viewDate.getFullYear()}
        on:change={e => setYear(parseInt(e.currentTarget.value))}
      >
        {#each yearRange as year}
          <option value={year}>{year}</option>
        {/each}
      </select>

      <button
        class="neo-brutalist-button p-1 {getColor(colorIndex)}"
        on:click={() => navigate(1)}
        disabled={!isValidNavigation(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}
      >
        <ArrowRightOutline class="w-4 h-4" />
      </button>
    </div>

    <span class="font-mono font-bold">
      {MONTHS[viewDate.getMonth()]}
    </span>
  </div>

  <!-- Calendar grid -->
  <div class="grid grid-cols-7 gap-1">
    {#each DAYS.slice(startOfWeek).concat(DAYS.slice(0, startOfWeek)) as day}
      <div class="text-center font-mono font-bold text-sm">{day}</div>
    {/each}

    {#each monthDays as day}
      {#if day === null}
        <div></div>
      {:else}
        {@const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)}
        {@const disabled = !isValidDate(date)}
        <button
          class="neo-brutalist-button p-1 w-8 h-8 flex items-center justify-center
            {isSameDay(date, selectedDate) 
              ? getColor(colorIndex)
              : disabled
                ? 'opacity-50 cursor-not-allowed'
                : ''
            } {getColor(colorIndex)}"
          on:click={() => selectDay(date)}
          {disabled}
          title={disabled ? 'Date not available' : undefined}
        >
          {day}
        </button>
      {/if}
    {/each}
  </div>
</div>
