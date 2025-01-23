<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	class={cn(
		"clay-element w-full flex flex-wrap h-auto min-h-[3rem]",
		"items-center justify-start gap-2 p-2",
		className
	)}
	{...restProps}
/>
