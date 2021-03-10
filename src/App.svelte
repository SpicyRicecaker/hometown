<script>
  import { onMount } from 'svelte';
  import { scrollable } from './scrollable';

  let pages = [
    {
      description: 'lang',
      links: [
        {
          description: 'edosguide',
          url: 'https://sites.google.com/view/edoguide/home',
          links: [],
        },
        {
          description: 'jisho',
          url: 'https://jisho.org/',
          links: [],
        },
        {
          description: 'sakubi',
          url: 'https://sakubi.neocities.org/',
          links: [],
        },
        {
          description: 'mangadex',
          url: 'https://mangadex.org/',
          links: [],
        },
      ],
    },
    {
      description: 'school',
      links: [
        {
          description: 'phys',
          url: 'https://bsd.instructure.com/courses/85348',
          links: [
            {
              description: 'college physics',
              url:
                'https://openstax.org/books/college-physics/pages/1-introduction-to-science-and-the-realm-of-physics-physical-quantities-and-units',
            },
          ],
        },
        {
          description: 'bio',
          url: 'https://bsd.instructure.com/courses/85335',
          links: [
            {
              description: 'biology 2e',
              url: 'https://openstax.org/books/biology-2e/pages/1-introduction',
            },
          ],
        },
        {
          description: 'lit',
          url: 'https://bsd.instructure.com/courses/85401',
          links: [],
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
          links: [],
        },
      ],
    },
    {
      description: 'tools',
      links: [
        {
          description: 'desmos',
          url: 'https://www.desmos.com/calculator',
          links: [],
        },
        {
          description: 'songcloud',
          url: 'https://soundcloud.com/pivot1',
          links: [],
        },
        {
          description: 'google',
          url: 'https://www.google.com/',
          links: [],
        },
      ],
    },
  ];

  const _functionThatIsNeverCalledForSWCTreeShakingPurposes = () => {
    scrollable(1, 1);
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
    <!-- We should make `Links.svelte` its own component, and have it recursively display links-->
    <!-- This means that our pages.JSON should also have `orientation` attribute -->
    {#each page.links as link}
      <div class="links">
        <a class="description" href={link.url}>
          <div>
            {link.description}
          </div>
        </a>
        <div class="links">
          {#each link.links as sublink}
            <a class="description" href={sublink.url}
              ><div>
                {sublink.description}
              </div></a
            >
          {/each}
        </div>
      </div>
    {/each}
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

  .links {
    // align-self: center;
    // justify-self: center;
    display: flex;
    flex-direction: column;

    & .description {
      transition: 300ms;

      font-size: 2rem;
      &:hover {
        background-color: #d4be98;
        color: #292828;
        cursor: pointer;
      }
      width: 100%;
      height: 100%;

      display: grid;
      & * {
        align-self: center;
        justify-self: center;
      }
    }
  }

  .selected {
    background-color: #c18f41;
  }

  a {
    text-decoration: none;
    color: #d4be98;
    outline: none;
    transition: 300ms;
  }

  @media (min-width: 640px) {
    :global(body) {
      max-width: none;
    }
  }
</style>
