import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import contentmenu from "v-contextmenu";
import VueInsProgressBar from "vue-ins-progress-bar";
import InfiniteLoading from "vue-infinite-loading";
import "v-contextmenu/dist/index.css";
import "./plugins/iview.js";
import filters from "./filter";
Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k]);
});

Vue.config.productionTip = false;
const myMixin = {
  methods: {
    go(name, params, query) {
      router.push({
        name,
        params,
        query
      });
    }
  }
};
Vue.mixin(myMixin);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("./assets/images/404.jpg"),
  loading: require("./assets/images/404.jpg"),
  attempt: 1
});
Vue.use(contentmenu);
const options = {
  position: "fixed",
  show: true,
  height: "4px"
};

Vue.use(VueInsProgressBar, options);
Vue.use(InfiniteLoading, {
  props: {
    distance: 200
  },
  slots: {
    // keep default styles
    noResults: "这里还没有数据daze~",

    // remove default styles
    noMore: "没有更多了┑(￣Д ￣)┍",

    // hide slot
    error: {
      render: h => h("div")
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
