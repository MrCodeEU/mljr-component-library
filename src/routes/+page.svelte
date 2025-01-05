<script lang="ts">
	import Navbar from '$lib/Navigation/Navbar.svelte';
	import Logo_h from '$lib/images/Logo_h.png';
	import Logo_h_w from '$lib/images/Logo_h_w.png';
	import Logo_h_b from '$lib/images/Logo_h_b.png';
    import Card from '$lib/UI/Card.svelte';
    import Button from '$lib/UI/Button.svelte';
    import { brutalistColors, getColor } from '$lib/utils/colors';

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

</script>

<Navbar {...navbarProps}/>

<div class="container mx-auto p-8">
    <!-- Color Showcase -->
    <div class="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Color Palette</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {#each brutalistColors as color, i}
                <div class="flex flex-col gap-2">
                    <div class={`h-24 neo-brutalist-button ${getColor(i)}`}>
                        <div class="p-2 font-mono text-sm">Color {i + 1}</div>
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
        <h2 class="text-2xl font-bold mb-4">Button Variants</h2>
        <div class="flex flex-wrap gap-4">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
            <Button rounded>Rounded</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button colorIndex={1}>Colored</Button>
            <Button disabled>Disabled</Button>
        </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Basic Card -->
        <Card heading="Simple Card" colorIndex={0}>
            <p>This is a basic card with just a heading and content.</p>
        </Card>

        <!-- Card with Image -->
        <Card 
            heading="Card with Image" 
            subheading="And buttons!"
            image={{ src: "https://placekitten.com/400/300", alt: "A cute kitten" }}
            colorIndex={1}
        >
            <p>This card demonstrates image usage and buttons.</p>
            <svelte:fragment slot="buttons">
                <Button colorIndex={2}>Click Me</Button>
                <Button variant="outline">Cancel</Button>
            </svelte:fragment>
        </Card>

        <!-- Content-only Card -->
        <Card colorIndex={2}>
            <p>This card only has content, no heading or image.</p>
            <svelte:fragment slot="buttons">
                <Button rounded>OK</Button>
            </svelte:fragment>
        </Card>
    </div>
</div>
