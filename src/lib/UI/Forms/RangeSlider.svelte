<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { getColor } from '$lib/utils/colors';
    import { spring } from 'svelte/motion';

    interface Props {
        min?: number;
        max?: number;
        step?: number;
        dual?: boolean;
        float?: boolean;
        showTicks?: boolean;
        tickInterval?: number;
        showLabels?: boolean;
        labelPosition?: 'top' | 'bottom' | 'handle';
        disabled?: boolean;
        colorIndex?: number;
    }

    let { 
        min = 0,
        max = 100,
        step = 1,
        dual = false,
        float = true,
        showTicks = false,
        tickInterval = 10,
        showLabels = true,
        labelPosition = 'top',
        disabled = false,
        colorIndex = 0,
        value = $bindable(dual ? [min, max] : min)
    } = $props<Props>();

    // State
    let value1 = $state(min);
    let value2 = $state(max);
    let dragging = $state(false);
    let sliderWidth = $state(0);
    let sliderRef: HTMLElement;

    // Derived values
    let clampedValue1 = $derived(Math.max(min, Math.min(max, value1)));
    let clampedValue2 = $derived(Math.max(min, Math.min(max, value2)));

    // Ensure value2 is always greater than value1 in dual mode
    $effect(() => {
        if (dual && clampedValue1 > clampedValue2) {
            if (dragging) {
                value2 = clampedValue1;
            } else {
                value1 = clampedValue2;
            }
        }
    });

    // Custom events
    const dispatch = createEventDispatcher<{
        change: { value: number | [number, number] };
    }>();

    function emitChange() {
        dispatch('change', {
            value: dual ? [clampedValue1, clampedValue2] : clampedValue1
        });
    }

    // Handle position calculation
    function valueToPosition(value: number): number {
        const percentage = ((value - min) / (max - min)) * 100;
        return Math.max(0, Math.min(100, percentage));
    }

    function positionToValue(position: number): number {
        const rawValue = (position / 100) * (max - min) + min;
        if (!float) {
            return Math.round(rawValue / step) * step;
        }
        return Number(rawValue.toFixed(2));
    }

    // Add spring animations for smoother transitions
    const springOpts = { stiffness: 0.2, damping: 0.7 }; // Faster spring movement
    let springValue1 = spring(value1, springOpts);
    let springValue2 = spring(value2, springOpts);

    // Update spring values when state changes
    $effect(() => {
        springValue1.set(clampedValue1);
        springValue2.set(clampedValue2);
    });

    // Handle drag events
    function onMouseDown(e: MouseEvent, handle: 'first' | 'second') {
        if (disabled) return;
        
        dragging = true;
        const startX = e.clientX;
        const slider = sliderRef.getBoundingClientRect();
        const initialValue = handle === 'first' ? value1 : value2;

        function onMouseMove(e: MouseEvent) {
            const dx = e.clientX - startX;
            const percent = (dx / slider.width) * 100;
            const newPosition = valueToPosition(initialValue) + percent;
            const newValue = positionToValue(Math.max(0, Math.min(100, newPosition)));

            if (handle === 'first') {
                value1 = newValue;
            } else {
                value2 = newValue;
            }
            emitChange();
        }

        function onMouseUp() {
            dragging = false;
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    // Modify the handle label display function
    function formatValue(value: number) {
        return float ? value.toFixed(2) : value.toFixed(0);
    }
</script>

<div class="slider-container">
    <!-- Add outer container with flex layout -->
    <div class="flex items-center gap-4">
        {#if showLabels && labelPosition !== 'handle'}
            <span class="min-label">{min}</span>
        {/if}

        <div
            class="neo-brutalist-slider flex-1 {getColor(colorIndex)}"
            class:disabled={disabled}
            bind:this={sliderRef}
        >
            <div class="slider-track">
                <div
                    class="slider-fill"
                    style:left="{dual ? valueToPosition($springValue1) : 0}%"
                    style:width="{dual ? 
                        valueToPosition($springValue2) - valueToPosition($springValue1) : 
                        valueToPosition($springValue1)}%"
                />
                
                {#if showTicks}
                    {#each Array(Math.floor((max - min) / tickInterval) + 1) as _, i}
                        <div
                            class="tick"
                            style:left="{(i * tickInterval / (max - min)) * 100}%"
                        />
                    {/each}
                {/if}

                <!-- First Handle -->
                <div
                    class="neo-brutalist-slider-handle"
                    class:handle-with-label={showLabels && labelPosition === 'handle'}
                    style:left="{valueToPosition($springValue1)}%"
                    on:mousedown={(e) => onMouseDown(e, 'first')}
                >
                    {#if showLabels && labelPosition === 'handle'}
                        <span class="handle-inner-label">
                            {formatValue(clampedValue1)}
                        </span>
                    {:else if showLabels && labelPosition !== 'top'}
                        <span class="label" class:label-bottom={labelPosition === 'bottom'}>
                            {formatValue(clampedValue1)}
                        </span>
                    {/if}
                </div>

                <!-- Second Handle (if dual mode) -->
                {#if dual}
                    <div
                        class="neo-brutalist-slider-handle"
                        class:handle-with-label={showLabels && labelPosition === 'handle'}
                        style:left="{valueToPosition($springValue2)}%"
                        on:mousedown={(e) => onMouseDown(e, 'second')}
                    >
                        {#if showLabels && labelPosition === 'handle'}
                            <span class="handle-inner-label">
                                {formatValue(clampedValue2)}
                            </span>
                        {:else if showLabels && labelPosition !== 'top'}
                            <span class="label" class:label-bottom={labelPosition === 'bottom'}>
                                {formatValue(clampedValue2)}
                            </span>
                        {/if}
                    </div>
                {/if}
            </div>

            {#if showLabels && labelPosition === 'top'}
                <div class="handle-labels">
                    <span class="handle-label" style:left="{valueToPosition($springValue1)}%">
                        {formatValue(clampedValue1)}
                    </span>
                    {#if dual}
                        <span class="handle-label" style:left="{valueToPosition($springValue2)}%">
                            {formatValue(clampedValue2)}
                        </span>
                    {/if}
                </div>
            {/if}
        </div>

        {#if showLabels && labelPosition !== 'handle'}
            <span class="max-label">{max}</span>
        {/if}
    </div>
</div>

<style>
    .slider-container {
        width: 100%;
        padding: 1rem 0;
    }

    .neo-brutalist-slider {
        position: relative;
        width: 100%;
        height: 40px;
        padding: 10px 0;
    }

    .slider-track {
        position: relative;
        height: 8px;
        background-color: #e0e0e0;
        border: 2px solid black;
    }

    .slider-fill {
        position: absolute;
        height: 100%;
        background-color: black;
        transition: width 0.1s ease-out;
    }

    .neo-brutalist-slider-handle {
        position: absolute;
        top: 50%;
        width: 24px;  /* Reverted to original size */
        height: 24px; /* Reverted to original size */
        background-color: #ffffff;
        border: 2px solid black;
        transform: translate(-50%, -50%);
        cursor: pointer;
        transition: all 0.1s ease-out; /* Faster transition */
        box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Add specific styling for handles with labels */
    .handle-with-label {
        width: auto;     /* Allow width to adapt to content */
        min-width: 40px; /* Minimum width to ensure good appearance */
        padding: 0 8px;  /* Add horizontal padding for text */
    }

    .neo-brutalist-slider-handle:hover {
        transform: translate(calc(-50% + 1px), calc(-50% + 1px));
        box-shadow: 1px 1px 0px 0px rgba(0,0,0,1);
    }

    .tick {
        position: absolute;
        width: 2px;
        height: 8px;
        background-color: black;
        transform: translateX(-50%);
    }

    .label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding: 2px 6px;
        border: 2px solid black;
        background-color: white;
        font-size: 14px;
        min-width: 40px;
        text-align: center;
        box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
    }

    .label-bottom {
        top: calc(100% + 10px);
    }

    .label:not(.label-bottom) {
        bottom: calc(100% + 10px);
    }

    .handle-labels {
        position: absolute;
        width: 100%;
        top: -35px;
        pointer-events: none;
    }

    .handle-label {
        position: absolute;
        transform: translateX(-50%);
        padding: 2px 6px;
        border: 2px solid black;
        background-color: white;
        font-size: 14px;
        min-width: 40px;
        text-align: center;
        box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
    }

    .handle-inner-label {
        font-size: 13px;  /* Slightly increased from 12px */
        font-weight: bold;
        text-align: center;
        user-select: none;
        padding: 2px;     /* Added padding */
        min-width: 36px;  /* Added minimum width */
        white-space: nowrap; /* Prevent text wrapping */
    }

    .min-label,
    .max-label {
        font-size: 14px;
        font-weight: bold;
        padding: 2px 6px;
        min-width: 40px;
        text-align: center;
        background-color: white;
        border: 2px solid black;
        box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
    }

    /* Remove the old labels styles */
    .labels {
        display: none;
    }

    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    /* Add this new style for smoother animations */
    .slider-fill,
    .neo-brutalist-slider-handle {
        will-change: transform, width, left;
    }
</style>