<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	class={cn(
			"inline-flex items-center justify-center whitespace-nowrap",
			"px-3 py-1.5 text-sm font-mono font-medium transition-colors",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			"disabled:pointer-events-none disabled:opacity-50",
			"hover:bg-primary/20 rounded-[calc(var(--border-radius)*0.5)]",
			"data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--info))] data-[state=active]:to-[hsl(var(--mint))]",
			"data-[state=active]:shadow-[inset_-1px_-1px_2px_var(--shadow-color),inset_1px_1px_2px_var(--highlight-color)]",
			"flex-1 basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.5rem)] md:basis-[calc(20%-0.5rem)]",
			"min-w-[120px] text-center",
			className
	)}
	{...restProps}
/>
