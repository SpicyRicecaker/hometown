// This file is a straight copy of the svelte-preprocess config inside the `webpack.config.js` file,
// but we need this since the svelte lsp uses this to give us that juicy error info
// 
// Keep in mind that according to the official docs, we *must use CommonJS* in this file.
 
const sveltePreprocess = require('svelte-preprocess');
const transformSync = require('@swc/core').transformSync;

const createPreprocessors = () =>
  sveltePreprocess({
    typescript({ content }) {
      const { code, map } = transformSync(content, {
        jsc: {
          parser: {
            syntax: 'typescript',
          },
        },
      });
      return { code, map };
    },
    postcss: {
      // Not needed unless we're adding more plugins I think
      // syntax: require('postcss-scss'),
      // parser: require('postcss-scss'),
      plugins: [require('autoprefixer')],
    },
    defaults: {
      script: 'ts',
      style: 'scss',
    },
  });

module.exports = {
  preprocess: createPreprocessors(true),
  createPreprocessors,
};
