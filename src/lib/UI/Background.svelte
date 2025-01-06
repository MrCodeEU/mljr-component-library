<script lang="ts">
    import { getColorHex } from '$lib/utils/colors';
    import Background from './Background.svelte';

    let { 
        colorIndex = 0,
        secondaryColorIndex,
        tertiaryColorIndex,
        backgroundColorIndex,
        animate = true,
        speed = 20,
        pattern = 'cubes',
        opacity = 0.1
    } = $props<{
        colorIndex?: number,
        secondaryColorIndex?: number,
        tertiaryColorIndex?: number,
        backgroundColorIndex?: number,
        animate?: boolean,
        speed?: number,
        pattern?: 'cubes' | 'prisms' | 'steps',
        opacity?: number
    }>();

    let darkMode = $state(
        typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
    );

    let primaryColor = $derived(getColorHex(colorIndex, darkMode));
    let secondaryColor = $derived(getColorHex(secondaryColorIndex, darkMode));
    let tertiaryColor = $derived(getColorHex(tertiaryColorIndex, darkMode));
    let backgroundColor = $derived(getColorHex(backgroundColorIndex, darkMode));

    // Watch for dark mode changes
    if (typeof document !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    darkMode = document.documentElement.classList.contains('dark');
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
</script>

<div 
    class="background fixed inset-0 -z-10 w-full h-full transition-opacity duration-500"
    style:--primary-color={primaryColor}
    style:--secondary-color={secondaryColor || primaryColor}
    style:--tertiary-color={tertiaryColor || secondaryColor || primaryColor}
    style:--background-color={backgroundColor || '#ffffff'}
    style:--animation-speed="{speed}s"
    style:opacity={opacity}
    class:animate={animate}
    class:pattern-cubes={pattern === 'cubes'}
    class:pattern-prisms={pattern === 'prisms'}
    class:pattern-steps={pattern === 'steps'}
></div>

<style lang="postcss">
    .background {
        background-color: var(--background-color);
    }

    .pattern-cubes {
        background-image: 
            linear-gradient(30deg, var(--primary-color) 12%, transparent 12.5%),
            linear-gradient(150deg, var(--primary-color) 12%, transparent 12.5%),
            linear-gradient(30deg, transparent 87%, var(--secondary-color) 87.5%),
            linear-gradient(150deg, transparent 87%, var(--secondary-color) 87.5%),
            linear-gradient(60deg, var(--tertiary-color) 25%, transparent 25.5%);
        background-size: 100px 173.2px;
        background-position: 0 0, 0 0, 0 0, 0 0, 0 0;
    }

    .pattern-prisms {
        background-image: 
            linear-gradient(60deg, transparent 50%, var(--primary-color) 50%),
            linear-gradient(-60deg, transparent 50%, var(--secondary-color) 50%),
            linear-gradient(120deg, var(--tertiary-color) 25%, transparent 25.5%);
        background-size: 100px 173.2px;
        background-position: 0 0, 0 0, 0 0;
    }

    .pattern-steps {
        background-image: 
            linear-gradient(0deg, var(--primary-color) 50%, transparent 50%),
            linear-gradient(90deg, var(--secondary-color) 50%, transparent 50%),
            linear-gradient(45deg, var(--tertiary-color) 25%, transparent 25%);
        background-size: 50px 50px;
        background-position: 0 0, 0 0, 0 0;
        animation-name: pattern-shift-steps;
    }

    .animate {
        animation: pattern-shift var(--animation-speed) infinite linear;
    }

    .animate.pattern-steps {
        animation-name: pattern-shift-steps;
    }

    @keyframes pattern-shift {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 100px 173.2px;
        }
    }

    @keyframes pattern-shift-steps {
        0% {
            background-position: 0 0, 0 0, 0 0;
        }
        100% {
            background-position: 50px 50px, 50px 50px, 50px 50px;
        }
    }

    /* Dark mode adjustments */
    :global(.dark) .background {
        filter: brightness(0.8) saturate(1.2);
    }
</style>