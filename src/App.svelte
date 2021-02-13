<script lang="ts">
  import { onMount } from 'svelte';

  let links = [
    { description: 'phys', url: 'https://bsd.instructure.com/courses/85348' },
    { description: 'bio', url: 'https://bsd.instructure.com/courses/85335' },
    { description: 'lit', url: 'https://bsd.instructure.com/courses/85401' },
    { description: 'tiktok', url: 'https://bsd.instructure.com/courses/85352' },
  ];

  const openLink = (url: string) => {
    window.open(url);
  };

  onMount(async () => {});
</script>

<main>
  {#each links as link}
    <div
      class="topic"
      on:click={() => {
        openLink(link.url);
      }}
    >
      <div class="description">
        {link.description}
      </div>
    </div>
  {/each}
</main>

<style lang="scss">
  :global(body) {
    margin: 0;
    padding: 0;
  }
  main {
    background-color: #292828;
    color: #d4be98;

    width: 100%;
    height: 100%;

    display: grid;
    // grid-template-columns: repeat(minmax(0, 1fr), minmax(0, 1fr), minmax(0, 1fr), minmax(0, 1fr));
    // grid-template-columns: 1fr 1fr 1fr 1fr;
    // grid-template-columns:repeat(1fr);
    // grid-template-rows: repeat(1fr);
    // grid-auto-columns: max-content;
    grid-auto-flow: column;

    // display: flex;
    // flex-direction: row;

    // flex: 1;
    // justify-content: stretch;
    // align-content: stretch;
    // background-color: aqua;
  }

  .topic {
    // align-self: center;
    // justify-self: center;
    transition: 300ms;
    display: grid;
    &:hover {
      background-color: #d4be98;
      color: #292828;
      cursor: cell;
    }

    & .description {
      font-size: 2rem;
      align-self: center;
      justify-self: center;
    }
  }

  // h1 {
  //   color: #ff3e00;
  //   text-transform: uppercase;
  //   font-size: 4em;
  //   font-weight: 100;
  // }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
