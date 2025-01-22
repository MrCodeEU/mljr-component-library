<script lang="ts">
    import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
    import { i18n } from '$lib/i18n';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { Button } from "$lib/components/ui/button";
    import Globe from "lucide-svelte/icons/globe";

    function switchToLanguage(newLanguage: AvailableLanguageTag) {
        const canonicalPath = i18n.route($page.url.pathname);
        const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
        goto(localisedPath);
    }

    let currentLang = i18n.getLanguageFromUrl($page.url);

    function toggleLanguage() {
        const newLang = currentLang === 'en' ? 'de' : 'en';
        switchToLanguage(newLang as AvailableLanguageTag);
    }
</script>

<Button 
    onclick={toggleLanguage} 
    variant="outline" 
    size="icon" 
    class="brutal-card relative"
    title={`Current: ${currentLang.toUpperCase()}`}
>
    <Globe class="h-[1.2rem] w-[1.2rem]" />
    <span class="absolute -top-1 -right-1 text-xs font-bold bg-primary px-1">
        {currentLang.toUpperCase()}
    </span>
    <span class="sr-only">Toggle language</span>
</Button>
