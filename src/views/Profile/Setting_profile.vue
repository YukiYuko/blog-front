<template>
  <div class="setting_profile">
    <h1>个人资料</h1>
    <ul>
      <li class="headImage" flex="" items="center">
        <div class="left">头像</div>
        <div class="center" box="1" flex="">
          <img :src="userInfo.headImage" :alt="userInfo.userName" />
          <div class="upload">
            <p>支持 jpg、png 格式大小 5M 以内的图片</p>
            <p><EffectBtn text="点击上传" type="normal"></EffectBtn></p>
          </div>
        </div>
      </li>
      <setting_profile_item
        v-model="userName"
        @input="v => (userName = v)"
        placeholder="请填写你的用户名"
        label="用户名"
      ></setting_profile_item>
      <setting_profile_item
        v-model="job"
        @input="v => (job = v)"
        placeholder="请填写你的职位"
        label="职位"
      ></setting_profile_item>
      <setting_profile_item
        v-model="company"
        @input="v => (company = v)"
        placeholder="请填写你的公司"
        label="公司"
      ></setting_profile_item>
      <setting_profile_item
        v-model="introduce"
        @input="v => (introduce = v)"
        placeholder="请填写你的个人介绍"
        label="个人介绍"
      ></setting_profile_item>
      <setting_profile_item
        v-model="homePage"
        @input="v => (homePage = v)"
        placeholder="请填写你的个人主页"
        label="个人主页"
      ></setting_profile_item>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import setting_profile_item from "./Setting_profile_item";
import EffectBtn from "../../components/public/EffectBtn/EffectBtn";
export default {
  name: "Setting_profile",
  data() {
    return {
      userName: "",
      job: "",
      company: "",
      introduce: "",
      homePage: ""
    };
  },
  computed: {
    ...mapGetters(["user_id", "nav", "userInfo"])
  },
  components: {
    setting_profile_item,
    EffectBtn
  },
  mounted() {
  },
  methods: {
    ...mapActions(["save", "getNav", "_getUser"])
  }
};
</script>

<style lang="less">
@import "../../assets/styles/mixins";
@import "../../assets/styles/var";
.setting_profile {
  h1 {
    font-size: 18px;
    padding: 20px 0;
  }
  .headImage {
    padding: 10px 0;
    border-top: 1px solid @border_color;
    .left {
      width: 120px;
    }
    .center {
      img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }
      .upload {
        p {
          color: @sub_color;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
