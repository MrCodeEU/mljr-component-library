<script lang="ts">
    import Button from '$lib/UI/Button.svelte';
    import * as m from '$lib/paraglide/messages';
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4">
    <h2 class="mb-4 text-2xl font-bold">{m.button_variants()}</h2>
    <div class="flex flex-wrap gap-4">
        <Button>{m.button_default()}</Button>
        <Button variant="outline">{m.button_outline()}</Button>
        <Button variant="text">{m.button_text()}</Button>
        <Button rounded>{m.button_rounded()}</Button>
        <Button size="sm">{m.button_small()}</Button>
        <Button size="lg">{m.button_large()}</Button>
        <Button colorIndex={1}>{m.button_colored()}</Button>
        <Button disabled>{m.button_disabled()}</Button>
    </div>
</div>
