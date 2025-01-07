<script lang="ts">
    import { Toasts } from 'svoast';
    import Toast from './Toast.svelte';
    
    export let position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-right';
</script>

<Toasts {position} component={Toast} />
