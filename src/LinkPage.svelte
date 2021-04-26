<script>
  import type { Link } from './types/link';
  export let links: Link[];

  import { editing, stockLink } from './stores';

  // Pushes a link in link list
  const pushElement = () => {
    links = [...links, stockLink()];
  };

  // Removes a link from link list
  const removeElement = (i: number) => {
    links.splice(i, 1);
    links = links;
  };
</script>

{#each links as link, i}
  <div class="links">
    <!-- In normal mode, show just the user assigned name for the website -->
    {#if !$editing}
      <a class="description" draggable="false" href={link.url}>
        <div>
          {link.description}
        </div>
      </a>
      <!-- In edit mode, show description, link, delete, and add buttons for every link -->
    {:else}
      <div class="description">
        <div>
          <span>[</span><span
            contenteditable="true"
            bind:innerHTML={link.description}
          /><span>](</span><span
            contenteditable="true"
            bind:innerHTML={link.url}
          /><span>)</span>
          <span on:click={() => removeElement(i)} style="color: #ea6962">×</span
          >
        </div>
      </div>
    {/if}
    <svelte:self links={link.links} />
  </div>
{/each}

<!-- In edit mode, create an extra link panel that when clicked, adds a new link -->
{#if $editing}
  <div class="links" on:click={pushElement}>
    <div class="description">
      <div>+</div>
    </div>
  </div>
{/if}

<style lang="scss">
  .links {
    display: flex;
    flex-direction: column;

    & > .description {
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
      & > * {
        align-self: center;
        justify-self: center;
        word-break: break-all;
        user-select: none;
      }
    }
  }

  a {
    text-decoration: none;
    color: #d4be98;
    outline: none;
  }
</style>
