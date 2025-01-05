<script lang="ts">
    import { getColor } from '$lib/utils/colors';

    interface Props {
        variant?: 'default' | 'outline' | 'text';
        size?: 'sm' | 'md' | 'lg';
        rounded?: boolean;
        colorIndex?: number;
        type?: 'button' | 'submit' | 'reset';
        disabled?: boolean;
    }

    let { 
        variant = 'default',
        size = 'md',
        rounded = false,
        colorIndex = 0,
        type = 'button',
        disabled = false
    } = $props();

    const sizeClasses = $derived({
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    }[size]);

    const classes = $derived([
        'neo-brutalist-button',
        sizeClasses,
        rounded ? 'rounded-md' : '',
        variant === 'outline' ? 'bg-transparent border-current hover:bg-transparent' : getColor(colorIndex),
        variant === 'text' ? 'border-0 shadow-none hover:shadow-none' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
    ].join(' '));
</script>

<button
    {type}
    {disabled}
    class={classes}
    on:click
>
    <slot />
</button>
