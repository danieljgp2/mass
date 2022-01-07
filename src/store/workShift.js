import {doRequest} from "../api/base";
import { createWorkShift, deleteWorkShift } from "../api/workShift";
import {ToastProgrammatic as toast} from "buefy";
import i18n from "../i18n";

const INITIAL_STATE = {
  list: []
};

const workShift = {
  state: () => ({
    list: []
  }),
  mutations: {
    setWorkShifts: (state, payload) => {
      state.list = payload;
    },
    addWorkShift: (state, payload) => {
      state.list = [...state.list, payload]
    },
    removeWorkShift: (state, payload) => {
      state.list = state
        .list
        .filter((workShift) => workShift.id !== payload.id);
    },
    resetWorkShift: (state) => {
      const { list } = INITIAL_STATE;
      state.list = list;
    }
  },
  getters: {
    workShifts: (state) => state.list
  },
  actions: {
    createWorkShift ({ commit, rootState }, { startDate, endDate }) {
      commit('setLoader', true);
      doRequest(
        createWorkShift(
          rootState.service.data.id,
          { start: startDate, end: endDate }
        ))
        .then((response) => {
          commit('addWorkShift', response);
          toast.open({
            message: i18n.t('Work shift taken'),
            type: 'is-success',
            pauseOnHover: true
          });
          commit('setLoader', false);
        })
        .catch((err) => {
          toast.open({
            message: err.date?.includes('can not be assigned')
              ? i18n.t('Work shift spaces too close')
              : i18n.t('Something went wrong, please make sure all the required fields are present'),
            type: 'is-danger',
            pauseOnHover: true
          });
          commit('setLoader', false);
        })
    },
    destroyWorkShift ({ commit }, workShift ) {
      commit('setLoader', true);
      doRequest(
        deleteWorkShift(workShift.id))
        .then((response) => {
          commit('removeWorkShift', response);
          toast.open({
            message: i18n.t('Work shift released'),
            type: 'is-success',
            pauseOnHover: true
          });
          commit('setLoader', false);
        })
        .catch(() => {
          toast.open({
            message: i18n.t('Something went wrong, please make sure all the required fields are present'),
            type: 'is-danger',
            pauseOnHover: true
          });
          commit('setLoader', false);
        })
    }
  }
}

export default workShift
