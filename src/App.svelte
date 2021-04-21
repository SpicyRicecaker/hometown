<script>
  import { onMount } from 'svelte';
  import Nav from './Nav.svelte';
  import Pages from './Pages.svelte';
  import Menu from './Menu.svelte';
  import { scrollable } from './scrollable';
  import { pages, getPagesFromBrowser } from './stores';

  let currentViewport = 1;
  let innerHeight = 0;
  let scrollY: number;

  onMount(async () => {
    // Load initial height
    scrollY = innerHeight * currentViewport;
    // Load our pages from browser storage
    $pages = await getPagesFromBrowser($pages);
  });

  const handleScrollChange = (e: any) => {
    currentViewport = e.detail.newCurrentViewport;
  };

  // // Make sure to update our internal storage everytime page is changed
  // $: {
  //   // Probably inefficient, because right as we set pages in the beginning we're updating for no reason
  //   (async () => {
  //     await browser.storage.sync.set({ pages: pages });
  //   })();
  // }
</script>

<svelte:window
  bind:innerHeight
  bind:scrollY
  use:scrollable={currentViewport}
  on:scrollchange={handleScrollChange}
/>

<Pages />
<Nav bind:currentViewport />
<Menu />

<style lang="scss">
  :global(html) {
    overflow: auto;
    scroll-snap-type: y proximity;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0;
    }

    width: 100%;
    height: 100%;
  }
  :global(body) {
    margin: 0;
    padding: 0;
    // Probably will remove l8r
    background-color: #292828;
  }

  @media (min-width: 640px) {
    :global(body) {
      max-width: none;
    }
  }
</style>
