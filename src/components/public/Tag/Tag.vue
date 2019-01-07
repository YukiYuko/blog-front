<template>
  <div class="tag" :style="{ backgroundColor: bgColor }">
    <i :style="{ backgroundColor: bgColor }"></i> <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    text: {
      type: String,
      default: "标签"
    },
    bgColor: String
  }
};
</script>

<style lang="less">
.tag {
  font-size: 12px;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  color: #fff;
  height: 18px;
  line-height: 18px;
  float: left;
  padding: 0 5px 0 10px;
  position: relative;
  border-radius: 0 5px 5px 0;
  margin: 5px 9px 5px 8px;
  background-color: rgb(94, 123, 167);
  i {
    position: absolute;
    right: 100%;
    font-size: 0;
    line-height: 0;
    border: 9px solid transparent;
    background-color: rgb(94, 123, 167);
  }
}
</style>
