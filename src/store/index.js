import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    isUserLoggedIn: false,
    accessToken: null,
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.isUserLoggedIn = payload.isLoggedIn;
      state.accessToken = payload.accessToken;
    },
  },
  actions: {
    login({ commit }, { accessToken }) {
      commit('setLoginStatus', { isLoggedIn: true, accessToken });
      localStorage.setItem('isLogin', 'true')
    },
    logout({ commit }) {
      commit('setLoginStatus', { isLoggedIn: false, accessToken: null });
    },
  },
  plugins : [ createPersistedState({
    paths: ["isUserLoggedIn", "accessToken"]
  }) ],

});

export default store;
