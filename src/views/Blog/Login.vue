<template>
  <div class="login" flex="" items="center" justify="center">
    <div class="login_container" :class="{ active: isReg }" flex="">
      <div
        class="login_container_circle"
        flex=""
        items="center"
        justify="center"
        @click="switchToReg"
      >
        <i class="iconfont icon-arrow-right"></i>
      </div>
      <div
        class="login_container_left"
        flex=""
        items="center"
        justify="center"
        box="1"
      >
        <div v-show="!isReg" class="login_container_left_text">
          <h3>欢迎来到我的世界</h3>
          <p>请登录你的账户开始奇幻之旅吧~（才怪）</p>
          <div class="exp-container">
            <div class="exp">
              <input
                type="text"
                class="exp__input"
                id="login_username"
                placeholder="用户名"
                required
                v-model="userName"
              />
              <label class="exp__label" for="login_username">
                <i class="iconfont icon-yonghu"></i> 用户名
              </label>
            </div>
            <div class="exp">
              <input
                type="password"
                class="exp__input"
                id="login_password"
                placeholder="密码"
                required
                v-model="password"
              />
              <label class="exp__label" for="login_password">
                <i class="iconfont icon-mima"></i> 密码
              </label>
            </div>
          </div>
          <div class="remember" flex="" items="center" justify="between">
            <span><c-switch v-model="remember" /> 记住登陆 </span>
            <a>忘记密码？</a>
          </div>
          <div class="btn-group">
            <button @click="toReg('isLogin');" class="bubbly-button">
              登陆
            </button>
            <button class="bubbly-button border-line">注册</button>
          </div>
          <div class="tips">
            Tips：注册用户和游客一样，不会有什么特殊的功能，至少现在没有（笑~
          </div>
        </div>
        <div v-show="isReg" class="login_container_left_text">
          <h3>少侠，既然来了</h3>
          <p>注册个账号再走呗~</p>
          <div class="exp-container">
            <div class="exp">
              <input
                type="text"
                class="exp__input"
                id="reg_username"
                placeholder="用户名"
                required
                v-model="userName"
              />
              <label class="exp__label" for="reg_username">
                <i class="iconfont icon-yonghu"></i> 用户名
              </label>
            </div>
            <div class="exp">
              <input
                type="password"
                class="exp__input"
                id="reg_password"
                placeholder="密码"
                required
                v-model="password"
              />
              <label class="exp__label" for="reg_password">
                <i class="iconfont icon-mima"></i> 密码
              </label>
            </div>
            <div class="exp">
              <input
                type="text"
                class="exp__input exp_input_checkcode"
                id="reg_code"
                placeholder="密码"
                required
                v-model="code"
              />
              <label class="exp__label" for="reg_password">
                <i class="iconfont icon-mima"></i> 验证码
              </label>
              <img
                class="checkcode"
                :src="img_base64"
                alt="验证码"
                title="点击切换验证码"
                @click="get_check_code"
              />
            </div>
          </div>
          <div class="remember" flex="" items="center" justify="end">
            <a>已有账号？<button class="bubbly-button">登陆</button></a>
          </div>
          <div class="btn-group">
            <button @click="toReg" class="bubbly-button border-line block">
              注册
            </button>
          </div>
          <div class="tips">
            Tips：注册用户和游客一样，不会有什么特殊的功能，至少现在没有（笑~
          </div>
        </div>
      </div>
      <div class="login_container_right" box="1">
        <transition name="fade">
          <img v-show="!isReg" src="../../assets/images/blog/a2.png" alt="" />
        </transition>
        <transition name="fade">
          <img v-show="isReg" src="../../assets/images/blog/a1.png" alt="" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { checkStr } from "../../lib/index";
