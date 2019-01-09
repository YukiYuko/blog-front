<template>
  <div class="setting">
    <HeadBar></HeadBar>
    <div class="setting_menu">
      <div class="container">
        <a
          v-for="tab in tabs"
          :key="tab.key"
          :class="{ active: currentTab === tab.key }"
          @click="currentTab = tab.key;"
          >{{ tab.name }}</a
        >
      </div>
    </div>
    <div class="container">
      <div class="setting_view">
        <component :is="currentTabComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "../Blog/components/HeadBar";
import Setting_profile from "./Setting_profile";
import Setting_password from "./Setting_password";
export default {
  name: "Setting",
  data() {
    return {
      tabs: [
        { key: "profile", name: "个人资料" },
        { key: "password", name: "修改密码" }
      ],
      currentTab: "profile"
    };
  },
  components: {
    HeadBar,
    Setting_profile,
    Setting_password
  },
  computed: {
    currentTabComponent: function() {
      return "Setting_" + this.currentTab.toLowerCase();
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/mixins";
@import "../../assets/styles/var";
.setting {
  min-height: 100vh;
  background-color: @background_color;
  &_menu {
    height: 50px;
    line-height: 50px;
    background-color: #ffffff;
    border-top: 1px solid @border_color;
    margin-bottom: 20px;
    .drop-shadow-bottom;
    a {
      margin-right: 20px;
      font-size: 14px;
      color: @title_color;
      &.active {
        color: @active_color;
      }
    }
  }
  &_view {
    background-color: #ffffff;
    padding: 30px 40px;
    min-height: 400px;
    max-width: 700px;
  }
}
</style>
