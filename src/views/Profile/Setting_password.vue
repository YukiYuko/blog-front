<template>
  <div class="setting_password">
    <h1>修改密码</h1>
    <ul>
      <setting_profile_item
        v-model="old_password"
        :right="false"
        placeholder="请输入原密码"
        label="旧密码"
        input-type="password"
      >
      </setting_profile_item>
      <setting_profile_item
        v-model="new_password"
        :right="false"
        placeholder="请输入新密码"
        label="新密码"
        input-type="password"
      >
      </setting_profile_item>
      <setting_profile_item
        v-model="sure_password"
        :right="false"
        placeholder="确认新密码"
        label="确认新密码"
        input-type="password"
      >
      </setting_profile_item>
    </ul>
    <div class="sub">
      <EffectBtn @click="sub" text="保存修改" type="normal"></EffectBtn>
    </div>
  </div>
</template>

<script>
import setting_profile_item from "./Setting_profile_item";
import EffectBtn from "../../components/public/EffectBtn/EffectBtn";
import { checkStr } from "../../lib/index";
import { mapActions } from "vuex";
export default {
  name: "Setting_password",
  components: {
    setting_profile_item,
    EffectBtn
  },
  data() {
    return {
      old_password: "",
      new_password: "",
      sure_password: ""
    };
  },
  methods: {
    ...mapActions(["_changePassword"]),
    sub() {
      if (
        !checkStr(this.old_password, "pwd") ||
        !checkStr(this.new_password, "pwd") ||
        !checkStr(this.sure_password, "pwd")
      ) {
        this.$Notice.error({
          desc: "密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线！"
        });
        return false;
      }
      if (this.new_password !== this.sure_password) {
        this.$Notice.error({
          desc: "两次新密码输入不一致！"
        });
        return false;
      }
      let data = {
        old_password: this.old_password,
        new_password: this.new_password,
        sure_password: this.sure_password
      };
      this._changePassword(data);
    }
  }
};
</script>

<style lang="less">
.setting_password {
  h1 {
    font-size: 18px;
    padding: 20px 0;
  }
  .sub {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
