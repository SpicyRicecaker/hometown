<script lang="ts">
  // Idea: Menu is a module that's hidden by default. On click, we'll literally just insert it into the dom and animate it
  // It must be less expensive than loading it everytime the user tries to quickload something
  import MenuOptions from './MenuOptions.svelte';
  let visible: boolean = false;

  let offsetWidth: number = 0;
  let offsetReadWidth: number = offsetWidth;

  $: {
    offsetReadWidth = offsetWidth;
  }

  let settings: any;
  let changeSettings = () => {
    visible = !visible;
    if (!visible) {
      offsetReadWidth = offsetWidth;
    } else {
      offsetReadWidth = 0;
    }
  };
</script>

<!-- .settings is like the cog icon -->
<div
  class="settings"
  style="transform: translate3d({-offsetReadWidth}px, 0, 0);"
  bind:this={settings}
>
  <!-- .menu are the options that the settings cog pulls up -->
  <div class="menu" bind:offsetWidth>
    <MenuOptions />
  </div>
  <div
    class="toggle"
    on:click={() => {
      changeSettings();
    }}
  >
    <div class="gear">&#9776;</div>
  </div>
</div>

<style lang="scss">
  .settings {
    color: #7c6f64;
    // Align to right middle
    position: fixed;
    top: 0;
    height: 100%;
    // padding: 0.5rem;

    // Compress content (circles) to mid
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;

    // align-content: center;
    // Have just a small gap in between
    pointer-events: none;
    transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);

    // transform: translate3d(-10vw, 0, 0);
  }

  .toggle {
    font-size: 1.5rem;
    pointer-events: none;
    & > * {
      pointer-events: auto;
    }
  }

  .menu {
    background-color: #d4be98;

    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
  }

  .gear {
    user-select: none;
    &:hover {
      cursor: pointer;
    }
  }
</style>
