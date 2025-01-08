<script lang="ts">
    import Badge from '$lib/UI/Badge.svelte';
    import { StarSolid, CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Badge Variants</h2>
    <div class="flex flex-wrap items-start gap-4">
        <!-- Basic Badges -->
        <Badge text="Default Badge" />
        <Badge text="Colored Badge" colorIndex={1} />
        <Badge text="Large Badge" size="lg" colorIndex={2} />
        <Badge text="Small Badge" size="sm" colorIndex={3} />

        <!-- Badges with Icons -->
        <Badge 
            text="New Feature" 
            leftIcon={StarSolid}
            colorIndex={4}
        >
            {#snippet children()}
                <p>This is some content</p>
            {/snippet}
        </Badge>
        
        <Badge 
            text="Success" 
            rightIcon={CheckCircleSolid}
            colorIndex={5}
        />

        <!-- Badge with Content -->
        <Badge 
            text="Warning" 
            leftIcon={ExclamationCircleSolid}
            content="This is a detailed explanation"
            colorIndex={1}
            size="lg"
        />
    </div>
</div>
