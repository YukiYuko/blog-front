<template>
  <div class="center">
    <HeadBar></HeadBar>
    <div class="center_box">
      <div class="container">
        <div class="center_box_head" flex="" justify="between" items="center">
          <div class="center_box_head_left">
            <img :src="userInfo.headImage" :alt="userInfo.userName" />
          </div>
          <div class="center_box_head_center" box="1">
            <h3>{{ userInfo.userName }}</h3>
            <p>你的职位</p>
            <p>介绍一下自己吧</p>
          </div>
          <div class="center_box_head_right">
            <EffectBtn @click="go('setting',{type: 'profile'})" text="编辑资料"></EffectBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "../Blog/components/HeadBar";
import EffectBtn from "../../components/public/EffectBtn/EffectBtn";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Center",
  components: {
    HeadBar,
    EffectBtn
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["setUser"])
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixins";
@import "../../assets/styles/var";
.center {
  min-height: 100vh;
  background-color: @background_color;
  &_box {
    padding: 20px 0;
    &_head {
      padding: 20px;
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
      &_left {
        margin-right: 30px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      &_center {
        h3 {
          font-size: 20px;
          margin-bottom: 15px;
          color: @title_color;
          font-weight: bold;
        }
        p {
          font-size: 14px;
          margin-bottom: 10px;
          color: @info_color;
        }
      }
      &_right {
        height: 100%;
      }
    }
  }
}
</style>
