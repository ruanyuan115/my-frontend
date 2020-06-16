import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    drawer: null,
    // 存储token
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : "",
    userID: localStorage.getItem("userID")
      ? localStorage.getItem("userID")
      : "",
      nickname: localStorage.getItem("nickname")
      ? localStorage.getItem("nickname")
      : "",
    role: localStorage.getItem("role") ? localStorage.getItem("role") : ""
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      state.userID = user.userID;
      state.nickname = user.nickname;
      state.role = user.role;
      localStorage.setItem("Authorization", user.Authorization);
      localStorage.setItem("userID", user.userID);
      localStorage.setItem("nickname", user.nickname);
      localStorage.setItem("role", user.role);
    },
  },
  actions: {}
});
