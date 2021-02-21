<script lang="ts">
  import { onMount } from 'svelte';

  let pages = [
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

  onMount(async () => {});
  
  const propScroll = (e: UIEvent) => {
    e.preventDefault();
    
  }
</script>

<main>
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
    {#each pages as page, i}
      <div on:scroll={(e) => propScroll(e)}></div>
    {/each}
  </div>
</main>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
  }
  main {
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }

    width: 100%;
    height: 100%;
    scroll-snap-type: y mandatory;
    overflow-y: auto;
  }

  .nav {
    // Align to right middle
    position: fixed;
    top: 0;
    height: 100%;
    right: .5rem;

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
      padding: .5rem;
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

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
