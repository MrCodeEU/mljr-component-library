<script lang="ts" module>
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
		variants: {
			variant: {
				default: "clay-element clay-interactive bg-gradient-to-br from-primary to-primary/90 text-primary-foreground",
				destructive: "clay-element clay-interactive bg-gradient-to-br from-destructive to-destructive/90 text-destructive-foreground",
				outline: "clay-element clay-interactive bg-gradient-to-br from-background to-background/95 hover:bg-accent/10",
				secondary: "clay-element clay-interactive bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "inline-flex items-center justify-center px-3 py-1 text-foreground bg-primary rounded-lg transition-all duration-200",
				accent: "clay-element clay-interactive bg-gradient-to-br from-accent to-accent/90 text-accent-foreground",
				muted: "clay-element clay-interactive bg-gradient-to-br from-muted to-muted/90 text-muted-foreground",
			},
			size: {
				default: "h-10 px-6 py-2",
				sm: "h-9 px-4",
				lg: "h-12 px-8",
				icon: "h-10 w-10 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{href}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}
