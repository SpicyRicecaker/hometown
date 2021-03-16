<script>
  import type { Page } from "./types/link";
  // import { fly } from 'svelte/transition';
  export let pages: Page[];

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

  const exportJSON = () => {
    const a = document.createElement("a");
    const blob = new Blob([JSON.stringify(pages)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    a.setAttribute("href", url);
    a.setAttribute("download", `${new Date()}.json`);
    a.click();
  };

  let fileList;

  const handleImportJSON = () => {
    // Get the latest file
    const latestFile = fileList[fileList.length - 1];
    //
    pages;
  };
</script>

<div
  class="settings"
  style="transform: translate3d({-offsetReadWidth}px, 0, 0);"
  bind:this={settings}
>
  <div class="menu" bind:offsetWidth>
    <label class="custom-file-upload">
      Import JSON
      <input type="file" on:change={handleImportJSON} bind:this={fileList} />
    </label>
    <button on:click={() => exportJSON()}> Export JSON </button>
    <button> Edit Mode </button>
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
    /* Styling */
    background-color: #d4be98;
    padding: 1rem;

    /* Distribute options evenly */
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(0, 1fr));

    /* Make it so that the menu can actually be clicked */
    & > * {
      pointer-events: auto;
    }

    /* Transition so the cog is pushed
    // transition: transform .3s cubic-bezier(0, .52, 0, 1);
    // display: none;
    // transform: translate3d(-100vw, 0, 0);
    */
  }

  .gear {
    &:hover {
      cursor: pointer;
    }
  }

  .selected {
    background-color: #c18f41;
  }

  input[type="file"] {
    display: none;
  }
  .custom-file-upload {
    background-color: white;
    display: block;
    cursor: pointer;
    /* border: 1px solid black; */
  }
</style>
