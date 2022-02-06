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

- "Edit" mode
  - [ ] Stabilize menu
  - [ ] Drag pages and links
    - It's exceedingly annoying to re-edit links as of now
  - [ ] Change default page
    - Should be able to just add position absolute button to every page, then update default page by that index
    - stored in separate `user` variable? or should we have individual sublinks?
    - how in the world do we migrate data? yikers
- [x] Sublinks for major links
  - [ ] Animated moving up to halfway in the opposite direction of the major grid
  - [ ] Each link or page needs to have an orientation of up-down or left-right
- [ ] RAIN
  - [ ] Rain via canvas + rust wasm

## Attributions

Thanks to [Sainhe](https://github.com/sainnhe/gruvbox-material) for making the beautiful Gruvbox Material theme!

<div>Town extension icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
