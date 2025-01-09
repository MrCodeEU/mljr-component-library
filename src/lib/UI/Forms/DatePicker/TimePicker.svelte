<script lang="ts">
  import { slide } from 'svelte/transition';
  import { getColor } from '$lib/utils/colors';
  import { formatTime } from './utils';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{
    change: Date;
  }>();

  let {
    value = new Date(),
    timeFormat = '24h',
    colorIndex = 0,
    change = (date: Date) => {} // Add callback prop
  } = $props<{
    value: Date;
    timeFormat?: '12h' | '24h';
    colorIndex?: number;
    change?: (date: Date) => void; // Add to type definition
  }>();

  // State
  let hours = $state(value.getHours());
  let minutes = $state(value.getMinutes());
  let period = $state<'AM' | 'PM'>(hours >= 12 ? 'PM' : 'AM');

  // Keep time values in sync with value prop
  $effect(() => {
    hours = value.getHours();
    minutes = value.getMinutes();
    period = hours >= 12 ? 'PM' : 'AM';
  });

  function updateTime(h: number, m: number) {
    const newDate = new Date(value);
    // If in 12h mode, adjust hours based on period
    if (timeFormat === '12h') {
      if (h === 12) h = period === 'AM' ? 0 : 12;
      else if (period === 'PM') h = h + 12;
    }
    newDate.setHours(h);
    newDate.setMinutes(m);
    change(newDate);
  }

  function handlePeriodChange(newPeriod: 'AM' | 'PM') {
    if (timeFormat === '12h') {
      const newHours = hours % 12 + (newPeriod === 'PM' ? 12 : 0);
      updateTime(newHours, minutes);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      const [h, m] = input.value.split(':').map(Number);
      updateTime(h, m);
      input.blur(); // Remove focus after accepting input
    }
  }
</script>

<div class="flex items-center justify-center gap-2 mt-4" transition:slide>
  <input
    type="time"
    class="neo-brutalist-input w-full text-center font-mono {getColor(colorIndex)}"
    value={formatTime(value, timeFormat)} 
    on:input={e => {
      const [h, m] = e.currentTarget.value.split(':').map(Number);
      updateTime(h, m);
    }}
    on:keydown={handleKeyDown}
  />

  {#if timeFormat === '12h'}
    <select
      class="neo-brutalist-input w-20 text-center font-mono {getColor(colorIndex)}"
      value={period}
      on:change={e => handlePeriodChange(e.currentTarget.value as 'AM' | 'PM')}
    >
      <option>AM</option>
      <option>PM</option>
    </select>
  {/if}
</div>
