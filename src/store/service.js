import { ToastProgrammatic as toast } from "buefy";

import { doRequest } from "../api/base";
import { services, workShiftsCount } from "../api/service";
import i18n from '../i18n';
import week from './week';
import workShifts from "./workShift";
import { formatCalendar, formatWeeks, formatResume } from "../utils/service";

const service = {
  state: () => ({
    list: [],
    data: {
      settings: {
        days: []
      }
    }
  }),
  modules: {
    week,
    workShifts
  },
  mutations: {
    setServices: (state, payload) => {
      state.list = payload;
    },
    setService: (state, payload) => {
      state.data = payload;
    }
  },
  getters: {
    services: (state) => state.list,
    service: (state) => state.data,
    calendar: (state) => formatCalendar(state.data, state.workShifts.list, state.week.data),
    resume: (state) => formatResume(state.workShifts.list)
  },
  actions: {
    getServices ({ commit }) {
      commit('setLoader', true);
      doRequest(services())
        .then(async (response) => {
          commit('setServices', response);
          commit('setLoader', false);
        })
        .catch(() => {
          commit('setLoader', false);
          toast.open({
            message: i18n.t('Something went wrong, please contact with the support team'),
            type: 'is-danger',
            pauseOnHover: true
          });
        });
    },
    setService ({ commit }, service) {
      commit('setLoader', true);
      commit('resetWeek');
      doRequest(workShiftsCount(service.id))
        .then(async (response) => {
          commit('setService', service);
          commit('setWeeks', formatWeeks(response));
          commit('setLoader', false);
        })
        .catch(() => {
          commit('setLoader', false);
          toast.open({
            message: i18n.t('Something went wrong, please contact with the support team'),
            type: 'is-danger',
            pauseOnHover: true
          });
        });
    }
  }
}

export default service
