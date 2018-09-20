import Vue from 'vue'
import Vuex from 'vuex'
import pathAnalysis from './modules/pathAnalysis';
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    pathAnalysis
  }
})
