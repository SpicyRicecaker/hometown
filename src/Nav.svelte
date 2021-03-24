<script lang="ts">
  import type { Page } from "./types/link";
  export let pages: Page[];
  export let currentViewport: number;

  const scrollToViewport = (i: number) => {
    window.scrollTo({
      top: innerHeight * i,
      behavior: "smooth",
    });
  };
</script>

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
  .nav {
    // Align to right middle
    position: fixed;
    top: 0;
    height: 100%;
    right: 0.5rem;

    // Compress content (circles) to mid
    display: grid;
    align-content: center;
    /* Have just a small gap in between */
    gap: 1rem;
    pointer-events: none;
    & > * {
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

  .selected {
    background-color: #c18f41;
  }
</style>
