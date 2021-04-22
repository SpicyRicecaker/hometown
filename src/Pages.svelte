<script>
  import { pages, editing } from './stores';
  import LinkPage from './LinkPage.svelte';

  const removeElement = (i: number) => {
    $pages.splice(i, 1);
    $pages = $pages;
  };
</script>

{#each $pages as page, i}
  <div class="pages">
    <LinkPage bind:links={page.links} />
    {#if $editing}
      <div class="x" on:click={() => removeElement(i)}>×</div>
    {/if}
  </div>
{/each}

<style lang="scss">
  .pages {
    background-color: #292828;
    color: #d4be98;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));

    width: 100%;
    height: 100%;

    scroll-snap-align: end;

    position: relative;
  }

  .x {
    position: absolute;
    top: 0;
    height: 100%;
    right: 0.5rem;
    color: #ea6962;
    &:hover {
      cursor: pointer;
    }

    font-size: 3rem;
  }
</style>
