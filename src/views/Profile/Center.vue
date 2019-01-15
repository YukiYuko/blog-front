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
            <p>{{ userInfo.job }}</p>
            <p>{{ userInfo.introduce }}</p>
          </div>
          <div class="center_box_head_right">
            <EffectBtn
              @click="go('setting', { type: 'profile' });"
              text="编辑资料"
            ></EffectBtn>
          </div>
        </div>
        <div class="center_box_content">
          <div class="center_box_content_menu">
            <a class="active"
              >喜欢 <span>{{ list.length }}</span></a
            >
          </div>
          <div class="center_box_content_list">
            <Item1
              :data="item.artList"
              v-for="(item, index) in list"
              :key="index"
            ></Item1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from "../Blog/components/HeadBar";
import EffectBtn from "../../components/public/EffectBtn/EffectBtn";
import Item1 from "../Blog/components/Item1";
import { mapGetters, mapActions } from "vuex";
import { likeNewsList } from "../../ajax/api";
export default {
  name: "Center",
  data() {
    return {
      list: []
    };
  },
  components: {
    HeadBar,
    EffectBtn,
    Item1
  },
  computed: {
    ...mapGetters(["userInfo", "user_id"])
  },
  mounted() {
    this._likeNewsList();
  },
  methods: {
    ...mapActions(["setUser"]),
    _likeNewsList() {
      likeNewsList({ uid: this.user_id }).then(res => {
        this.list = res.data;
      });
    }
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
      margin-bottom: 20px;
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
    &_content {
      &_menu {
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid @border_color;
        background-color: #ffffff;
        margin-bottom: 20px;
        a {
          padding: 0 20px;
          color: @title_color;
          font-size: 14px;
          transition: all 0.1s;
          position: relative;
          height: 100%;
          span {
            position: absolute;
            top: 0;
            right: 10px;
            font-size: 12px;
            line-height: 1;
            color: @sub_color;
          }
          &.active {
            color: @active_color;
            font-size: 18px;
            span{
              color: @active_color;
            }
          }
        }
      }
    }
  }
}
</style>
