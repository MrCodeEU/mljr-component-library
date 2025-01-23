<script lang="ts">
	import { Separator as SeparatorPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		orientation = "horizontal",
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	class={cn(
		"clay-elemen bg-gradient-to-br from-secondary to-secondary/90 shrink-0",
		orientation === "horizontal" ? "h-[3px] w-full" : "min-h-full w-[3px]",
		className
	)}
	{orientation}
	{...restProps}
/>
