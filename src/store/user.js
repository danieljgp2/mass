import { ToastProgrammatic as toast } from "buefy";

import { doRequest } from "../api/base";
import { signIn, signUp } from "../api/user";
import router from "../router";
import i18n from '../i18n';

const INITIAL_STATE = {
  data: {
    token: ""
  }
};

const user = {
  state: () => INITIAL_STATE,
  mutations: {
    resetUser: (state) => {
      state.data = INITIAL_STATE.data;
    },
    setUser: (state, payload) => {
      state.data = payload;
    }
  },
  getters: {
    user: (state) => state.data
  },
  actions: {
    async logOut({ commit }) {
      localStorage.removeItem('vuex');
      commit('resetUser');
      await router.push('/sign-in');
    },
    getUser ({ commit }, credentials) {
      commit('setLoader', true);
      doRequest(signIn(credentials))
        .then(async (response) => {
          commit('setUser', response);
          commit('setLoader', false);
          await router.push('/');
        })
        .catch((err) => {
          commit('setLoader', false);
          toast.open({
            message: err.error?.includes('invalid_user')
              ? i18n.t('Invalid email or password')
              : i18n.t('Something went wrong, please make sure all the required fields are present'),
            type: 'is-danger',
            pauseOnHover: true
          });
        })
    },
    createUser ({ commit }, credentials) {
      commit('setLoader', true);
      doRequest(signUp(credentials))
        .then(async (response) => {
          commit('setUser', response);
          commit('setLoader', false);
          await router.push('/');
        })
        .catch((err) => {
          toast.open({
            message: err.email?.includes('has already been taken')
              ? i18n.t('Email has been taken')
              : i18n.t('Something went wrong, please make sure all the required fields are present'),
            type: 'is-danger',
            pauseOnHover: true
          });
          commit('setLoader', false);
        })
    }
  }
}

export default user
