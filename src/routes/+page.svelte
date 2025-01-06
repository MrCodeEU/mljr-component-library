<script lang="ts">
    import Navbar from '$lib/Navigation/Navbar.svelte';
    import Logo_h from '$lib/images/Logo_h.png';
    import Logo_h_w from '$lib/images/Logo_h_w.png';
    import Logo_h_b from '$lib/images/Logo_h_b.png';
    import { Card } from 'flowbite-svelte';
    import Button from '$lib/UI/Button.svelte';
    import { brutalistColors, getColor } from '$lib/utils/colors';
    import Footer from '$lib/Navigation/Footer.svelte';
    import { HomeOutline, MailBoxOutline, PhoneOutline, TwitterSolid, FacebookSolid, GithubSolid, SunSolid, MoonSolid } from 'flowbite-svelte-icons';
    import Toggle from '$lib/UI/Toggle.svelte';
    import * as m from '$lib/paraglide/messages.js';
    import ProgressBar from '$lib/UI/ProgressBar.svelte';
    import { onMount } from 'svelte';
    import ImageSlider from '$lib/UI/ImageSlider.svelte';

    let navbarProps = {
        logos: {
            light: Logo_h_b,
            dark: Logo_h_w
        },
        globalLinks: [
            { href: '/about', text: 'About' },
            { href: '/contact', text: 'Contact' }
        ],
        sectionLinks: [
            { href: '/sudoku/easy', text: 'Easy Sudoku' },
            { href: '/sudoku/hard', text: 'Hard Sudoku' }
        ]
    };

    const footerSections = [
        {
            title: 'Contact',
            links: [
                { 
                    text: 'Home', 
                    href: '/',
                    icon: () => ({
                        h: () => HomeOutline
                    })
                },
                { 
                    text: 'Email Us', 
                    href: 'mailto:example@example.com',
                    icon: () => ({
                        h: () => MailBoxOutline
                    })
                },
                { 
                    text: 'Call Us', 
                    href: 'tel:+1234567890',
                    icon: () => ({
                        h: () => PhoneOutline
                    })
                }
            ]
        },
        {
            title: 'Social',
            links: [
                { 
                    text: 'Twitter', 
                    href: 'https://twitter.com',
                    icon: () => ({
                        h: () => TwitterSolid
                    })
                },
                { 
                    text: 'Facebook', 
                    href: 'https://facebook.com',
                    icon: () => ({
                        h: () => FacebookSolid
                    })
                },
                { 
                    text: 'Github', 
                    href: 'https://github.com',
                    icon: () => ({
                        h: () => GithubSolid
                    })
                }
            ]
        },
        {
            title: 'Legal',
            links: [
                { text: 'Privacy Policy', href: '/privacy' },
                { text: 'Terms of Service', href: '/terms' },
                { text: 'Cookie Policy', href: '/cookies' }
            ]
        }
    ];

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
        },
    ];

    let animatedProgress = 0;
    let toggleState = false;
    let toggleState2 = true;
    let themeToggle = false;
    let petToggle = false;
    let simpleToggle = false;
    let statusToggle = false;
    
    let interval: number;

    onMount(() => {
        interval = window.setInterval(() => {
            animatedProgress = (animatedProgress + 1) % 101;
        }, 100);

        return () => {
            if (interval) clearInterval(interval);
        };
    });

    function handleThemeToggle(checked: boolean) {
        themeToggle = checked;
    }

    function handlePetToggle(checked: boolean) {
        petToggle = checked;
    }

    function handleSimpleToggle(checked: boolean) {
        simpleToggle = checked;
    }

    function handleStatusToggle(checked: boolean) {
        statusToggle = checked;
    }

    function toggleLanguage() {
        setLanguage(language() === 'en' ? 'de' : 'en');
    }
</script>

<Navbar {...navbarProps}></Navbar>

