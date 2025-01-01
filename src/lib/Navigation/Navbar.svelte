<script lang="ts">
  import { Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';
  import { DarkMode } from 'flowbite-svelte';

  interface Props  {
    logos: {
      light: string;
      dark: string;
    };
    globalLinks: Array<{ href: string; text: string }>;
    sectionLinks: Array<{ href: string; text: string }>;
  }

  const brutalistColors = [
    { bg: 'bg-yellow-300', hover: 'hover:bg-yellow-400' },
    { bg: 'bg-red-400', hover: 'hover:bg-red-500' },
    { bg: 'bg-blue-400', hover: 'hover:bg-blue-500' },
    { bg: 'bg-green-400', hover: 'hover:bg-green-500' },
    { bg: 'bg-pink-400', hover: 'hover:bg-pink-500' },
    { bg: 'bg-orange-400', hover: 'hover:bg-orange-500' },
  ];

  const getColor = (index: number) => {
    const colorSet = brutalistColors[index % brutalistColors.length];
    return `${colorSet.bg} ${colorSet.hover}`;
  };

  let { logos, globalLinks, sectionLinks } = $props();
</script>

<Navbar class="neo-brutalist-navbar border-4 border-black">
  <NavBrand href="/" class="neo-brutalist-brand">
    <img src={logos.light} class="me-3 h-8 sm:h-10 dark:hidden" alt="MLJR Logo Light" />
    <img src={logos.dark} class="me-3 h-8 sm:h-10 hidden dark:block" alt="MLJR Logo Dark" />
    <span class="self-center whitespace-nowrap text-xl font-bold font-mono dark:text-white"></span>
  </NavBrand>
  <NavUl class="h-full flex gap-4">
    <div class="flex items-center gap-2">
      {#each sectionLinks as link, i}
        <NavLi href={link.href} class="neo-brutalist-nav-item mx-1 {getColor(i)}">
          {link.text}
        </NavLi>
      {/each}
    </div>
    <div class="flex items-center gap-2 border-l-2 dark:border-gray-300 border-gray-500 pl-4">
      {#each globalLinks as link, i}
        <NavLi href={link.href} class="neo-brutalist-nav-item mx-1 {getColor(i + sectionLinks.length)}">
          {link.text}
        </NavLi>
      {/each}
    </div>
  </NavUl>
  <div class="flex gap-4">
    <DarkMode class="neo-brutalist-button p-2 text-lg" />
    <NavHamburger class="neo-brutalist-button p-2 text-lg" />
  </div>
</Navbar>
