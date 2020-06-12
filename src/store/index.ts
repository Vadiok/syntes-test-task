import Vue from 'vue';
import Vuex from 'vuex';
import { getModule } from 'vuex-module-decorators';
import { ModuleTitles } from './ModuleTitles';
import { DesertModule } from './desert/desert';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    [ModuleTitles.Desert]: DesertModule,
  },
});

export const desertModule = getModule(DesertModule, store);
