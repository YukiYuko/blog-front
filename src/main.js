import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/iview.js'

Vue.config.productionTip = false;
const myMixin = {
  methods: {
    go(path, params, query) {
      router.push({
        path,
        params,
        query
      });
    }
  }
};
Vue.mixin(myMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
