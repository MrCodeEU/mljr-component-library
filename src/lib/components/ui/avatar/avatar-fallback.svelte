<script lang="ts">
	import { Avatar as AvatarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AvatarPrimitive.FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback
	bind:ref
	class={cn(
		"flex h-full w-full items-center justify-center rounded-full",
		"bg-gradient-to-br from-muted/90 to-muted/70",
		"text-muted-foreground font-medium",
		"shadow-[inset_2px_2px_4px_var(--shadow-color),_inset_-1px_-1px_3px_var(--highlight-color)]",
		className
	)}
	{...restProps}
/>
