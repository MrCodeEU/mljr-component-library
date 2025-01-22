<script lang="ts" module>
	import type { WithElementRef } from "bits-ui";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-mono font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-brutal border-foreground",
		variants: {
			variant: {
				default: "brutal-button bg-primary text-primary-foreground",
				destructive: "brutal-button bg-destructive text-destructive-foreground",
				outline: "brutal-card bg-background hover:bg-accent hover:text-accent-foreground",
				secondary: "brutal-button bg-secondary text-secondary-foreground",
				ghost: "brutal-button bg-background hover:bg-accent hover:text-accent-foreground",
				link: "bg-primary text-foreground px-2 border-none no-underline hover:no-underline",
				accent: "brutal-button bg-accent text-accent-foreground",
				muted: "brutal-button bg-muted text-muted-foreground",
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
