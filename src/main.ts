import Vue from 'vue';
import 'modern-normalize/modern-normalize.css';
import 'roboto-fontface/css/roboto/sass/roboto-fontface-regular.scss';
import 'roboto-fontface/css/roboto/sass/roboto-fontface-bold.scss';
import { store } from '@/store';
import App from '@/App.vue';
import '@/styles/main.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
