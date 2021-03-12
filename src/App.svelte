<script>
  import { onMount } from 'svelte';
  import Nav from './Nav.svelte';
  import Pages from './Pages.svelte';
  import { scrollable } from './scrollable';
  import { browser } from 'webextension-polyfill-ts';

  import type { Page } from './types/link';

  (async () => {
    // console.log(Cookies.2);
    // await browser.storage.sync.set({ color: 'hi' });
    // console.log(await browser.storage.sync.get('color'), 'hi');
    await browser.storage.sync.set({ color: 'hi' });
    console.log(await browser.storage.sync.get('color'));
  })();

  let pages: Page[] = [
    {
      description: 'lang',
      orientation: 'column',
      links: [
        {
          description: 'edosguide',
          url: 'https://sites.google.com/view/edoguide/home',
          orientation: 'row',
          links: [],
        },
        {
          description: 'jisho',
          url: 'https://jisho.org/',
          orientation: 'row',
          links: [],
        },
        {
          description: 'sakubi',
          url: 'https://sakubi.neocities.org/',
          orientation: 'row',
          links: [],
        },
        {
          description: 'mangadex',
          url: 'https://mangadex.org/',
          orientation: 'row',
          links: [],
        },
      ],
    },
    {
      description: 'school',
      orientation: 'column',
      links: [
        {
          description: 'phys',
          url: 'https://bsd.instructure.com/courses/85348',
          orientation: 'row',
          links: [
            {
              description: 'college physics',
              url:
                'https://openstax.org/books/college-physics/pages/1-introduction-to-science-and-the-realm-of-physics-physical-quantities-and-units',
              orientation: 'row',
              links: [],
            },
          ],
        },
        {
          description: 'bio',
          url: 'https://bsd.instructure.com/courses/85335',
          orientation: 'row',
          links: [
            {
              description: 'biology 2e',
              url: 'https://openstax.org/books/biology-2e/pages/1-introduction',
              orientation: 'row',
              links: [],
            },
          ],
        },
        {
          description: 'lit',
          url: 'https://bsd.instructure.com/courses/85401',
          orientation: 'row',
          links: [],
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
          orientation: 'row',
          links: [],
        },
      ],
    },
    {
      description: 'tools',
      orientation: 'column',
      links: [
        {
          description: 'desmos',
          url: 'https://www.desmos.com/calculator',
          orientation: 'row',
          links: [],
        },
        {
          description: 'songcloud',
          url: 'https://soundcloud.com/pivot1',
          orientation: 'row',
          links: [],
        },
        {
          description: 'google',
          url: 'https://www.google.com/',
          orientation: 'row',
          links: [],
        },
      ],
    },
  ];

  let currentViewport = 1;
  let innerHeight = 0;
  let scrollY: number;

  onMount(() => {
    scrollY = innerHeight * currentViewport;
  });

  const handleScrollChange = (e: any) => {
    currentViewport = e.detail.newCurrentViewport;
  };
</script>

<svelte:window
  bind:innerHeight
  bind:scrollY
  use:scrollable={currentViewport}
  on:scrollchange={handleScrollChange}
/>

<Pages bind:pages />
<Nav bind:pages bind:currentViewport />

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
  }

  @media (min-width: 640px) {
    :global(body) {
      max-width: none;
    }
  }
</style>
