<template>
  <div class="index">
    <section-one></section-one>
    <section-two></section-two>
  </div>
</template>

<script>
import SectionOne from "./Section-one";
import SectionTwo from "./Section-two";
export default {
  name: "index",
  components: {
    SectionOne,
    SectionTwo
  }
};
</script>

<style scoped lang="less">
.index {
  position: relative;
  overflow: hidden;
  &:after {
    content: "";
    width: 1px;
    height: 200%;
    position: absolute;
    left: 50%;
    top: -50%;
    background-color: #eaeaea;
    z-index: -1;
  }
}
</style>
