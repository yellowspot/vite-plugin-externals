import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus';
import { createI18n } from 'vue-i18n';

import './style.css'
import App from './App.vue'

import zh from 'view-ui-plus/dist/locale/zh-CN';
import en from 'view-ui-plus/dist/locale/en-US';

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: 'en-US',
  messages: {
    'zh-CN': zh,
    'en-US': en
  }
});

createApp(App)
  .use(i18n)
  .use(ViewUIPlus)
  .mount('#app')
