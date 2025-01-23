<script lang="ts">
    import type { WithElementRef } from "bits-ui";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils.js";

    let {
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    } = $props();
</script>

<div
    bind:this={ref}
    class={cn("flex w-full flex-col md:flex-row items-center gap-4", className)}
    {...restProps}
>
    {@render children?.()}
</div>
