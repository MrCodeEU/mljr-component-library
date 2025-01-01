<script lang="ts">
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';
  import { DarkMode } from 'flowbite-svelte';

  type NavbarProps = {
    logos: {
      light: string;
      dark: string;
    };
    links: Array<{ href: string; text: string }>;
  };

  let props = $props<NavbarProps>();
</script>

<Navbar class="neo-brutalist-navbar border-4 border-black">
  <NavBrand href="/" class="neo-brutalist-brand">
    <img src={props.logos.light} class="me-3 h-8 sm:h-10 dark:hidden" alt="MLJR Logo Light" />
    <img src={props.logos.dark} class="me-3 h-8 sm:h-10 hidden dark:block" alt="MLJR Logo Dark" />
    <span class="self-center whitespace-nowrap text-xl font-bold font-mono dark:text-white"></span>
  </NavBrand>
  <NavUl class="h-full">
    {#each props.links as link}
      <NavLi href={link.href} class="neo-brutalist-nav-item mx-1">
        {link.text}
      </NavLi>
    {/each}
  </NavUl>
  <div class="flex gap-4">
    <DarkMode class="neo-brutalist-button p-2 text-lg" />
    <NavHamburger class="neo-brutalist-button p-2 text-lg" />
  </div>
</Navbar>
