<script>
  import type { Link } from './types/link';
  export let links: Link[];

  import { editing, stockLink } from './stores';

  const permaPush = () => {
    links = [...links, stockLink()];
  };
</script>

{#each links as link}
  <div class="links">
    {#if !$editing}
      <a class="description" href={link.url}>
        <div>
          {link.description}
        </div>
      </a>
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
        </div>
      </div>
    {/if}
    <svelte:self links={link.links} />
  </div>
{/each}

{#if $editing}
  <div class="links" on:click={permaPush}>
    <!-- svelte-ignore a11y-invalid-attribute -->
    <div class="description">
      <div>+</div>
    </div>
    <!-- <svelte:self links={link.links} /> -->
  </div>
{/if}

<style lang="scss">
  .links {
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

  a {
    text-decoration: none;
    color: #d4be98;
    outline: none;
    transition: 300ms;
  }
</style>
