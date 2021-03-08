const sveltePreprocess = require('svelte-preprocess');
const transformSync = require('@swc/core').transformSync;
// const production = !process.env.ROLLUP_WATCH;

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
      // map: production ? ctx.map : false,
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
