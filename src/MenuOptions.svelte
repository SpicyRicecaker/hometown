<script lang="ts">
  import { pages, sync } from './stores';
  import { editing } from './stores';

  let fileList: HTMLInputElement;

  // Exports user's page config through making a download tag and clicking on it
  const exportJSON = () => {
    // Serialize data into data url
    const blob = new Blob([JSON.stringify($pages)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    // Make a name for the config file
    const d = new Date();
    const s = `hometown-${d.getDate()}-${d.toLocaleString('default', {
      month: 'long',
    })}-${d.getFullYear()}`;
    // Create a download tag with the right attributes, and click on it
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `${s}.json`);
    a.click();
  };

  // Redirects click to type=input
  const clickFileInput = (e: MouseEvent) => {
    e.preventDefault();
    fileList.click();
  };

  // Imports user's page files by reading file list
  const importJSON = async () => {
    const latestFile: File = fileList.files[fileList.files.length - 1];
    try {
      $pages = JSON.parse(await readAsTextAsync(latestFile));
      await sync($pages);
    } catch (e) {
      console.log(e);
    }
  };

  // Reads a file using async/await
  const readAsTextAsync = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;
    });

  // Toggles editing mode, pretty important
  const toggleEditing = async () => {
    if ($editing) {
      await sync($pages);
    }
    editing.toggle();
  };
</script>

<!-- Hidden by default so we can style with <div>s in front -->
<input type="file" accept=".json" on:change={importJSON} bind:this={fileList} />
<!-- Button that activates input type=file -->
<div class="import" on:click={(e) => clickFileInput(e)}>
  <div>Import</div>
</div>
<!-- Button that downloads page config -->
<div class="export" on:click={() => exportJSON()}>
  <div>Export</div>
</div>
<!-- Button that enables editing -->
<div class="edit" on:click={() => toggleEditing()}>
  <div>{$editing ? 'Save' : 'Edit'}</div>
</div>
<span class="export">
  <div>
    <span>2</span><span>nd</span>
  </div>
</span>

<style lang="scss">
  .import,
  .export,
  .edit {
    // Theme
    color: #d4be98;
    background-color: #292828;

    // Transition on hover
    transition: 300ms;
    &:hover {
      background-color: #d4be98;
      color: #292828;
      cursor: pointer;
    }

    // Center text in each button
    display: grid;
    & > * {
      align-self: center;
      justify-self: center;
    }

    // Make sure that we're able to click on them
    pointer-events: auto;
    
    // No select
    user-select: none;
  }

  // input[type='file'] hidden for stylistic purposes
  input[type='file'] {
    display: none;
  }
</style>
