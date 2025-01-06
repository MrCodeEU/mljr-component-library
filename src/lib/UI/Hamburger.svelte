<script lang="ts">
    import Button from './Button.svelte';
    
    let { isOpen, onclick } = $props();
</script>

<Button 
    onclick={onclick}
    aria-label="Menu"
    class="w-12 h-12 p-2 flex items-center justify-center"
>
    <div class="relative w-6 h-6">
        <span
            class="absolute top-0 left-0 w-6 h-0.5 bg-current transform transition duration-300 ease-in-out"
            class:rotate-45={isOpen}
            class:translate-y-2.5={isOpen}
        ></span>
        <span
            class="absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-opacity duration-300 ease-in-out"
            class:opacity-0={isOpen}
        ></span>
        <span
            class="absolute bottom-0 left-0 w-6 h-0.5 bg-current transform transition duration-300 ease-in-out"
            class:-rotate-45={isOpen}
            class:-translate-y-2.5={isOpen}
        ></span>
    </div>
</Button>
