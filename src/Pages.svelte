<script>
  import type { Page } from './types/link';
  export let pages: Page[];

  import LinkPage from './LinkPage.svelte';

  const _functionThatIsNeverCalledForSWCTreeShakingPurposes = () => {
    LinkPage;
  };
</script>

{#each pages as page}
  <div class="pages">
    <LinkPage links={page.links} />
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
  }
</style>
