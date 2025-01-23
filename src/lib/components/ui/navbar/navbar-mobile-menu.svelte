<script lang="ts">
	import { fade } from "svelte/transition";
	import { cn } from "$lib/utils";

	let { open = $bindable(false), children } = $props();
</script>

{#if open}
	<div
    transition:fade={{ duration: 2000 }}
		class={cn(
			"clay-element fixed inset-x-4 top-20 z-50 rounded-lg bg-background p-6 shadow-lg md:hidden",
			"border-2 border-primary"
		)}
	>
		<nav class="flex flex-col gap-4 justify-center items-center">
			{@render children?.()}
		</nav>
	</div>
{/if}
