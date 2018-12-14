import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import contentmenu from "v-contextmenu";
import VueInsProgressBar from "vue-ins-progress-bar";
import "v-contextmenu/dist/index.css";
import "./plugins/iview.js";
import filters from "./filter";
Object.keys(filters).forEach(k => {
  console.log(filters)
  Vue.filter(k, filters[k])
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
