<script lang="ts">
    import { getColor } from '$lib/utils/colors';
    import { ArrowUpOutline, ArrowDownOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';

    type Option = {
        label: string;
        value: string | number;
        disabled?: boolean;
    };

    let {
        options = [],
        value = '',
        placeholder = 'Select an option',
        label = '',
        required = false,
        disabled = false,
        error = '',
        success = '',
        colorIndex = 0,
        searchable = false,
        multiple = false,
        helper = '',
    } = $props<{
        options: Option[];
        value: string | string[];
        placeholder?: string;
        label?: string;
        required?: boolean;
        disabled?: boolean;
        error?: string;
        success?: string;
        colorIndex?: number;
        searchable?: boolean;
        multiple?: boolean;
        helper?: string;
    }>();

    let isOpen = $state(false);
    let search = $state('');
    let dropdownRef: HTMLDivElement;

    const filteredOptions = $derived(
        searchable 
            ? options.filter(opt => 
                opt.label.toLowerCase().includes(search.toLowerCase())
              )
            : options
    );

    const selectedLabels = $derived(
        multiple
            ? options
                .filter(opt => Array.isArray(value) && value.includes(opt.value))
                .map(opt => opt.label)
            : options.find(opt => opt.value === value)?.label
    );

    const displayValue = $derived(
        multiple
            ? (selectedLabels as string[])?.join(', ') || placeholder
            : (selectedLabels as string) || placeholder
    );

    const containerClass = $derived(`
        neo-brutalist-input-container
        relative
        ${error ? 'input-error' : ''}
        ${success ? 'input-success' : ''}
        ${disabled ? 'opacity-50' : ''}
    `);

    const buttonClass = $derived(`
        w-full px-4 py-2.5 text-left
        ${getColor(colorIndex)}
        border-2 border-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        ${isOpen ? 'shadow-none translate-x-[4px] translate-y-[4px]' : ''}
        transition-all
        flex items-center justify-between
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `);

    const dropdownClass = $derived(`
        absolute z-50 w-full mt-1
        bg-white dark:bg-gray-800
        border-2 border-black
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        ${isOpen ? '' : 'hidden'}
    `);

    function handleSelect(option: Option) {
        if (disabled || option.disabled) return;
        
        if (multiple) {
            const arr = Array.isArray(value) ? value : [];
            const index = arr.indexOf(option.value as string);
            
            if (index === -1) {
                value = [...arr, option.value as string];
            } else {
                value = arr.filter(v => v !== option.value);
            }
        } else {
            value = option.value as string;
            isOpen = false;
        }
    }

    function isSelected(option: Option): boolean {
        if (multiple) {
            return Array.isArray(value) && value.includes(option.value as string);
        }
        return value === option.value;
    }

    function handleClickOutside(event: MouseEvent) {
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
            isOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    });
</script>

<div class={containerClass} bind:this={dropdownRef}>
    {#if label}
        <label class="block mb-2 text-sm font-medium">
            {label}
            {#if required}
                <span class="text-red-500">*</span>
            {/if}
        </label>
    {/if}

    <button
        type="button"
        class={buttonClass}
        on:click={() => !disabled && (isOpen = !isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
    >
        <span class="block truncate">
            {displayValue}
        </span>
        <svelte:component
            this={isOpen ? ArrowDownOutline : ArrowUpOutline}
            class="w-4 h-4 ml-2"
        />
    </button>

    <div class={dropdownClass}>
        {#if searchable}
            <div class="p-2 border-b-2 border-black">
                <input
                    type="text"
                    class="w-full px-2 py-1 border-2 border-black"
                    placeholder="Search..."
                    bind:value={search}
                />
            </div>
        {/if}

        <ul class="max-h-60 overflow-auto">
            {#each filteredOptions as option}
                <li>
                    <button
                        type="button"
                        class={`
                            w-full px-4 py-2 text-left
                            ${isSelected(option) ? getColor(colorIndex) : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                            ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            border-b-2 border-black last:border-b-0
                        `}
                        on:click={() => handleSelect(option)}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </button>
                </li>
            {/each}
            
            {#if filteredOptions.length === 0}
                <li class="px-4 py-2 text-gray-500 dark:text-gray-400">
                    No options available
                </li>
            {/if}
        </ul>
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
