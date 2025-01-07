<script lang="ts">
    import { getColor } from '$lib/utils/colors';
    import { toast } from 'svoast';
    import { onMount } from 'svelte';

    const { id, message, type, colorIndex = undefined, closable = true, duration = 5000, infinite = false, rich = false } = $props<{
        id: number;
        message: string;
        type: 'info' | 'attention' | 'success' | 'warning' | 'error';
        colorIndex?: number;
        closable?: boolean;
        duration?: number | string;
        infinite?: boolean;
        rich?: boolean;
    }>();

    let progress = $state(100);
    let progressInterval: NodeJS.Timer;

    const typeColorMap = {
        info: 0,
        attention: 1,
        success: 2,
        warning: 3,
        error: 4
    };

    const typeIcons = {
        info: 'ℹ️',
        attention: '👀',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };

    const finalColorIndex = $derived(typeof colorIndex === 'number' ? colorIndex : typeColorMap[type]);
    const icon = $derived(typeIcons[type]);

    onMount(() => {
        if (!infinite && duration) {
            const durationMs = typeof duration === 'string' ? parseInt(duration) : duration;
            const updateInterval = 100; // Changed from 10ms to 100ms
            const steps = durationMs / updateInterval;
            const decrementPerStep = 100 / steps;

            progressInterval = setInterval(() => {
                progress = Math.max(0, progress - decrementPerStep);
            }, updateInterval);

            return () => {
                if (progressInterval) clearInterval(progressInterval);
            };
        }
    });

    function closeToast() {
        if (closable) {
            toast.removeById(id);
        }
    }
</script>

<div class="neo-brutalist-toast {getColor(finalColorIndex)}">
    <div class="relative overflow-hidden">
        <div class="flex items-center gap-3 p-4">
            <!-- Icon -->
            <div class="flex-shrink-0 text-xl">
                {icon}
            </div>

            <!-- Content -->
            <div class="flex-grow">
                {#if rich}
                    {@html message}
                {:else}
                    <p class="whitespace-pre-line text-black dark:text-white">{message}</p>
                {/if}
            </div>

            <!-- Close Button -->
            {#if closable}
                <button
                    class="neo-brutalist-button flex-shrink-0 h-6 w-6 flex items-center justify-center text-sm bg-black text-white"
                    on:click={closeToast}
                >
                    ✕
                </button>
            {/if}
        </div>

        <!-- Progress Bar -->
        {#if !infinite && duration}
            <div class="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10 dark:bg-white/10">
                <div
                    class="h-full bg-black dark:bg-white transition-[width] duration-100 ease-linear"
                    style="width: {progress}%"
                />
            </div>
        {/if}
    </div>
</div>
