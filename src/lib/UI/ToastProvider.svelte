<script lang="ts">
    import { Toasts } from 'svoast';
    import Toast from './Toast.svelte';
    
    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';
</script>

<div class="fixed inset-0 pointer-events-none z-50">
    <Toasts {position} component={Toast} />
</div>

<style>
    :global(.svoast-container) {
        pointer-events: auto;
    }
</style>
