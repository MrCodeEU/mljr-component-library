<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import ThemeToggle from "$lib/components/theme-toggle/theme-toggle.svelte";
</script>

<main class="container py-8 space-y-12">
    <h1 class="font-mono">Neo Brutalist Components</h1>

    <section class="space-y-4">
        <h2>Theme Toggle</h2>
        <div class="flex items-center gap-4">
            <ThemeToggle />
        </div>
    </section>

    <section class="space-y-4">
        <h2>Links</h2>
        <div class="flex flex-wrap gap-4">
            <a href="#">Regular Brutal Link</a>
            This is <a href="#">Another Example</a> of a brutal link in a sentence.
        </div>
    </section>

    <section class="space-y-4">
        <h2>Buttons</h2>
        <div class="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="muted">Muted</Button>
        </div>
    </section>
</main>