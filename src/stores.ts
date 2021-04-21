// Import writable store from svelte library
import { writable } from 'svelte/store';
// Import browser store, given to web extensions
import { browser } from 'webextension-polyfill-ts';
// Import page type
import type { Page } from './types/link';

// Creates our page store
const createPages = () => {
  const { subscribe, set } = writable<Page[]>([]);

  return {
    subscribe,
    set,
  };
};

// Called when initializing app.svelte
// takes in our stored pages from storage granted to browser extensions,
// then sets our current pages equal to it
export const getPagesFromBrowser = async (): Promise<Page[]> => {
  const { pages } = await browser.storage.sync.get();
  return pages ? pages : [];
};

// Should be called whenever pages changes
// The reason that we're not always calling this onchange is because
// when app.svelte initializes, the pages value gets changed multiple times
// So we're calling this manually
//
// *TODO* If we're updating it manually, it would probably make more sense if we made a pagesDB and manually updated that
export const sync = async (pages: Page[]): Promise<void> =>
  await browser.storage.sync.set({ pages: pages });

// Our page store, very important and holds all information about every page
export const pages = createPages();
