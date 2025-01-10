<script lang="ts">
    import { Textarea } from 'flowbite-svelte';
    import { getColor } from '$lib/utils/colors';

    let { 
        value = '',
        placeholder = '',
        rows = 4,
        label = '',
        required = false,
        disabled = false,
        error = '',
        success = '',
        colorIndex = 0,
        helper = '',
    } = $props<{
        value: string;
        placeholder?: string;
        rows?: number;
        label?: string;
        required?: boolean;
        disabled?: boolean;
        error?: string;
        success?: string;
        colorIndex?: number;
        helper?: string;
    }>();

    let focused = $state(false);

    const containerClass = $derived(`
        neo-brutalist-input-container
        ${error ? 'input-error' : ''}
        ${success ? 'input-success' : ''}
        ${disabled ? 'opacity-50' : ''}
    `);

    const wrapperClass = $derived(`
        relative
        transition-transform
        ${focused ? 'translate-x-[6px] translate-y-[6px]' : ''}
    `);

    const textareaClass = $derived(`
        neo-brutalist-input
        ${getColor(colorIndex)}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-none
        border-2 border-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        focus:shadow-none
        transition-all
        p-4
        min-h-[120px]
        resize-y
        ${error ? '!border-red-500 dark:!border-red-700' : ''}
        ${success ? '!border-green-500 dark:!border-green-700' : ''}
    `);

    function handleFocus() {
        focused = true;
    }

    function handleBlur() {
        focused = false;
    }
</script>

<div class={containerClass}>
    {#if label}
        <label class="block mb-2 text-sm font-medium">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}

    <div 
        class={wrapperClass}
        class:hover:translate-x-[7px]={!focused}
        class:hover:translate-y-[7px]={!focused}
    >
        <Textarea
            {rows}
            {placeholder}
            bind:value
            {disabled}
            class={textareaClass}
            on:focus={handleFocus}
            on:blur={handleBlur}
        />
    </div>

    {#if error}
        <p class="mt-2 text-sm text-red-500 dark:text-red-700">{error}</p>
    {/if}

    {#if success}
        <p class="mt-2 text-sm text-green-500 dark:text-green-700">{success}</p>
    {/if}

    {#if helper}
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">{helper}</p>
    {/if}
</div>
