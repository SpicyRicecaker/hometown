<script>
  import type { Link } from './types/link';
  export let links: Link[];
</script>

{#each links as link}
  <div class="links">
    <a class="description" href={link.url}>
      <div>
        {link.description}
      </div>
    </a>
    <svelte:self links={link.links} />
  </div>
{/each}

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
