<script>
  import { pages, sync } from './stores';

  let fileList: HTMLInputElement;

  // Exports user's page files
  const exportJSON = () => {
    const a = document.createElement('a');
    const blob = new Blob([JSON.stringify(pages)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    a.setAttribute('href', url);
    a.setAttribute('download', `${new Date()}.json`);
    a.click();
  };

  const clickFile = (e: MouseEvent) => {
    e.preventDefault();
    fileList.click();
  };

  // Imports user's page files
  const handleImportJSON = async () => {
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
</script>

<input
  type="file"
  accept=".json"
  on:change={handleImportJSON}
  bind:this={fileList}
/>
<div class="import" on:click={(e) => clickFile(e)}>
  <div>Import</div>
</div>
<div class="export" on:click={() => exportJSON()}>
  <div>Export</div>
</div>
<div class="edit">
  <div>Edit</div>
</div>

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

    display: grid;
    & > * {
      align-self: center;
      justify-self: center;
    }

    // Make sure that we're able to click on them
    pointer-events: auto;
  }

  input[type='file'] {
    display: none;
  }
</style>
