<script lang="ts">
    import { getColor } from '$lib/utils/colors';

    type ContentFn = () => string | HTMLElement;

    let { 
        checked = $bindable(false),
        disabled = false,
        size = 'md',
        colorIndex = 0,
        name = '',
        label = '',
        leftText = '',
        rightText = '',
        onChange = undefined,
        left = undefined as ContentFn | undefined,
        right = undefined as ContentFn | undefined
    } = $props();

    const sizeClasses = $derived({
        sm: 'w-12 h-6',
        md: 'w-16 h-8',
        lg: 'w-20 h-10'
    });

    const knobSizes = $derived({
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    });

    const contentSizes = $derived({
        sm: 'text-xs w-4 h-4',
        md: 'text-sm w-6 h-6',
        lg: 'text-base w-8 h-8'
    });

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        onChange?.(checked);
    }

    function getContent(side: 'left' | 'right'): string {
        if (side === 'left') {
            if (left) return left();
            if (leftText) return `<span class="font-mono font-bold">${leftText}</span>`;
            return '';
        } else {
            if (right) return right();
            if (rightText) return `<span class="font-mono font-bold">${rightText}</span>`;
            return '';
        }
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
            bind:checked
            {disabled}
            onchange={handleChange}
        />
        <div class={`neo-brutalist-toggle ${sizeClasses[size]} ${checked ? getColor(colorIndex) : 'bg-gray-200 dark:bg-gray-700'}`}>
            <div class={`absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center ${contentSizes[size]} ${!checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} transition-all`}>
                {@html getContent('left')}
            </div>

            <div class={`neo-brutalist-toggle-knob ${knobSizes[size]} ${checked ? 'translate-x-[calc(100%+2px)]' : 'translate-x-[1px]'}`}></div>

            <div class={`absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center ${contentSizes[size]} ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} transition-all`}>
                {@html getContent('right')}
            </div>
        </div>
    </div>
</label>
