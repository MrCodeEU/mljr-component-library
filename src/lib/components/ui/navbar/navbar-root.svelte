<script lang="ts">
	import { cn } from "$lib/utils.js";
	import Hamburger from "./navbar-hamburger.svelte";
	import MobileMenu from "./navbar-mobile-menu.svelte";

	let {
		ref = $bindable(null),
		class: className,
		brand,
		children,
		...restProps
	} = $props();

	let isOpen = $state(false);
</script>

<div
	bind:this={ref}
	class={cn(
		"clay-element sticky top-4 z-50 flex  p-4 mx-4",
		"bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
		className
	)}
	{...restProps}
>
    <div class="order-1">
        {@render brand?.()}
    </div>
    <div class="order-2 hidden md:flex items-center justify-end ml-auto">
        {@render children?.()}
    </div>
    <div class="order-3 md:hidden flex items-center justify-end ml-auto">
        <Hamburger bind:open={isOpen} />
    </div>
</div>

{#if isOpen}
	<MobileMenu bind:open={isOpen}>
		{@render children?.()}
	</MobileMenu>
{/if}
