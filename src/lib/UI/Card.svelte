<script lang="ts">
    interface Props {
        heading?: string;
        subheading?: string;
        image?: {
            src: string;
            alt: string;
        };
        colorIndex?: number;
    }

    import { getColor } from '$lib/utils/colors';
    import Button from './Button.svelte';
    let { heading, subheading, image, colorIndex = 0 } = $props();
</script>

<div class="neo-brutalist-card {getColor(colorIndex)}">
    {#if image}
        <img src={image.src} alt={image.alt} class="w-full h-48 object-cover border-b-2 border-black dark:border-gray-600">
    {/if}
    <div class="p-4 flex flex-col gap-4">
        {#if heading}
            <h3 class="text-xl font-bold font-mono">{heading}</h3>
        {/if}
        {#if subheading}
            <h4 class="text-lg font-mono">{subheading}</h4>
        {/if}
        <div class="content">
            <slot />
        </div>
        <div class="buttons flex gap-2 mt-auto pt-4 border-t-2 border-black dark:border-gray-600">
            <slot name="buttons" />
        </div>
    </div>
</div>
