<script lang="ts">
  // onMount from svelte library runs when the component is first visible on DOM
  import { onMount, tick } from 'svelte';
  // Our main components of the program
  import Nav from './Nav.svelte'; // Nav are the dots you see to the right
  import Pages from './Pages.svelte'; // Pages are a screen's height, they hold the links that you click on
  import Menu from './Menu.svelte'; // Menu opens the config to import, export, and edit our pages
  // Scrollable is our main method of keeping track of which page we're on
  import { scrollable } from './scrollable';
  // We've gotta load our pages from browser extension storage into our live storage
  import { pages, getPagesFromBrowser } from './stores';

  // These three variables allow us to calculate which page we're on
  // and generate a minimap for it
  let currentViewport = 1; // Current viewport is the page that we're on
  let innerHeight = 0; // Inner height is the height of each page
  let scrollY: number = 0; // ScrollY is how far we've scrolled in total

  // When this component is first loaded into the DOM (is visible)
  onMount(async () => {
    // Load our pages from browser storage
    $pages = await getPagesFromBrowser($pages);
    await tick();
    // Claculate the amount we've scrolled
    scrollY = innerHeight * currentViewport;
  });

  // Everytime that we've calculated that we've moved to a new page,
  // update our current viewport visually
  const handleScrollChange = (e: any) => {
    currentViewport = e.detail.newCurrentViewport;
  };
</script>

<!-- Pass scroll events -> scrollabe, take in viewport changes from scrollable -->
<svelte:window
  bind:innerHeight
  bind:scrollY
  use:scrollable={currentViewport}
  on:scrollchange={handleScrollChange}
/>

<!-- Pages are a screens height and hold links-->
<Pages />
<!-- Nav consists of the dots you see to the right -->
<Nav bind:currentViewport />
<!-- Menu consists of edit,import,export options for pages -->
<Menu />

<style lang="scss">
  :global(html) {
    // Try not to show scrollbar
    overflow: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      width: 0;
    }

    // Scroll snap is scroll correction, does not work unless 100% w/h
    scroll-snap-type: y proximity;

    width: 100%;
    height: 100%;
  }
  :global(body) {
    margin: 0;
    padding: 0;
    // Tries to prevent screen flashing on load
    background-color: #292828;
  }

  @media (min-width: 640px) {
    :global(body) {
      max-width: none;
    }
  }
</style>
