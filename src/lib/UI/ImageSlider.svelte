<script lang="ts">
    import { onMount, tick } from 'svelte';
    import Button from './Button.svelte';
    import { getColor } from '$lib/utils/colors';

    const { 
        images = [], 
        autoplay = false, 
        interval = 3000, 
        droneMode = true, 
        showControls = true,
        showPagination = true,
        colorIndex = 0,
        transitionEffect = 'fade' // 'fade' | 'slide'
    }: {
        images: { url: string; alt: string }[];
        autoplay: boolean;
        interval: number;
        droneMode: boolean;
        showControls: boolean;
        showPagination: boolean;
        colorIndex: number;
        transitionEffect?: 'fade' | 'slide';
    } = $props();

    const DRONE_MOVEMENT = 20; // Max pixel movement
    const ZOOM_SCALE = 1.05; // Zoom factor to prevent background showing

    let currentIndex = $state(0);
    let container: HTMLDivElement;
    let droneX = $state(0);
    let droneY = $state(0);
    let autoplayInterval: number;
    let touchStartX = 0;
    let touchStartY = 0;

    $effect(() => {
        if (autoplay) {
            startAutoplay();
        }
        return () => stopAutoplay();
    });

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = window.setInterval(() => {
            next();
        }, interval);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    function next() {
        currentIndex = (currentIndex + 1) % images.length;
    }

    function prev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }

    function goToSlide(index: number) {
        currentIndex = index;
        if (autoplay) {
            startAutoplay(); // Reset autoplay timer
        }
    }

    function handleMouseMove(event: MouseEvent) {
        if (!droneMode || !container) return;

        const rect = container.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        droneX = (0.5 - x) * DRONE_MOVEMENT;
        droneY = (0.5 - y) * DRONE_MOVEMENT;
    }

    function handleMouseLeave() {
        droneX = 0;
        droneY = 0;
    }

    // Touch handling for mobile
    function handleTouchStart(event: TouchEvent) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
        if (autoplay) stopAutoplay();
    }

    function handleTouchEnd(event: TouchEvent) {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Only handle horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > 50) { // Minimum swipe distance
                if (deltaX > 0) {
                    prev();
                } else {
                    next();
                }
            }
        }

        if (autoplay) startAutoplay();
    }

    $effect(() => {
        // Pause autoplay when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoplay();
            } else if (autoplay) {
                startAutoplay();
            }
        });
    });
</script>

<div 
    class="relative overflow-hidden neo-brutalist-card {getColor(colorIndex)}"
    bind:this={container}
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
    role="region"
    aria-label="Image slider"
>
    <div 
        class="relative w-full h-[400px] transition-transform duration-300 ease-out"
        style="transform: translate({droneX}px, {droneY}px) scale({ZOOM_SCALE})"
    >
        <div 
            class="absolute w-full h-full flex transition-all duration-500"
            style={transitionEffect === 'slide' 
                ? `transform: translateX(-${currentIndex * 100}%)` 
                : undefined
            }
        >
            {#each images as { url, alt }, i}
                <div 
                    class="absolute w-full h-full transition-all duration-500"
                    style={transitionEffect === 'fade' 
                        ? `opacity: ${currentIndex === i ? 1 : 0}` 
                        : `left: ${i * 100}%`
                    }
                >
                    <img 
                        src={url} 
                        {alt}
                        class="w-full h-full object-cover"
                        draggable="false"
                    />
                </div>
            {/each}
        </div>
    </div>
    {#if showControls}
        <div class="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Button 
                size="sm" 
                colorIndex={colorIndex} 
                onclick={() => prev()}
                aria-label="Previous image"
            >
                ←
            </Button>
        </div>
        <div class="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <Button 
                size="sm" 
                colorIndex={colorIndex} 
                onclick={() => next()}
                aria-label="Next image"
            >
                →
            </Button>
        </div>
    {/if}

    {#if showPagination}
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {#each images as _, i}
                <button
                    class="w-3 h-3 rounded-full transition-all duration-200 border-2 border-black"
                    class:bg-black={currentIndex === i}
                    class:bg-transparent={currentIndex !== i}
                    onclick={() => goToSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                ></button>
            {/each}
        </div>
    {/if}
</div>
