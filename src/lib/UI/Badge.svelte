<script lang="ts">
    import { getColor } from '$lib/utils/colors';

    interface Props {
        text?: string;
        size?: 'sm' | 'md' | 'lg';
        colorIndex?: number;
        leftIcon?: () => void;    // Icon component
        rightIcon?: () => void;   // Icon component 
        children?: () => void;    // Default snippet for content
    }

    let { 
        text = '', 
        leftIcon,
        rightIcon,
        children,
        colorIndex = 0,
        size = 'md'
    } = $props<Props>();

    const sizeClasses = {
        sm: 'text-xs p-1.5',
        md: 'text-sm p-2', 
        lg: 'text-base p-3'
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    // Update icon size mappings with smaller values
    const iconSizeMap = {
        sm: '14',
        md: '16',
        lg: '18'
    };

    // Add container classes for icons to maintain consistent sizing
    const iconContainerClasses = {
        sm: 'w-3.5 h-3.5',
        md: 'w-4 h-4',
        lg: 'w-4.5 h-4.5'
    };
</script>

<div class={`
    neo-brutalist-badge
    inline-flex flex-col
    ${getColor(colorIndex)}
    font-mono font-bold
    ${children ? 'pb-2' : ''}
`}>
    <div class={`
        inline-flex items-center gap-1.5
        ${sizeClasses[size]}
    `}>
        {#if leftIcon}
            <div class={iconContainerClasses[size]}>
                <svelte:component this={leftIcon} size={iconSizeMap[size]} />
            </div>
        {/if}

        {#if text}
            <span>{text}</span>
        {/if}

        {#if rightIcon}
            <div class={iconContainerClasses[size]}>
                <svelte:component this={rightIcon} size={iconSizeMap[size]} />
            </div>
        {/if}
    </div>

    {#if children}
        <div class={`
            px-2
            ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}
            text-gray-600 dark:text-gray-300
        `}>
            {@render children()}
        </div>
    {/if}
</div>