<script lang="ts">
    import { spring } from 'svelte/motion';
    import { getColor, getColorHex } from '$lib/utils/colors';
    
    type Direction = 'up' | 'down' | 'left' | 'right';
    
    let { 
        image = '',
        name = '',
        subheading = '',
        size = 'md',
        colorIndex = 0,
        showName = true,
        showSubheading = true,
        direction = 'down' as Direction,
        rounded = true,
    } = $props();

    const sizeMap = {
        sm: '32px',
        md: '48px',
        lg: '64px',
        xl: '96px'
    };

    const directionStyles = {
        up: 'flex-col-reverse items-center w-full',
        down: 'flex-col items-center w-full',
        left: 'flex-row-reverse items-center w-auto',
        right: 'flex-row items-center w-auto'
    };

    const textAlignStyles = {
        up: 'text-center',
        down: 'text-center',
        left: 'text-right',
        right: 'text-left'
    };

    const sizeValue = $derived(sizeMap[size] || sizeMap.md);
    const colorClasses = $derived(getColor(colorIndex));
    const directionClass = $derived(directionStyles[direction]);
    const textAlignClass = $derived(textAlignStyles[direction]);
    
    // Reactive animation for hover effect
    const scale = spring(1, {
        stiffness: 0.2,
        damping: 0.4
    });

    // Handle hover animations
    function onMouseEnter() {
        scale.set(1.05);
    }

    function onMouseLeave() {
        scale.set(1);
    }
</script>

<div 
    class="avatar-container {directionClass}"
    style:--size={sizeValue}
    style:transform={`scale(${$scale})`}
    on:mouseenter={onMouseEnter}
    on:mouseleave={onMouseLeave}
>
    <div 
        class="avatar-image-container neo-brutalist-button {colorClasses}"
        class:rounded={rounded}
    >
        {#if image}
            <img 
                src={image} 
                alt={name || 'Avatar'} 
                class:rounded={rounded}
            />
        {:else}
            <div class="avatar-placeholder">
                {name ? name[0].toUpperCase() : '?'}
            </div>
        {/if}
    </div>
    
    <div class="text-container {textAlignClass} {direction === 'left' || direction === 'right' ? 'mx-3' : 'my-2'}">
        {#if showName && name}
            <span class="name">{name}</span>
        {/if}
        
        {#if showSubheading && subheading}
            <span class="subheading">{subheading}</span>
        {/if}
    </div>
</div>

<style>
    .avatar-container {
        display: flex;
        gap: 0.25rem;
        transition: transform 0.2s ease;
    }

    .avatar-image-container {
        flex: 0 0 auto;
        width: var(--size);
        height: var(--size);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .rounded {
        border-radius: 50%;
    }

    .text-container {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .avatar-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: calc(var(--size) * 0.4);
        font-weight: bold;
    }

    .name {
        font-weight: 600;
        font-size: 0.9rem;
        @apply text-gray-900 dark:text-gray-100;
    }

    .subheading {
        font-size: 0.8rem;
        @apply text-gray-600 dark:text-gray-400;
    }
</style>