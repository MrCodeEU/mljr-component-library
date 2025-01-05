<script lang="ts">
  import { Navbar, NavBrand, NavHamburger, NavUl } from 'flowbite-svelte';
  import { DarkMode } from 'flowbite-svelte';
  import Button from '$lib/UI/Button.svelte';

  interface Props  {
    logos: {
      light: string;
      dark: string;
    };
    globalLinks: Array<{ href: string; text: string }>;
    sectionLinks: Array<{ href: string; text: string }>;
  }

  let { logos, globalLinks, sectionLinks } = $props();
</script>

<div class=" m-8">
  <Navbar class="neo-brutalist-navbar border-4 border-black">
    <div class="max-w-7xl mx-auto w-full">
      <div class="flex justify-between items-center w-full">
        <NavBrand href="/" class="neo-brutalist-brand">
          <img src={logos.light} class="me-3 h-8 sm:h-10 dark:hidden" alt="MLJR Logo Light" />
          <img src={logos.dark} class="me-3 h-8 sm:h-10 hidden dark:block" alt="MLJR Logo Dark" />
          <span class="self-center whitespace-nowrap text-xl font-bold font-mono dark:text-white"></span>
        </NavBrand>
        <NavUl class="h-full flex gap-4">
          <div class="flex items-center gap-2">
            {#each sectionLinks as link, i}
              <a href={link.href}>
                <Button colorIndex={i}>
                  {link.text}
                </Button>
              </a>
            {/each}
          </div>
          <div class="flex items-center gap-2 border-l-2 dark:border-gray-300 border-black pl-4">
            {#each globalLinks as link, i}
              <a href={link.href}>
                <Button colorIndex={i + sectionLinks.length}>
                  {link.text}
                </Button>
              </a>
            {/each}
          </div>
        </NavUl>
        <div class="flex gap-4">
          <DarkMode class="neo-brutalist-button p-2 text-lg" />
          <NavHamburger class="neo-brutalist-button p-2 text-lg" />
        </div>
      </div>
    </div>
  </Navbar>
</div>
