<script lang="ts">
    import { getColor } from '$lib/utils/colors';

    let {
        name,
        value = '',
        options = [],
        colorIndex = 0,
        size = 'md',
        inline = false,
        disabled = false,
        required = false,
        error = '',
        success = '',
        label = '',
        onChange,
        ...props
    } = $props();

    const sizeClasses = $derived({
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6'
    }[size]);

    const containerClasses = $derived({
        sm: 'text-sm gap-2',
        md: 'text-base gap-3',
        lg: 'text-lg gap-4'
    }[size]);

    const groupClasses = $derived([
        inline ? 'flex gap-6' : 'flex flex-col gap-3',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        error ? 'text-red-500' : '',
        success ? 'text-green-500' : ''
    ].join(' '));

    function handleChange(optionValue: string) {
        if (!disabled) {
            value = optionValue;
            onChange?.(optionValue);
        }
    }
</script>

<div class="neo-brutalist-radio-group">
    {#if label}
        <label class="mb-2 block font-mono font-bold">{label}</label>
    {/if}
    
    <div class={groupClasses}>
        {#each options as option}
            <label 
                class="flex cursor-pointer items-center font-mono {containerClasses}"
                class:cursor-not-allowed={disabled}
            >
                <div class="relative {sizeClasses}">
                    <input
                        type="radio"
                        {name}
                        value={option.value}
                        checked={value === option.value}
                        {disabled}
                        {required}
                        on:change={() => handleChange(option.value)}
                        class="peer sr-only"
                        {...props}
                    />
                    <div class={[
                        'absolute inset-0 rounded-full border-2 border-black transition-all',
                        'peer-checked:border-[6px]',
                        getColor(colorIndex)
                    ].join(' ')} />
                </div>
                <span>{option.label}</span>
            </label>
        {/each}
    </div>

    {#if error}
        <p class="mt-1 font-mono text-sm text-red-500">{error}</p>
    {/if}
    {#if success}
        <p class="mt-1 font-mono text-sm text-green-500">{success}</p>
    {/if}
</div>

<style>
    .neo-brutalist-radio-group input[type="radio"] {
        appearance: none;
    }
</style>