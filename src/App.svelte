<script>
  import { onMount } from 'svelte';
  import LinkPage from './LinkPage.svelte';
  import { scrollable } from './scrollable';
  import type { Link, Page } from './types/link';

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

  const _functionThatIsNeverCalledForSWCTreeShakingPurposes = () => {
    scrollable(1, 1);
    LinkPage
  };

  let currentViewport = 1;
  let innerHeight = 0;
  let scrollY: number;

  const scrollToViewport = (i: number) => {
    window.scrollTo({
      top: innerHeight * i,
      behavior: 'smooth',
    });
  };

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

{#each pages as page}
  <div class="pages">
    <LinkPage links={page.links} />
  </div>
{/each}
<div class="nav">
  {#each pages as _page, i}
    <div
      class:selected={i === currentViewport}
      on:click={(_e) => {
        scrollToViewport(i);
      }}
    />
  {/each}
</div>

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

  .nav {
    // Align to right middle
    position: fixed;
    top: 0;
    height: 100%;
    right: 0.5rem;

    // Compress content (circles) to mid
    display: grid;
    align-content: center;
    // Have just a small gap in between
    gap: 1rem;
    pointer-events: none;
    & * {
      pointer-events: auto;
      // cursor: cell;
      display: block;
      background-color: #7c6f64;
      padding: 0.5rem;
      align-self: center;
      justify-self: center;
      border-radius: 100%;
    }
  }

  .pages {
    background-color: #292828;
    color: #d4be98;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));

    width: 100%;
    height: 100%;

    scroll-snap-align: end;
  }


  .selected {
    background-color: #c18f41;
  }


  @media (min-width: 640px) {
    :global(body) {
      max-width: none;
    }
  }
</style>
