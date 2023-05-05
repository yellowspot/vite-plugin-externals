import vue from '@vitejs/plugin-vue';
import externals from '@yellowspot/vite-plugin-externals';

export default {
  plugins: [
    vue(),
    externals({
      vue: 'Vue',
      'view-ui-plus': 'ViewUIPlus',
    })
  ],
};
