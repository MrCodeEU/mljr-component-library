<script lang="ts">
    import { getColor } from '$lib/utils/colors';

    export let checked = false;
    export let disabled = false;
    export let size: 'sm' | 'md' | 'lg' = 'md';
    export let colorIndex = 0;
    export let name = '';
    export let label = '';
    export let leftText = '';
    export let rightText = '';
    export let onChange: ((checked: boolean) => void) | undefined = undefined;

    const sizeClasses = {
        sm: 'w-12 h-6',
        md: 'w-16 h-8',
        lg: 'w-20 h-10'
    };

    const knobSizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const contentSizes = {
        sm: 'text-xs w-4 h-4',
        md: 'text-sm w-6 h-6',
        lg: 'text-base w-8 h-8'
    };

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        onChange?.(checked);
        console.log('🔧 Toggle internal:', checked);
    }
</script>

<label class="flex items-center gap-2 cursor-pointer {disabled ? 'opacity-50 cursor-not-allowed' : ''}">
    {#if label}
        <span class="mr-3 font-mono font-bold text-black dark:text-white">{label}</span>
    {/if}

    <div class="relative">
        <input
            type="checkbox"
            class="sr-only"
            {name}
            {checked}
            {disabled}
            on:change={handleChange}
        />
        <div class={`neo-brutalist-toggle ${sizeClasses[size]} ${checked ? getColor(colorIndex) : 'bg-gray-200 dark:bg-gray-700'}`}>
            <!-- Left content container -->
            <div class={`absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center ${contentSizes[size]} ${!checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} transition-all`}>
                <slot name="left">
                    <span class="font-mono font-bold">{leftText}</span>
                </slot>
            </div>

            <!-- Knob -->
            <div class={`neo-brutalist-toggle-knob ${knobSizes[size]} ${checked ? 'translate-x-[calc(100%+2px)]' : 'translate-x-[1px]'}`}></div>

            <!-- Right content container -->
            <div class={`absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center ${contentSizes[size]} ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} transition-all`}>
                <slot name="right">
                    <span class="font-mono font-bold">{rightText}</span>
                </slot>
            </div>
        </div>
    </div>
</label>
