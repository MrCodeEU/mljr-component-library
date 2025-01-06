<script lang="ts">
    import { getColor } from '$lib/utils/colors';

    let { 
        size = 'md',
        colorIndex = 0,
        rounded = false,
        variant = 'default',
        disabled = false,
        onclick,
        children,
        ...props
    } = $props();

    const sizeClasses = $derived({
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    }[size]);

    const buttonClasses = $derived([
        sizeClasses,
        rounded ? 'rounded-md' : '',
        getColor(colorIndex, variant),
        disabled ? 'opacity-50 cursor-not-allowed' : ''
    ].join(' '));

    function handleClick(event: MouseEvent) {
        onclick?.(event);
    }
</script>

<button
    class="neo-brutalist-button {buttonClasses}"
    {onclick}
    {...props}
>
    {@render children?.()}
</button>
