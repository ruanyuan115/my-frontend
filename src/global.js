import router from './router'
const homeUrl = "/home/data"
function clearStorage() {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userID");
    localStorage.removeItem("nickname");
    localStorage.removeItem("role");
    router.push("/login");
  };
 export default {
    // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
    install: function (Vue) {
      Vue.prototype.clearStorage = () => clearStorage()
    },
    clearStorage:clearStorage,
    homeUrl
  }