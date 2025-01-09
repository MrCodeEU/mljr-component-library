<script lang="ts">
    import { getColor } from '$lib/utils/colors';
    export let activeTab: string;
    export let tabs: Array<{
        value: string;
        title: string;
        colorIndex: number;
        disabled?: boolean;
    }>;
</script>

<div class="tab-container">
    <div class="tab-list" role="tablist">
        {#each tabs as tab}
            <button
                class="neo-brutalist-tab {getColor(tab.colorIndex)}"
                class:active={activeTab === tab.value}
                class:disabled={tab.disabled}
                disabled={tab.disabled}
                on:click={() => activeTab = tab.value}
            >
                {tab.title}
            </button>
        {/each}
    </div>

    <div class="tab-content neo-brutalist-container">
        <slot />
    </div>
</div>

<style>
    .tab-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .tab-list {
        display: flex;
        gap: 0.5rem;
        padding: 0;
        margin-bottom: -2px;
    }

    :global(.neo-brutalist-tab) {
        z-index: 1;
    }

    :global(.neo-brutalist-tab.active) {
        transform: translateX(4px) translateY(4px);
        filter: brightness(0.9);
    }

    .tab-content {
        position: relative;
        z-index: 0;
    }
</style>
