<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getColor } from '$lib/utils/colors';
    
    let { 
        heading = '',
        subheading = '',
        image = { src: '', alt: '' },
        colorIndex = 0,
        children,
        buttons
    } = $props<{
        heading?: string;
        subheading?: string;
        image?: { src?: string; alt?: string };
        colorIndex?: number;
        children?: Snippet;
        buttons?: Snippet;
    }>();
</script>

<div class="neo-brutalist-card {getColor(colorIndex)}">
    {#if image && image.src}
        <img src={image.src} alt={image.alt || ''} class="w-full h-48 object-cover border-b-2 border-black dark:border-white" />
    {/if}
    <div class="p-4 flex flex-col gap-4">
        {#if heading?.length > 0}
            <h3 class="text-xl font-bold font-mono">{heading}</h3>
        {/if}
        {#if subheading?.length > 0}
            <h4 class="text-lg font-mono">{subheading}</h4>
        {/if}
        <div class="content">
            {@render children?.()}
        </div>
        {#if buttons}
            <div class="buttons flex gap-2 mt-auto pt-4 border-t-2 border-black dark:border-white">
                {@render buttons()}
            </div>
        {/if}
    </div>
</div>
