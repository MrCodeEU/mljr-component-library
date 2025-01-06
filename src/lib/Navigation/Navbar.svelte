<script lang="ts">
    import { slide } from 'svelte/transition';
    import { DarkMode } from 'flowbite-svelte';
    import Button from '$lib/UI/Button.svelte';
    import LanguageToggle from '$lib/UI/Language_Toggle.svelte';
    import Hamburger from '$lib/UI/Hamburger.svelte';
    import { onMount } from 'svelte';

    interface Props {
        logos: {
            light: string;
            dark: string;
        };
        globalLinks: Array<{ href: string; text: string }>;
        sectionLinks: Array<{ href: string; text: string }>;
        extra?: () => void;
    }

    let { logos, globalLinks, sectionLinks, extra } = $props();
    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
    }

    let cleanup: () => void;

    onMount(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.mobile-menu') && !target.closest('.hamburger')) {
                isOpen = false;
            }
        };

        if (typeof window !== 'undefined') {
            document.addEventListener('click', handleClickOutside);
            cleanup = () => document.removeEventListener('click', handleClickOutside);
        }

        return () => cleanup?.();
    });
</script>

<div class="m-8">
    <nav class="neo-brutalist-navbar border-4 border-black p-4">
        <div class="max-w-7xl mx-auto w-full">
            <div class="flex justify-between items-center w-full z-50">
                <!-- Logo -->
                <a href="/" class="neo-brutalist-brand">
                    <img src={logos.light} class="h-8 sm:h-10 dark:hidden" alt="MLJR Logo Light" />
                    <img src={logos.dark} class="h-8 sm:h-10 hidden dark:block" alt="MLJR Logo Dark" />
                </a>

                <!-- Desktop Navigation -->
                <div class="hidden lg:flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        {#each sectionLinks as link, i}
                            <a href={link.href}>
                                <Button colorIndex={i}>
                                    {link.text}
                                </Button>
                            </a>
                        {/each}
                    </div>
                    <div class="flex items-center gap-2 border-l-2 dark:border-gray-300 border-black pl-4">
                        {#each globalLinks as link, i}
                            <a href={link.href}>
                                <Button colorIndex={i + sectionLinks.length}>
                                    {link.text}
                                </Button>
                            </a>
                        {/each}
                    </div>
                    <div class="flex items-center gap-2 border-l-2 dark:border-gray-300 border-black pl-4">
                        {@render extra?.()}
                        <LanguageToggle />
                        <DarkMode class="neo-brutalist-button p-2 text-lg" />
                    </div>
                </div>

                <!-- Mobile Hamburger -->
                <div class="lg:hidden flex items-center gap-2 relative z-50">
                    {@render extra?.()}
                    <div class="hamburger">
                        <Hamburger {isOpen} onclick={toggleMenu} />
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            {#if isOpen}
                <div
                    class="mobile-menu lg:hidden fixed inset-0 z-40"
                    transition:slide={{ duration: 300 }}
                >
                    <div class="neo-brutalist-container h-full p-4 flex flex-col gap-4 no-hover">
                        <nav class="flex flex-col gap-4 items-center pt-24">
                            {#each sectionLinks as link, i}
                                <a href={link.href} class="flex justify-center" onclick={() => isOpen = false}>
                                    <Button colorIndex={i}>
                                        {link.text}
                                    </Button>
                                </a>
                            {/each}
                        </nav>
                        <nav class="border-t-2 dark:border-gray-300 border-black pt-4 flex flex-col gap-4 items-center">
                            {#each globalLinks as link, i}
                                <a href={link.href} class="flex justify-center" onclick={() => isOpen = false}>
                                    <Button colorIndex={i + sectionLinks.length}>
                                        {link.text}
                                    </Button>
                                </a>
                            {/each}
                        </nav>
                        <div class="border-t-2 dark:border-gray-300 border-black pt-4 mt-auto flex justify-between items-center">
                            <div>
                                <LanguageToggle />
                            </div>
                            <div>
                                <DarkMode class="neo-brutalist-button p-2 text-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </nav>
</div>

<style>
    .mobile-menu {
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    /* Remove hover effect for mobile container */
    .no-hover {
        transform: none !important;
        transition: none !important;
    }
    :global(.no-hover:hover) {
        transform: none !important;
        box-shadow: 4px 4px 0px 0px rgba(0,0,0,1) !important;
    }
</style>
