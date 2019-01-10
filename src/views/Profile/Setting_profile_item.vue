<template>
  <li class="setting_profile_item" justify="between" items="center" flex="">
    <div class="left">{{ label }}</div>
    <div class="center" box="1">
      <input
        :type="inputType"
        :value="value"
        @input="$emit('input', $event.target.value);"
        :placeholder="placeholder"
        :autofocus="isEdit"
        @blur="blur"
        @keyup.enter="save"
        @focus="isEdit = true;"
      />
    </div>
    <div v-if="right" class="right">
      <span v-if="!isEdit" @click="isEdit = true;">修改</span>
      <div class="isEdit" v-if="isEdit">
        <span @click="save">保存</span> <span @click="cancel">取消</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "Setting_profile_item",
  props: {
    value: String,
    placeholder: String,
    label: String,
    right: {
      type: Boolean,
      default: true
    },
    inputType: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      isEdit: false
    };
  },
  methods: {
    cancel() {
      this.isEdit = false;
      this.$emit("cancel");
    },
    save() {
      this.isEdit = false;
      this.$emit("save");
    },
    blur() {
      this.$emit("blur");
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/mixins";
@import "../../assets/styles/var";
.setting_profile_item {
  padding: 20px 0;
  border-top: 1px solid @border_color;
  font-size: 14px;
  &:nth-last-of-type(1) {
    border-bottom: 1px solid @border_color;
  }
  .left {
    width: 120px;
  }
  .center {
    input {
      border: none;
      width: 100%;
    }
  }
  .right {
    color: @active_color;
    cursor: pointer;
    .isEdit {
      color: @sub_color;
      span:nth-child(1) {
        color: @active_color;
        margin-right: 10px;
      }
    }
  }
}
</style>
