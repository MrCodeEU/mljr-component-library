<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";
	import "./toast.css";

	let restProps: SonnerProps = $props();
</script>

<Sonner
	theme={$mode}
	class="toaster group"
	toastOptions={{
		classes: {
			toast: "group toast group-[.toaster]:clay-element group-[.toaster]:p-4",
			description: "group-[.toast]:text-current/80",
			actionButton: "group-[.toast]:brutal-button",
			cancelButton: "group-[.toast]:brutal-button group-[.toast]:bg-muted/30",
		},
	}}
	{...restProps}
/>
