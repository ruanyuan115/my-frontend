<template>
  <div>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </div>
</template>

<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"),
    DashboardCoreSettings: () => import("./components/core/Settings"),
    DashboardCoreView: () => import("./components/core/View")
  },

  data: () => ({
    expandOnHover: false
  }),

  mounted() {
    this.$axios
      .get("/getUserInfo", {
        params: {
          userID: localStorage.getItem("userID")
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
