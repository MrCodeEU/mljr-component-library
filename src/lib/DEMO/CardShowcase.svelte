<script lang="ts">
    import { Card } from 'flowbite-svelte';
    import Button from '$lib/UI/Button.svelte';
    import { getColor } from '$lib/utils/colors';
    import * as m from '$lib/paraglide/messages';
</script>

<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    <!-- Basic Card -->
    <Card class="neo-brutalist-card {getColor(0)}">
        <h5 class="mb-2 text-2xl font-bold text-black dark:text-white">{m.card_simple_title()}</h5>
        <p class="font-normal text-black dark:text-white">{m.card_simple_content()}</p>
    </Card>

    <!-- Card with Image -->
    <Card
        class="neo-brutalist-card {getColor(1)}"
        img="https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece"
    >
        <h5 class="mb-2 text-2xl font-bold text-black dark:text-white">{m.card_image_title()}</h5>
        <p class="mb-3 font-normal text-black dark:text-white">{m.card_image_content()}</p>
        <div class="flex gap-2">
            <Button colorIndex={2}>Click Me</Button>
            <Button variant="outline">Cancel</Button>
        </div>
    </Card>

    <!-- Content-only Card -->
    <Card class="neo-brutalist-card {getColor(3)}">
        <p class="font-normal text-black dark:text-white">
            This card only has content, no heading or image.
        </p>
        <div class="mt-4">
            <Button rounded>OK</Button>
        </div>
    </Card>
</div>
