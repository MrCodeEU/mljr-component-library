<script lang="ts">
        import { Separator as NavbarSeparator } from "$lib/components/ui/navbar";
        import * as Navbar from "$lib/components/ui/navbar";
        import { Button } from "$lib/components/ui/button";
</script>

<!-- TODO: Make the navbar the mljr.eu navbar prebuilt -->
<nav>
    <Navbar.Root>
        {#snippet brand()}
        <Navbar.Brand>
            <span class="text-2xl font-bold">🚀</span>
            <span>Component Library</span>
        </Navbar.Brand>
        {/snippet}
        <Navbar.Content>
                <Button variant="ghost">Home</Button>
                <Button variant="ghost">About</Button>
                <Button variant="ghost">Contact</Button>
                <NavbarSeparator class="hidden md:block" />
                <Button>Sign Up</Button>
        </Navbar.Content>
    </Navbar.Root>
</nav>
