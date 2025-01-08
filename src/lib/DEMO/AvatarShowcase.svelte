<script lang="ts">
    import Avatar from '$lib/UI/Avatar.svelte';
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Avatar Variants</h2>
    
    <!-- Size Variants -->
    <div class="mb-8">
        <h3 class="mb-4 text-xl font-bold dark:text-white">Size Variants</h3>
        <div class="flex items-center flex-nowrap gap-8 overflow-x-auto pb-4">
            <Avatar
                name="John Doe"
                subheading="Developer"
                size="sm"
                colorIndex={0}
            />
            <Avatar
                name="Jane Smith"
                subheading="Designer"
                size="md"
                colorIndex={1}
                image="https://i.pravatar.cc/150?img=1"
            />
            <!-- ...existing code for other size variants... -->
        </div>
    </div>

    <!-- Color Variants -->
    <div class="mb-8">
        <h3 class="mb-4 text-xl font-bold dark:text-white">Color Variants</h3>
        <div class="flex items-center flex-nowrap gap-8 overflow-x-auto pb-4">
            {#each Array(6) as _, i}
                <Avatar
                    name={`User ${i + 1}`}
                    size="md"
                    colorIndex={i}
                />
            {/each}
        </div>
    </div>

    <!-- Direction Variants -->
    <div class="mb-8">
        <!-- ...existing code for direction variants... -->
    </div>

    <!-- Rounded vs Square -->
    <div class="mb-8">
        <!-- ...existing code for shape variants... -->
    </div>
</div>
