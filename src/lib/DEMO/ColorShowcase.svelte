<script lang="ts">
    import { brutalistColors, getColor } from '$lib/utils/colors';
    import * as m from '$lib/paraglide/messages';
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">{m.color_palette()}</h2>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
        {#each brutalistColors as color, i}
            <div class="flex flex-col gap-2">
                <div class={`neo-brutalist-button h-24 ${getColor(i)}`}>
                    <div class="p-2 font-mono text-sm">{m.color_number({ number: i + 1 })}</div>
                </div>
                <div class={`neo-brutalist-button h-12 ${getColor(i)}`}>
                    <div class="p-2 font-mono text-sm">Hover</div>
                </div>
            </div>
        {/each}
    </div>
</div>
