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

<div class="relative">
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

	<div class="container mx-auto p-8">
		<ColorShowcase />
		<ButtonShowcase />
		<ToggleShowcase />
		<ProgressBarShowcase />
		<ImageSliderShowcase />
		<BadgeShowcase />
		<SkillBadgeShowcase />
		<AvatarShowcase />
		<CardShowcase />
		<ToastShowcase />
		<FormShowcase />
		<FooterShowcase />
	</div>
</div>
