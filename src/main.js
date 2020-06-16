// =========================================================
// * Vuetify Material Dashboard - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Qs from "qs";
import "./http";
import global from "./global";

Vue.use(ElementUI);
Vue.use(global); //将全局函数当做插件来进行注册
Vue.prototype.$qs = Qs;
Vue.prototype.$axios = axios;
Vue.prototype.global = global;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("Authorization")) {
      config.headers.Authorization = localStorage.getItem("Authorization");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axios.defaults.timeout = 5000; // 请求超时
axios.defaults.baseURL = "/api/";
