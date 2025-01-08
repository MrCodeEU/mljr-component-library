<script lang="ts">
	import Navbar from '$lib/Navigation/Navbar.svelte';
	import Logo_h_w from '$lib/images/Logo_h_w.png';
	import Logo_h_b from '$lib/images/Logo_h_b.png';
	import Background from '$lib/UI/Background.svelte';
	import ColorShowcase from '$lib/DEMO/ColorShowcase.svelte';
	import ButtonShowcase from '$lib/DEMO/ButtonShowcase.svelte';
	import ToggleShowcase from '$lib/DEMO/ToggleShowcase.svelte';
	import ProgressBarShowcase from '$lib/DEMO/ProgressBarShowcase.svelte';
	import ImageSliderShowcase from '$lib/DEMO/ImageSliderShowcase.svelte';
	import BadgeShowcase from '$lib/DEMO/BadgeShowcase.svelte';
	import SkillBadgeShowcase from '$lib/DEMO/SkillBadgeShowcase.svelte';
	import AvatarShowcase from '$lib/DEMO/AvatarShowcase.svelte';
	import CardShowcase from '$lib/DEMO/CardShowcase.svelte';
	import ToastShowcase from '$lib/DEMO/ToastShowcase.svelte';
	import FormShowcase from '$lib/DEMO/FormShowcase.svelte';
	import FooterShowcase from '$lib/DEMO/FooterShowcase.svelte';
    import TabGroup from '$lib/UI/TabGroup.svelte';
    import TabItem from '$lib/UI/TabItem.svelte';
    import ToastProvider from '$lib/UI/ToastProvider.svelte';

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

    const tabs = [
        { value: 'colors', title: 'Colors', colorIndex: 0 },
        { value: 'buttons', title: 'Buttons', colorIndex: 1 },
        { value: 'inputs', title: 'Inputs', colorIndex: 2 },
        { value: 'feedback', title: 'Feedback', colorIndex: 3 },
        { value: 'content', title: 'Content', colorIndex: 4 }
    ];

    let activeTab = tabs[0].value;
</script>

<div class="relative min-h-screen">
	<Background
		colorIndex={1}
		secondaryColorIndex={2}
		tertiaryColorIndex={3}
		backgroundColorIndex={0}
		animate={true}
		speed={5}
		pattern="steps"
		opacity={0.4}
	/>

	<Navbar {...navbarProps} />
    
    <ToastProvider />

	<main class="container mx-auto p-8">
        <TabGroup {tabs} bind:activeTab>
            <TabItem value="colors" isActive={activeTab === 'colors'}>
                <div class="neo-brutalist-container p-4">
                    <ColorShowcase />
                </div>
            </TabItem>

            <TabItem value="buttons" isActive={activeTab === 'buttons'}>
                <div class="neo-brutalist-container p-4">
                    <ButtonShowcase />
                    <ToggleShowcase />
                </div>
            </TabItem>

            <TabItem value="inputs" isActive={activeTab === 'inputs'}>
                <div class="neo-brutalist-container p-4">
                    <FormShowcase />
                    <ProgressBarShowcase />
                    <ImageSliderShowcase />
                </div>
            </TabItem>

            <TabItem value="feedback" isActive={activeTab === 'feedback'}>
                <div class="neo-brutalist-container p-4">
                    <BadgeShowcase />
                    <SkillBadgeShowcase />
                    <ToastShowcase />
                </div>
            </TabItem>

            <TabItem value="content" isActive={activeTab === 'content'}>
                <div class="neo-brutalist-container p-4">
                    <AvatarShowcase />
                    <CardShowcase />
                </div>
            </TabItem>
        </TabGroup>
    </main>
    <FooterShowcase />
</div>
