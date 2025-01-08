<script lang="ts">
    export let value: string;
    export let isActive: boolean;
</script>

<div class="tab-panel" role="tabpanel" style:display={isActive ? 'block' : 'none'}>
    <slot />
</div>

<style>
    .tab-panel {
        height: 100%;
    }
</style>
