import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      meta: {
        needLogin: true
      },
      children: [
        {
          path: "/register",
          component: () => import("@/views/login/register")
        },
        {
          path: "/login",
          component: () => import("@/views/login/login")
        },
        {
          path: "/home",
          component: () => import("@/views/dashboard/Home"),
          children: [
            // Dashboard
            {
              name: "Dashboard",
              path: "data",
              component: () => import("@/views/dashboard/Dashboard"),
              meta: {
                needLogin: true
              }
            },
            // Pages
            {
              name: "User Profile",
              path: "pages/user",
              component: () => import("@/views/dashboard/pages/UserProfile"),
              meta: {
                needLogin: true
              }
            },
            {
              name: "Notifications",
              path: "components/notifications",
              component: () =>
                import("@/views/dashboard/component/Notifications"),
              meta: {
                needLogin: true
              }
            },
            {
              name: "Icons",
              path: "components/icons",
              component: () => import("@/views/dashboard/component/Icons"),
              meta: {
                needLogin: true
              }
            },
            {
              name: "Typography",
              path: "components/typography",
              component: () => import("@/views/dashboard/component/Typography"),
              meta: {
                needLogin: true
              }
            },
            // Tables
            {
              name: "Regular Tables",
              path: "tables/regular-tables",
              component: () => import("@/views/dashboard/tables/RegularTables"),
              meta: {
                needLogin: true
              }
            },
            // Maps
            {
              name: "Google Maps",
              path: "maps/google-maps",
              component: () => import("@/views/dashboard/maps/GoogleMaps"),
              meta: {
                needLogin: true
              }
            },
            // Upgrade
            {
              name: "Upgrade",
              path: "upgrade",
              component: () => import("@/views/dashboard/Upgrade"),
              meta: {
                needLogin: true
              }
            }
          ]
        }
      ]
    }
  ]
});
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin === true) {
    var token = localStorage.getItem('Authorization');
    if (token === null || token === "") {
      next("/login");
    } else {
      if (to.path === "/") next(Vue.prototype.global.homeUrl);
      else next();
    }
  } else {
    next();
  }
});

export default router;
