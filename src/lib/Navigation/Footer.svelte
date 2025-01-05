<script lang="ts">
    import type { Snippet } from 'svelte';
    import Card from '$lib/UI/Card.svelte';

    interface FooterLink {
        text: string;
        href: string;
        icon?: Snippet;
    }

    interface FooterSection {
        title: string;
        links: FooterLink[];
    }

    let { sections = [], colorIndex = 0 } = $props<{
        sections?: FooterSection[];
        colorIndex?: number;
    }>();
</script>

<footer class="neo-brutalist-footer w-full p-8 mt-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {#each sections as section, i}
            <Card 
                heading={section.title}
                colorIndex={(colorIndex + i) % 6}
            >
                <div class="flex flex-col gap-2">
                    {#each section.links as link}
                        <a 
                            href={link.href}
                            class="flex items-center gap-2 hover:translate-x-1 transition-transform"
                        >
                            {#if link.icon}
                                {@render link.icon()}
                            {/if}
                            <span class="font-mono">{link.text}</span>
                        </a>
                    {/each}
                </div>
            </Card>
        {/each}
    </div>
</footer>
