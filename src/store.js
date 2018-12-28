import Vue from "vue";
import Vuex from "vuex";
import { getImg } from "./ajax/api";
import { getStorage } from "./lib/localstorage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bgImg: "",
    token: getStorage("token") || "",
    user_id: getStorage("user_id") || "",
    userInfo: getStorage("userInfo") || {}
  },
  mutations: {
    setBgImg(state, img) {
      state.bgImg = img;
      console.log("img,", img);
    },
    save(state, data) {
      state.token = data.token;
      state.user_id = data._id;
      if (data.userInfo) {
        state.userInfo = { ...state.userInfo, ...data.userInfo };
      }
    }
  },
  getters: {
    bgImg: state => state.bgImg,
    token: state => state.token,
    user_id: state => state.user_id,
    userInfo: state => state.userInfo
  },
  actions: {
    getBgImg({ state, commit }) {
      console.log("state", state);
      getImg().then(res => {
        const { data } = res;
        commit("setBgImg", data.url);
      });
    },
    save({ commit }, data) {
      console.log(data);
      commit("save", data);
    }
  }
});
