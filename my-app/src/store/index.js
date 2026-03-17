import { createStore } from 'vuex';
import { loginRequest, registerRequest, logoutRequest } from '@/utils/api.js';

export default createStore({
  state: {
    token: localStorage.getItem('myAppToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    AUTH_SUCCESS: (state, token) => {
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.token = '';
    },
  },
  actions: {
    AUTH_REQUEST: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        loginRequest(user)
          .then(token => {
            commit('AUTH_SUCCESS', token);
            localStorage.setItem('myAppToken', token);
            resolve();
          })
          .catch((error) => {
            commit('AUTH_ERROR');
            localStorage.removeItem('myAppToken');
            reject(error);
          });
      });
    },
    REGISTER_REQUEST: ({ commit }, userData) => {
      return new Promise((resolve, reject) => {
        registerRequest(userData)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
      });
    },
    LOGOUT_REQUEST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        logoutRequest()
            .then(() => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              resolve();
            })
            .catch((error) => {
              commit('AUTH_ERROR');
              localStorage.removeItem('myAppToken');
              reject(error);
            });
      });
    },
  },
  modules: {
  }
})