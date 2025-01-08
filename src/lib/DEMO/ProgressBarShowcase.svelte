<script lang="ts">
    import ProgressBar from '$lib/UI/ProgressBar.svelte';
    import { onMount } from 'svelte';

    let animatedProgress = $state(0);
    let interval: number;

    onMount(() => {
        interval = window.setInterval(() => {
            animatedProgress = (animatedProgress + 1) % 101;
        }, 100);

        return () => {
            if (interval) clearInterval(interval);
        };
    });
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Progress Bar Variants</h2>
    <div class="flex flex-col gap-6">
        <div class="space-y-4">
            <ProgressBar progress={75} colorIndex={0} size="sm" />
            <ProgressBar progress={60} colorIndex={1} size="md" />
            <ProgressBar progress={45} colorIndex={2} size="lg" />
            <ProgressBar progress={30} colorIndex={3} size="xl" />
        </div>

        <div class="space-y-4">
            <ProgressBar progress={80} colorIndex={4} size="md" showLabel />
            <ProgressBar progress={65} colorIndex={5} size="lg" label="Loading..." showLabel />
        </div>

        <div>
            <ProgressBar
                progress={animatedProgress}
                colorIndex={2}
                size="md"
                showLabel
                animate
                duration={200}
            />
        </div>
    </div>
</div>
