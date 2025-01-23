<script lang="ts">
    import { cn } from "$lib/utils.js";

    let {
        ref = $bindable(null),
        class: className,
        brand,
        children,
        ...restProps
    } = $props();
</script>

<footer
    bind:this={ref}
    class={cn(
        "w-full py-6 px-4 mt-auto",
        className
    )}
    {...restProps}
>
    <div class="container mx-auto flex flex-col items-center gap-8">
        <div class="w-full flex justify-center">
            {@render children?.()}
        </div>
        <div class="text-center">
            {@render brand?.()}
        </div>
    </div>
</footer>
