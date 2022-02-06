<script lang="ts">
  import { pages, editing } from "./stores";
  import LinkPage from "./LinkPage.svelte";

  // Removes a page from the list of pages
  const removeElement = (i: number) => {
    $pages.splice(i, 1);
    $pages = $pages;
  };
</script>

<!-- Loop through every page -->
{#each $pages as page, i}
  <div class="pages">
    <LinkPage bind:links="{page.links}" />
    {#if $editing}
      <div class="x" on:click="{() => removeElement(i)}">×</div>
    {/if}
  </div>
{/each}

<style lang="scss">
  .pages {
    // Gruvbox theme
    background-color: #292828;
    color: #d4be98;
    // Layout should fill up exactly the size of one screen
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    width: 100%;
    height: 100%;
    // Scroll snap is really important, enables scroll snap from `app.svelte` to work
    scroll-snap-align: end;
    // Enables the x on each page to be placed absolutely
    position: relative;
  }

  .x {
    // X should be on top right
    position: absolute;
    top: 0;
    height: 100%;
    right: 0.5rem;
    // Big & red
    color: #ea6962;
    font-size: 3rem;
    // Pointer on hover
    &:hover {
      cursor: pointer;
    }
  }
</style>
