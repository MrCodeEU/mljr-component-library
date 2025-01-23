<script lang="ts">
    export let size = "2px";
    export let gap = "24px";
    export let opacity = "0.5";
</script>

<div class="dots-background" style="--dot-size: {size}; --dot-gap: {gap}; --dot-opacity: {opacity}"></div>

<style>
    .dots-background {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        min-height: 100vh;
        min-width: 100vw;
        background-image: radial-gradient(
            hsl(var(--foreground) / var(--dot-opacity)) var(--dot-size),
            transparent var(--dot-size)
        );
        background-size: var(--dot-gap) var(--dot-gap);
        background-position: center;
        pointer-events: none;
        z-index: 0;
    }
</style>
