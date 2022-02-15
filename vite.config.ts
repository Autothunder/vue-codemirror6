import { defineConfig, UserConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
const config: UserConfig = {
  resolve: {
    // https://vitejs.dev/config/#resolve-alias
    alias: [
      // make vue external
      {
        find: 'vue',
        replacement: path.resolve(
          __dirname,
          './node_modules/vue/dist/vue.runtime.esm.js'
        ),
      },
      {
        // vue @ shortcut fix
        find: '@/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, './src')}/`,
      },
    ],
    // External
    dedupe: ['vue'],
  },
  // https://vitejs.dev/config/#server-options
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
  plugins: [
    // Vue2
    // https://github.com/underfin/vite-plugin-vue2
    createVuePlugin({
      target: 'esnext',
    }),
    // eslint
    // https://github.com/gxmari007/vite-plugin-eslint
    eslintPlugin({
      fix: true,
    }),
  ],
  // Build Options
  // https://vitejs.dev/config/#build-options
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'CodeMirror',
      fileName: format => `vue-codemirror6.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-property-decorator',
        '@codemirror/state',
        '@codemirror/view',
        '@codemirror/lint',
        '@codemirror/language',
      ],
      output: {
        globals: {
          vue: 'Vue',
          'vue-property-decorator': 'vuePropertyDecorator',
          '@codemirror/state': 'state',
          '@codemirror/view': 'view',
        },
      },
    },
    target: 'es2021',
    /*
    // Minify option
    // https://vitejs.dev/config/#build-minify
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      parse: {},
      compress: { drop_console: true },
      mangle: true, // Note `mangle.properties` is `false` by default.
      module: true,
      output: { comments: true, beautify: false },
    },
    */
  },
};

// Export vite config
export default defineConfig(config);
/*
export default defineConfig(async ({ command }): Promise<UserConfig> => {

  // Hook production build.
  if (command === 'build') {
    // Write meta data.
    fs.writeFileSync(
      path.resolve(path.join(__dirname, 'src/Meta.ts')),
      `import MetaInterface from './interfaces/MetaInterface';

// This file is auto-generated by the build system.
const meta: MetaInterface = {
  version: '${require('./package.json').version}',
  date: '${new Date().toISOString()}',
};
export default meta;
`
    );
  }
  return config;
});
*/
