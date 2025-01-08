<script lang="ts">
    import ImageSlider from '$lib/UI/ImageSlider.svelte';

    const demoImages = [
        {
            url: 'https://via.placeholder.com/800x400/FF5733/FFFFFF?text=Image+1',
            alt: 'Demo Image 1'
        },
        {
            url: 'https://via.placeholder.com/800x400/33FF57/FFFFFF?text=Image+2',
            alt: 'Demo Image 2'
        },
        {
            url: 'https://via.placeholder.com/800x400/5733FF/FFFFFF?text=Image+3',
            alt: 'Demo Image 3'
        }
    ];
</script>

<div class="mb-8 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="mb-4 text-2xl font-bold dark:text-white">Image Slider</h2>
    <div class="space-y-8">
        <ImageSlider
            images={demoImages}
            autoplay={true}
            interval={5000}
            colorIndex={2}
            transitionEffect="fade"
            showPagination={true}
        />

        <ImageSlider
            images={demoImages}
            droneMode={false}
            colorIndex={4}
            transitionEffect="slide"
            showPagination={true}
            showControls={false}
        />
    </div>
</div>
