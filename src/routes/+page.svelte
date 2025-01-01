<script lang="ts">
	import Navbar from '$lib/Navigation/Navbar.svelte';
	import Logo_h from '$lib/images/Logo_h.png';
	import Logo_h_w from '$lib/images/Logo_h_w.png';
	import Logo_h_b from '$lib/images/Logo_h_b.png';

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