<div class="container mx-auto p-8">
    <!-- Color Showcase -->
    <div class="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">{m.color_palette()}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {#each brutalistColors as color, i}
                <div class="flex flex-col gap-2">
                    <div class={`h-24 neo-brutalist-button ${getColor(i)}`}>
                        <div class="p-2 font-mono text-sm">{m.color_number({ number: i + 1 })}</div>
                    </div>
                    <div class={`h-12 neo-brutalist-button ${getColor(i)}`}>
                        <div class="p-2 font-mono text-sm">Hover</div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Button Showcase -->
    <div class="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">{m.button_variants()}</h2>
        <div class="flex flex-wrap gap-4">
            <Button>{m.button_default()}</Button>
            <Button variant="outline">{m.button_outline()}</Button>
            <Button variant="text">{m.button_text()}</Button>
            <Button rounded>{m.button_rounded()}</Button>
            <Button size="sm">{m.button_small()}</Button>
            <Button size="lg">{m.button_large()}</Button>
            <Button colorIndex={1}>{m.button_colored()}</Button>
            <Button disabled>{m.button_disabled()}</Button>
        </div>
    </div>

    <!-- Toggle Showcase -->
    <div class="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Toggle Variants</h2>
        <div class="flex flex-col gap-4">
            <Toggle 
                label="Theme Toggle" 
                size="lg" 
                colorIndex={2}
                checked={themeToggle}
                onChange={handleThemeToggle}
                left={() => `
                    <div class="w-8 h-8 flex items-center justify-center text-black dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                        </svg>
                    </div>
                `}
                right={() => `
                    <div class="w-8 h-8 flex items-center justify-center text-black dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                `}
            />
            <Toggle 
                label="Pet Choice" 
                size="md" 
                colorIndex={3}
                checked={petToggle}
                onChange={handlePetToggle}
                left={() => `<img src="https://placekitten.com/32/32" alt="cat" class="rounded-full w-8 h-8" />`}
                right={() => `<span class="text-2xl w-8 h-8 flex items-center justify-center">🐶</span>`}
            />
            <Toggle 
                label="Simple Text" 
                size="md" 
                leftText="OFF" 
                rightText="ON" 
                colorIndex={1}
                checked={simpleToggle}
                onChange={handleSimpleToggle}
            />
            <Toggle 
                label="Status" 
                size="lg" 
                colorIndex={0}
                checked={statusToggle}
                onChange={handleStatusToggle}
                left={() => `<span class="text-xl w-8 h-8 flex items-center justify-center">❌</span>`}
                right={() => `<span class="text-xl w-8 h-8 flex items-center justify-center">✅</span>`}
            />
        </div>
    </div>

    <!-- Progress Bar Showcase -->
    <div class="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Progress Bar Variants</h2>
        <div class="flex flex-col gap-6">
            <!-- Basic Progress Bars -->
            <div class="space-y-4">
                <ProgressBar progress={75} colorIndex={0} size="sm" />
                <ProgressBar progress={60} colorIndex={1} size="md" />
                <ProgressBar progress={45} colorIndex={2} size="lg" />
                <ProgressBar progress={30} colorIndex={3} size="xl" />
            </div>

            <!-- Progress Bars with Labels -->
            <div class="space-y-4">
                <ProgressBar progress={80} colorIndex={4} size="md" showLabel />
                <ProgressBar progress={65} colorIndex={5} size="lg" label="Loading..." showLabel />
            </div>

            <!-- Animated Progress Bar -->
            <div>
                <ProgressBar 
                    progress={animatedProgress}
                    colorIndex={2}
                    size="md"
                    showLabel
                    animate
                    duration={200}
                />
            </div>
        </div>
    </div>

    <!-- Image Slider Showcase -->
    <div class="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Image Slider</h2>
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Basic Card -->
        <Card class="neo-brutalist-card {getColor(0)}">
            <h5 class="mb-2 text-2xl font-bold text-black dark:text-white">{m.card_simple_title()}</h5>
            <p class="font-normal text-black dark:text-white">{m.card_simple_content()}</p>
        </Card>

        <!-- Card with Image -->
        <Card class="neo-brutalist-card {getColor(1)}" img="https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece">
            <h5 class="mb-2 text-2xl font-bold text-black dark:text-white">{m.card_image_title()}</h5>
            <p class="mb-3 font-normal text-black dark:text-white">{m.card_image_content()}</p>
            <div class="flex gap-2">
                <Button colorIndex={2}>Click Me</Button>
                <Button variant="outline">Cancel</Button>
            </div>
        </Card>

        <!-- Content-only Card -->
        <Card class="neo-brutalist-card {getColor(3)}">
            <p class="font-normal text-black dark:text-white">This card only has content, no heading or image.</p>
            <div class="mt-4">
                <Button rounded>OK</Button>
            </div>
        </Card>
    </div>

    <!-- Footer Showcase -->
    <div class="mt-16">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Footer Component</h2>
        <Footer sections={footerSections} colorIndex={0} />
    </div>
</div>
