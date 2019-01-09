<template>
  <div class="header">
    <div class="container" flex justify="between">
      <div class="header_left" @click="go('blogIndex');"></div>
      <div class="header_center">
        <ul flex>
          <li @click="go('blogIndex');">
            <a>首页</a>
            <div
              :style="{
                'background-color': colors[0]
              }"
              class="skew"
            ></div>
          </li>
          <li
            v-for="(item, index) in nav"
            :key="index"
            @click="go('category', { type: item.key });"
          >
            <a>{{ item.name }}</a>
            <div
              :style="{
                'background-color': colors[index + 1]
              }"
              class="skew"
            ></div>
          </li>
          <li>
            <a>关于&留言</a>
            <div
              :style="{
                'background-color': colors[5]
              }"
              class="skew"
            ></div>
          </li>
        </ul>
      </div>
      <div class="header_right">
        <div class="no_login" v-if="!userInfo.userName">
          <i class="iconfont icon-yonghu"></i>
          <div class="to_login" @click="go('login');"><a>登陆</a></div>
        </div>
        <div class="is_login" v-if="userInfo.userName">
          <img
            class="touxiang"
            :src="userInfo.headImage"
            :alt="userInfo.userName"
          />
          <div class="to_center">
            <h3>{{ userInfo.userName }}</h3>
            <ul>
              <li @click="go('center', { id: userInfo._id });">个人中心</li>
            </ul>
            <div class="login_out">退出</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeadBar",
  data() {
    return {
      colors: [
        "#FFCCCC",
        "#FF99CC",
        "#CCCCFF",
        "#6699CC",
        "#99CCFF",
        "#003366"
      ],
      color_new: [],
      list: []
    };
  },
  computed: {
    ...mapGetters(["user_id", "nav", "userInfo"])
  },
  mounted() {
    this.getNav();
    this._getUser();
  },
  methods: {
    ...mapActions(["save", "getNav", "_getUser"]),
    // 乱序
    shuffle(a) {
      let len = a.length;
      for (let i = 0; i < len - 1; i++) {
        let index = parseInt(Math.random() * (len - i));
        let temp = a[index];
        a[index] = a[len - i - 1];
        a[len - i - 1] = temp;
      }
      return [...a];
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../assets/styles/mixins";
@import "../../../assets/styles/var";
.header {
  .drop-shadow-bottom;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  .container {
    height: 74px;
  }
  .header_left {
    position: relative;
    width: 140px;
    height: 60px;
    text-indent: -999em;
    background-image: url("../../../assets/images/blog/style-index.d437fb5e.png");
    background-position: -4px -4px;
    background-repeat: no-repeat;
  }
  .header_center {
    ul {
      height: 100%;
      li {
        width: 90px;
        height: 100%;
        position: relative;
        overflow: hidden;
        a {
          display: block;
          height: 100%;
          text-align: center;
          line-height: 74px;
          position: relative;
          color: @title_color;
          font-size: 14px;
          overflow: hidden;
          z-index: 1;
        }
        &:hover {
          .skew {
            top: 0;
          }
        }
        .skew {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 70px;
          transition: all 0.2s ease-in-out;
        }
      }
    }
  }
  .header_right {
    .no_login {
      width: 60px;
      text-align: center;
      height: 74px;
      line-height: 74px;
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: rgba(27, 35, 53, 0.88);
        color: #ffffff;
      }
      &:hover .to_login {
        display: block;
      }
      i {
        font-size: 36px;
      }
      .to_login {
        position: absolute;
        width: 100px;
        top: 100%;
        left: 0;
        line-height: 1;
        background-color: rgba(27, 35, 53, 0.88);
        display: none;
        a {
          height: 45px;
          line-height: 45px;
          color: #ffffff;
        }
      }
    }
    .is_login {
      position: relative;
      line-height: 74px;
      &:hover {
        .touxiang {
          transform: translateY(30px) scale(1.2);
        }
        .to_center {
          transform: translateY(0);
          visibility: visible;
          opacity: 1;
        }
      }
      .touxiang {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }
      .to_center {
        position: absolute;
        left: 50%;
        margin-left: -130px;
        width: 260px;
        padding: 50px 0 0;
        top: 100%;
        min-height: 200px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
        border-radius: 0 0 4px 4px;
        line-height: normal;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        transform: translateY(-20px);
        visibility: hidden;
        opacity: 0;
        h3 {
          text-align: center;
          color: @active_color;
          font-size: 18px;
        }
        ul {
          li {
            display: block;
            padding: 0 20px;
            line-height: 40px;
            color: @title_color;
            border-bottom: 1px solid @border_color;
            transition: all 0.3s;
            &:hover {
              text-indent: 10px;
              color: @active_color;
            }
          }
        }
        .login_out {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          line-height: 40px;
          text-align: right;
          padding: 0 20px;
          background-color: @background_color;
        }
      }
    }
  }
}
</style>