import { register, login, checkcode } from "../../ajax/api";
import { mapGetters, mapActions } from "vuex";
import { setStorage } from "../../lib/localstorage";

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      remember: false,
      isReg: false,
      img_base64: "",
      code: "",
      code_token: ""
    };
  },
  computed: {
    ...mapGetters(["token"])
  },
  created() {
    this.get_check_code();
  },
  mounted() {
    console.log(this.token);
  },
  methods: {
    ...mapActions(["save"]),
    switchToReg() {
      this.isReg = !this.isReg;
    },
    // 注册和登陆
    toReg(type) {
      let params = {
        userName: this.userName,
        password: this.password,
        code: this.code,
        code_token: this.code_token
      };
      if (type === "isLogin") {
        if (!this.userName || !this.password) {
          this.$Message.error("请输入完整的信息");
          return false;
        }
        login(params).then(res => {
          this.$Message.success(res.info);
          // 保存登陆状态
          this.save(res);
          setStorage("token", res.token);
          this.isReg = false;
        });
      } else {
        if (!checkStr(this.userName, "name")) {
          this.$Message.error("用户名4到16位（字母，数字，下划线，减号）");
          return false;
        }
        if (!checkStr(this.password, "pwd")) {
          this.$Message.error(
            "密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
          );
          return false;
        }
        register(params).then(res => {
          this.$Message.success(res.info);
          this.isReg = false;
        });
      }
    },
    // 获取验证码
    async get_check_code() {
      let res = await checkcode();
      let { data = {} } = res;
      this.img_base64 = data.img;
      this.code_token = data.token;
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/var";
@import "../../assets/styles/mixins";
.login {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  &_container {
    width: 70%;
    height: 80vh;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.05);
    position: relative;
    &.active {
      .login_container_circle {
        bottom: 80%;
        left: 100%;
        transform: rotateZ(180deg);
      }
      .login_container_left {
        transform: translateX(100%);
      }
      .login_container_right {
        transform: translateX(-100%);
      }
    }
    &_circle {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background-color: #e82862;
      position: absolute;
      left: 50%;
      margin-left: -45px;
      bottom: 30%;
      cursor: pointer;
      color: #fff;
      font-size: 20px;
      z-index: 1;
      transition: bottom 0.7s cubic-bezier(0.6, 0.13, 0.31, 1.02) 100ms,
        transform 0.3s ease-in-out 100ms,
        left 0.7s cubic-bezier(0.6, 0.13, 0.31, 1.02) 100ms;
    }
    &_left {
      transition: transform 0.7s cubic-bezier(0.6, 0.13, 0.31, 1.02);
      &_text {
        width: 100%;
        padding: 30px 100px 30px 30px;
        h3 {
          font-size: 18px;
          color: @title_color;
          margin-bottom: 15px;
        }
        p {
          font-size: 14px;
          color: @sub_color;
          margin-bottom: 60px;
        }
        /*输入框***********/
        .exp-container {
          width: 100%;
          box-sizing: border-box;
          max-width: 600px;
          .exp {
            display: flex;
            flex-direction: column-reverse;
            width: 100%;
            margin-bottom: 30px;
            position: relative;
            flex-wrap: wrap;
          }
          .exp__label {
            transition: 0.3s;
            margin-bottom: 5px;
          }

          .exp__label i {
            font-weight: normal;
            font-family: "Ionicons";
            font-size: 24px;
            position: absolute;
            left: 0;
            transform: rotateY(90deg);
            bottom: 0;
            height: 52px;
            background: transparent;
            color: #000;
            transform-origin: left;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s 0s ease, transform 0.3s 0s ease;
            width: 42px;
          }

          .exp__input {
            border: 1px solid #ddd;
            padding: 0 10px;
            width: 100%;
            height: 52px;
            transition: 0.3s;
            font-weight: normal;
            box-sizing: border-box;
            font-family: "Work Sans", sans-serif;
            outline: none;
          }
          .exp_input_checkcode {
            padding-right: 100px;
          }

          .exp__input:focus {
            padding-left: 42px;
            border-color: #bbb;
          }

          .exp__input:focus + label i {
            transform: rotateY(0deg);
          }

          .exp__input:valid {
            padding-left: 42px;
            border-color: #149b1b;
          }

          .exp__input:valid + label {
            color: #149b1b;
          }

          .exp__input:valid + label i {
            transform: rotateY(0deg);
            color: #149b1b;
            /*font-size: 34px;*/
            /*content: attr(data-icon-ok);*/
          }

          .exp-title {
            text-align: center;
            font-size: 22px;
            margin-bottom: 30px;
            font-weight: normal;
          }

          .exp-title span {
            display: inline-block;
            padding: 5px;
            font-size: 22px;
            background: #feffd4;
          }
          .checkcode {
            height: 52px;
            position: absolute;
            right: 0;
          }
        }
        /*输入框end********/
        .remember {
          color: @sub_color;
          margin-bottom: 60px;
          a {
            cursor: pointer;
            color: @info_color;
          }
        }
        .btn-group {
          margin-bottom: 30px;
        }
        .bubbly-button {
          font-family: "Helvetica", "Arial", sans-serif;
          display: inline-block;
          font-size: 14px;
          padding: 10px 40px;
          -webkit-appearance: none;
          appearance: none;
          background-color: #101010;
          color: #fff;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          position: relative;
          transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-right: 20px;
        }
        .bubbly-button:focus {
          outline: 0;
        }
        .bubbly-button:active {
          transform: scale(0.9);
          background-color: #222;
          box-shadow: 0 2px 25px rgba(0, 0, 0, 0.5);
        }
        .bubbly-button.border-line {
          background: none;
          border: 1px solid #212121;
          color: #212121;
          &:active {
            background: none;
          }
        }
        .bubbly-button.block {
          display: block;
          width: 100%;
        }
        .tips {
          color: @info_color;
        }
      }
    }
    &_right {
      transition: transform 0.7s cubic-bezier(0.6, 0.13, 0.31, 1.02);
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
.ivu-switch-checked {
  border-color: @active_color !important;
  background-color: @active_color !important;
}
</style>
