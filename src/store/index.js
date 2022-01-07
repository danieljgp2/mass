import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from "./user"
import service from "./service"

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ user: state.user }),
  filter: (mutation) => mutation.type === 'setUser'
})

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    setLoader: (state, loading) => {
      state.loading = loading;
    }
  },
  getters: {
    isLoading: (state) => {
      return state.loading;
    }
  },
  actions: {
  },
  modules: {
    user,
    service
  },
  plugins: [vuexLocal.plugin]
})
