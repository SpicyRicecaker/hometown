const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');
// Imports the WasmPackPlugin, which allows ez interfacingf with .wasm files generated from wasm-pack
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
// Import esbuild plugin for typescript
const { transformSync } = require('@swc/core');

module.exports = {
  entry: {
    'build/bundle': ['./src/main.ts'],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      // Changed from ts-loader to esbuild loader
      {
        test: /\.ts$/,
        // loader: 'esbuild-loader',
        // options: {
        //   loader: 'ts',
        // },
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: "typescript"
              }
            }
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess({
              sourceMap: !prod,
              typescript({ content }) {
                // *SWC* is 30x faster than ESBuild wat
                // const old = new Date();
                const { code, map } = transformSync(content, {
                  jsc: {
                    parser: {
                      syntax: 'typescript',
                    },
                  },
                });
                // console.log(
                //   new Date().getMilliseconds() - old.getMilliseconds()
                // );
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
            }),
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // Sets the WasmPackPlugin to the directory above
    new WasmPackPlugin({
      crateDirectory: __dirname,
    }),
  ],
  devtool: prod ? false : 'source-map',
  devServer: {
    hot: true,
  },
  experiments: {
    asyncWebAssembly: true,
  },
};
