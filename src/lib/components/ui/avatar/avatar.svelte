<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AvatarPrimitive.RootProps = $props();
</script>

<AvatarPrimitive.Root
	bind:ref
	class={cn(
		"relative flex size-10 shrink-0 overflow-hidden rounded-full",
		"transition-all duration-300",
		"bg-gradient-to-br from-background/95 to-background/80",
		"shadow-[3px_3px_6px_var(--shadow-color),_-1px_-1px_3px_var(--highlight-color)]",
		"hover:shadow-[4px_4px_8px_var(--shadow-color),_-1px_-1px_3px_var(--highlight-color)]",
		"border border-background/20",
		className
	)}
	{...restProps}
/>
