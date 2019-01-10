import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import { Message } from "iview";
import {
  getImg,
  getTags,
  getUser,
  updateUser,
  changePassword
} from "./ajax/api";
import {getStorage, setStorage} from "./lib/localstorage";

Vue.use(Vuex);

const USER_INFO = {
  userName: "",
  job: "",
  headImage: "",
  company: "",
  introduce: "",
  homePage: ""
};

export default new Vuex.Store({
  state: {
    bgImg: "",
    token: getStorage("token") || "",
    user_id: getStorage("user_id") || "",
    userInfo: getStorage("userInfo") || USER_INFO,
    nav: []
  },
  mutations: {
    setBgImg(state, img) {
      state.bgImg = img;
    },
    save(state, data) {
      state.token = data.token;
      state.user_id = data._id;
      if (data.userInfo) {
        state.userInfo = { ...state.userInfo, ...data.userInfo };
      }
    },
    setNav(state, data) {
      state.nav = data;
    },
    setUser(state, data) {
      state.userInfo = { ...state.userInfo, ...data };
    }
  },
  getters: {
    bgImg: state => state.bgImg,
    token: state => state.token,
    user_id: state => state.user_id,
    userInfo: state => state.userInfo,
    nav: state => state.nav
  },
  actions: {
    getBgImg({ commit }) {
      getImg().then(res => {
        const { data } = res;
        commit("setBgImg", data.url);
      });
    },
    save({ commit }, data) {
      commit("save", data);
    },
    getNav({ commit }) {
      getTags({ type: 2 }).then(res => {
        commit("setNav", res.data);
      });
    },
    _getUser({ commit, state }) {
      getUser({ _id: state.user_id }).then(res => {
        commit("setUser", res.data);
      });
    },
    _updateUser({ commit, state }, data) {
      updateUser({ _id: state.user_id, data }).then(() => {
        commit("setUser", data);
        Message.success("修改成功！");
      });
    },
    // 修改用户密码
    _changePassword({ commit, state }, data) {
      changePassword({ ...data, _id: state.user_id }).then((res) => {
        let reset = {
          token: "",
          user_id: "",
          userInfo: USER_INFO
        };
        commit("save", reset);
        setStorage("token", "");
        setStorage("user_id", "");
        setStorage("userInfo", "");
        setStorage("userName", "");
        setStorage("password", "");
        Message.success({
          onClose: () => {
            router.push("/login");
          },
          content: res.info
        });
      });
    }
  }
});
