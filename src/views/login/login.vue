<template>
  <v-content id="login-content">
    <div id="login"></div>
    <div
      style="display:flex;justify-content:center;align-items:center;height:100%;width:100%"
    >
      <login-form></login-form>
    </div>
  </v-content>
</template>

<script>
export default {
  components: {
    LoginForm: () => import("../dashboard/components/core/LoginForm")
  },
  data() {
    return {};
  },
  mounted() {
    if (
      localStorage.getItem("Authorization") !== null &&
      localStorage.getItem("Authorization") !== ""
    ) {
      this.$router.push(this.global.homeUrl)
    }
  },
  methods: {}
};
</script>
<style scoped>
#login {
  background: url("../../assets/login.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
</style>
