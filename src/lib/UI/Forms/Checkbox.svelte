<script lang="ts">
    import { getColor } from '$lib/utils/colors';

    let {
        label = '',
        checked = false,
        disabled = false,
        required = false,
        error = '',
        helper = '',
        colorIndex = 0,
        name = '',
        value = 'on',
        inline = false,
        id = crypto.randomUUID()
    } = $props();

    const checkboxClasses = $derived([
        'neo-brutalist-checkbox',
        getColor(colorIndex),
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        error ? 'checkbox-error' : ''
    ].join(' '));
</script>

<div class={inline ? 'inline-block mr-4' : 'block mb-4'}>
    <label class="flex items-center cursor-pointer {disabled ? 'cursor-not-allowed' : ''}">
        <input
            {id}
            type="checkbox"
            bind:checked
            {name}
            {value}
            {disabled}
            {required}
            class={checkboxClasses}
        />
        <span class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
        </span>
    </label>
    
    {#if helper && !error}
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 ms-6">{helper}</p>
    {/if}
    
    {#if error}
        <p class="mt-1 text-sm text-red-600 dark:text-red-500 ms-6">{error}</p>
    {/if}
</div>