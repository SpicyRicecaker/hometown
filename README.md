# Hometown

Grid-based customizable homepage extension, with rain.

> POV: You are at home, the rain is pouring outside, but you chillin' inside, reading a really good book.

## Building

Install [pnpm](https://pnpm.js.org/en/installation) via

```shell
npm install -g pnpm
```

Install dependencies
```
pnpm install
```

Build!
```
pnpm build
```

## TODO

- [x] Snap scroll multiple pages?
  - E.g. snap up for search engines, snap down for music
- [x] **Separate default layout with custom user layouts**
  - ~~[ ] Create indexedDB to store config~~
  - [x] using extension storage instead
- "Edit" mode
  - [x] Cog icon that opens absolute-positioned side menu, with edit button
  - [x] In edit mode, create a temporary grid component on each level
  - [x] When user clicks this temporary grid, add a real grid
  - [ ] Change default page
- [x] Sublinks for major links
  - [ ] Animated moving up to halfway in the opposite direction of the major grid
  - [x] Use `<svelte:self>`, this means actually making separate components
    - [ ] Each layer needs to have an orientation of up-down or left-right
- [ ] RAIN
  - [ ] Rain via canvas + rust wasm

## Attributions

Thanks to [Sainhe](https://github.com/sainnhe/gruvbox-material) for making the beautiful Gruvbox Material theme!

<div>Town extension icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>