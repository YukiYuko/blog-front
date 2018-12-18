import Vue from "vue";
import Vuex from "vuex";
import { getImg } from "./ajax/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bgImg: ""
  },
  mutations: {
    setBgImg(state, img) {
      state.bgImg = img;
      console.log("img,", img)
    }
  },
  getters: {
    bgImg: state => state.bgImg
  },
  actions: {
    getBgImg({ state, commit }) {
      console.log("state", state);
      getImg().then(res => {
        const { data } = res;
        commit("setBgImg", data.url);
      });
    }
  }
});
