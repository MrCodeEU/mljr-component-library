<script lang="ts">
    import { Progressbar } from 'flowbite-svelte';
    import { getColor } from '$lib/utils/colors';
    import { cubicOut } from 'svelte/easing';

    interface Props {
        progress?: number;
        colorIndex?: number;
        size?: 'sm' | 'md' | 'lg' | 'xl';
        showLabel?: boolean;
        label?: string;
        animate?: boolean;
        duration?: number;
    }

    let { 
        progress = 0,
        colorIndex = 0,
        size = 'md',
        showLabel = false,
        label = '',
        animate = false,
        duration = 400
    } = $props();
    
    const sizeMap = {
        sm: 'h-3',
        md: 'h-5',
        lg: 'h-7',
        xl: 'h-9'
    };

    const colorClasses = $derived(getColor(colorIndex));
    const heightClass = $derived(sizeMap[size]);
</script>

<div class="neo-brutalist-progress">
    <div class="p-[2px] -m-[1px]">
        <Progressbar
            progress={progress}
            size={heightClass}
            labelInside={showLabel}
            labelOutside={label}
            animate={animate}
            tweenDuration={duration}
            easing={cubicOut}
            divClass="w-full bg-gray-200 dark:bg-gray-700 border border-black rounded-none"
            progressClass="rounded-none {colorClasses} h-full"
            labelInsideClass="font-mono text-xs font-bold text-black dark:text-white flex items-center justify-center h-full"
        />
    </div>
</div>
