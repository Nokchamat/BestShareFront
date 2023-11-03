import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    isUserLoggedIn: false,
    accessToken: null,
    isVerifyEmail: false,
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.isUserLoggedIn = payload.isLoggedIn;
      state.accessToken = payload.accessToken;
    },
    checkEmailVerify(state, payload) {
      state.isVerifyEmail = payload.isVerifyEmail
    }
  },
  actions: {
    login({ commit }, { accessToken }) {
      commit('setLoginStatus', { isLoggedIn: true, accessToken });
      localStorage.setItem('isLogin', 'true')
    },
    logout({ commit }) {
      commit('setLoginStatus', { isLoggedIn: false, accessToken: null });
    },
    checkEmailVerify({ commit }, { isVerifyEmail }) {
      commit('checkEmailVerify', { isVerifyEmail: isVerifyEmail })
    }
  },
  plugins : [ createPersistedState({
    paths: ["isUserLoggedIn", "accessToken", "isVerifyEmail"]
  }) ],

});

export default store;
