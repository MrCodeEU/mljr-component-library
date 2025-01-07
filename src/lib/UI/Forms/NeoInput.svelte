<script lang="ts">
    import { Input } from 'flowbite-svelte';
    import type { FormSizeType } from 'flowbite-svelte/dist/types';
    import { getColor } from '$lib/utils/colors';

    let { 
        type = 'text',
        placeholder = '',
        value = '',
        size = undefined,
        required = false,
        disabled = false,
        label = '',
        error = '',
        success = '',
        colorIndex = 0,
        helper = '',
    } = $props();

    let focused = $state(false);

    const containerClass = $derived(`
        neo-brutalist-input-container
        ${error ? 'input-error' : ''}
        ${success ? 'input-success' : ''}
        ${focused ? 'focused' : ''}
    `);

    const wrapperClass = $derived(`
        relative
        ${focused ? 'translate-x-[4px] translate-y-[4px]' : ''}
        transition-transform
    `);

    const inputClass = $derived(`
        neo-brutalist-input
        ${getColor(colorIndex)}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-none
        border-2 border-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        focus:shadow-none
        transition-all
        ${$$slots.left ? 'pl-10' : 'pl-4'} 
        ${$$slots.right ? 'pr-10' : 'pr-4'}
        py-2.5
        ${error ? '!border-red-500 dark:!border-red-700' : ''}
        ${success ? '!border-green-500 dark:!border-green-700' : ''}
    `);

    const iconClass = $derived(`
        absolute top-1/2 -translate-y-1/2
        text-gray-500 dark:text-gray-400
        ${error ? '!text-red-500 dark:!text-red-700' : ''}
        ${success ? '!text-green-500 dark:!text-green-700' : ''}
        z-10
        ${disabled ? 'opacity-50' : ''}
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

    <div class={wrapperClass}>
        {#if $$slots.left}
            <div class={`${iconClass} left-3`} class:pointer-events-none={!$$slots.right}>
                <slot name="left"/>
            </div>
        {/if}

        <Input
            {type}
            {placeholder}
            bind:value
            {size}
            {required}
            {disabled}
            class={inputClass}
            on:focus={handleFocus}
            on:blur={handleBlur}
        />

        {#if $$slots.right}
            <div class={`${iconClass} right-3`}>
                <slot name="right"/>
            </div>
        {/if}
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
