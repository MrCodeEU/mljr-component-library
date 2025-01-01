<script>
	import Navbar from "$lib/Navigation/Navbar.svelte";
	import Logo_h from "$lib/images/Logo_h.png";
	import Logo_h_w from "$lib/images/Logo_h_w.png";
	import Logo_h_b from "$lib/images/Logo_h_b.png";

</script>
<Navbar
logos={{
	light: Logo_h_b,
	dark: Logo_h_w
}}
links= {
	[
		{ href: "/", text: "Home" },
		{ href: "/about", text: "About" },
		{ href: "/contact", text: "Contact" }
	]
}

/>