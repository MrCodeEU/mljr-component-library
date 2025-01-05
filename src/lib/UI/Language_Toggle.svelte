<script lang="ts">
    import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
    import { i18n } from '$lib/i18n';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Toggle from './Toggle.svelte';

    const languageIcons = {
        'en': '🇬🇧',
        'de': '🇩🇪'
    };

    let lang = i18n.getLanguageFromUrl($page.url);
    let checked = lang === 'de';
    console.log('🏁 Initial state:', { lang, checked });

    function handleChange(isChecked: boolean) {
        const newLang = isChecked ? 'de' : 'en';
        console.log('🔄 Language change:', { newLang });
        
        const canonicalPath = i18n.route($page.url.pathname);
        const localisedPath = i18n.resolveRoute(canonicalPath, newLang);
        
        console.log('🎯 Navigating to:', localisedPath);
        goto(localisedPath);
    }
</script>

<div class="flex flex-row justify-center items-center gap-4">
    <Toggle
        {checked}
        onChange={handleChange}
        size="md"
        colorIndex={2}
    >
        <svelte:fragment slot="left">
            <span class="text-base">{languageIcons['en']}</span>
        </svelte:fragment>
        <svelte:fragment slot="right">
            <span class="text-base">{languageIcons['de']}</span>
        </svelte:fragment>
    </Toggle>
</div>
