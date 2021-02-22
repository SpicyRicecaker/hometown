<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { scrollable } from './scrollable';

  let pages = [
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school2',
      links: [
        {
          description: 'japanese',
          url: 'https://bsd.instructure.com/courses/85352',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'school',
      links: [
        {
          description: 'phys',
          url: 'https://bsd.instructure.com/courses/85348',
        },
        {
          description: 'bio',
          url: 'https://bsd.instructure.com/courses/85335',
        },
        {
          description: 'lit',
          url: 'https://bsd.instructure.com/courses/85401',
        },
        {
          description: 'tiktok',
          url: 'https://bsd.instructure.com/courses/85352',
        },
      ],
    },
    {
      description: 'tools',
      links: [
        {
          description: 'desmos',
          url: 'https://www.desmos.com/calculator',
        },
      ],
    },
  ];

  const openLink = (url: string) => {
    window.location.href = url;
  };

  let currentViewport = 1;
  let innerHeight = 0;
  let scrollY;

  const scrollToViewport = async (i: number) => {
    console.log("starting");
    window.scrollTo({
      top: innerHeight * i,
      behavior: 'smooth',
    });
    await tick();
    console.log('done');
  };

  onMount(() => {
    scrollY = innerHeight * currentViewport;
  });

  const handleScrollChange = (e) => {
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
    {#each page.links as link}
      <div
        class="links"
        on:click={() => {
          openLink(link.url);
        }}
      >
        <div class="description">
          {link.description}
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
    ::-webkit-scrollbar {
      display: none;
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
    grid-auto-flow: column;

    width: 100%;
    height: 100%;

    scroll-snap-align: end;
  }

  .links {
    // align-self: center;
    // justify-self: center;
    transition: 300ms;
    display: grid;
    &:hover {
      background-color: #d4be98;
      color: #292828;
      cursor: pointer;
    }

    & .description {
      font-size: 2rem;
      align-self: center;
      justify-self: center;
    }
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
