import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Index from "./views/Index/Index2.vue";
import Detail from "./views/Index/detail.vue";
import Blog from "./views/Blog/Blog.vue";
import Profile from "./views/Profile/Profile.vue";
import Login from "./views/Blog/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/index",
      name: "index",
      component: Index
    },
    {
      path: "/blog/:id",
      name: "blog",
      component: Detail
    },
    {
      path: "/blog",
      name: "blogIndex",
      component: Blog
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Blog/Search.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
