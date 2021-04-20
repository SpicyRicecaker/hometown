// Import writable store from svelte library
import { writable } from 'svelte/store';
// Import browser store, given to web extensions
import { browser } from 'webextension-polyfill-ts';
// Import page type
import type { Page } from './types/link';

// Creates our page store
// On update also push to browser store
const createPages = () => {
  const { subscribe, set } = writable<Page[]>([]);

  return {
    subscribe,
    sync: async () => await browser.storage.sync.set({ pages: pages }),
    set,
  };
};

export const getPagesFromBrowser = async (): Promise<Page[]> => {
  const res: Page[] = (await browser.storage.sync.get()) as Page[];
  return res ? res : [];
};

export const pages = createPages();
