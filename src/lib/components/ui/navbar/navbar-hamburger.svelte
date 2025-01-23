<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";

	let { open = $bindable(false) } = $props();
</script>

<Button
	variant="accent"
	size="icon"
	class={cn("relative h-10 w-10 clay-interactive md:hidden", open && "is-active")}
	onclick={() => (open = !open)}
>
	<div class="hamburger-lines">
		<span class={cn("line line1", open && "rotate-45 translate-y-[10px]")}></span>
		<span class={cn("line line2", open && "opacity-0")}></span>
		<span class={cn("line line3", open && "-rotate-45 -translate-y-[10px]")}></span>
	</div>
</Button>

<style lang="postcss">
	.hamburger-lines {
		@apply flex flex-col justify-center items-center gap-[6px] w-6 h-6;
	}

	.line {
		@apply h-[2px] w-6 bg-foreground transition-all duration-300 ease-in-out;
	}
</style>
