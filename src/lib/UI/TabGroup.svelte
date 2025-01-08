<script lang="ts">
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
                class="tab-button"
                class:active={activeTab === tab.value}
                disabled={tab.disabled}
                on:click={() => activeTab = tab.value}
                style:--tab-color="var(--color-{tab.colorIndex})"
            >
                {tab.title}
            </button>
        {/each}
    </div>

    <div class="tab-content">
        <slot />
    </div>
</div>

<style>
    .tab-container {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .tab-list {
        display: flex;
        gap: 0;
        background: white;
        padding: 0;
    }

    .tab-button {
        padding: 0.75rem 1.5rem;
        background: white;
        border: 2px solid black;
        border-bottom: none;
        margin-right: -2px;
        font-weight: bold;
        cursor: pointer;
        min-width: fit-content;
    }

    .tab-button.active {
        background: var(--tab-color, #2563eb);
        color: white;
        position: relative;
        z-index: 1;
    }

    .tab-content {
        border: 2px solid black;
        background: white;
        /* Remove the padding since we'll handle that in the neo-brutalist-container */
    }
</style>
