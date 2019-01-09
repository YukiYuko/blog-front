<template>
  <li class="setting_profile_item" justify="between" items="center" flex="">
    <div class="left">{{ label }}</div>
    <div class="center" box="1">
      <input
        type="text"
        :value="value"
        @input="$emit('input', $event.target.value);"
        :placeholder="placeholder"
      />
    </div>
    <div class="right">修改</div>
  </li>
</template>

<script>
export default {
  name: "Setting_profile_item",
  props: {
    value: String,
    placeholder: String,
    label: String
  },
  data() {
    return {};
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
  }
}
</style>
