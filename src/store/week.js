import { ToastProgrammatic as toast } from "buefy";

import { doRequest } from "../api/base";
import { workShifts } from "../api/service";
import i18n from '../i18n';

const INITIAL_STATE = {
  list: [],
  data: {}
};

const week = {
  state: () => INITIAL_STATE,
  mutations: {
    setWeek: (state, week) => {
      state.data = week;
    },
    setWeeks: (state, weeks) => {
      state.list = weeks;
    },
    resetWeek: (state) => {
      const { data } = INITIAL_STATE;
      state.data = data;
    }
  },
  getters: {
    weeks: (state) => state.list,
    week: (state) => state.data
  },
  actions: {
    setWeek ({ commit }, { week, service }) {
      commit('setLoader', true);
      commit('resetWorkShift');
      doRequest(workShifts(service.id, week.date))
        .then((response) => {
          commit('setWorkShifts', response);
          commit('setWeek', week);
          commit('setLoader', false);
        })
        .catch(() => {
          commit('setLoader', false);
          toast.open({
            message: i18n.t('Something went wrong, please contact with the support team'),
            type: 'is-danger',
            pauseOnHover: true
          });
        })
    }
  }
}

export default week;
