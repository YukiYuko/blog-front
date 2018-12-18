<template>
  <div class="index">
    <section-one></section-one>
    <section-two></section-two>
    <BackTop></BackTop>
  </div>
</template>

<script>
import SectionOne from "./Section-one";
import SectionTwo from "./Section-two";
import BackTop from "../../components/public/BackTop/BackTop";
export default {
  name: "index",
  data() {
    return {
      show: true
    };
  },
  components: {
    SectionOne,
    SectionTwo,
    BackTop
  },
  methods: {
    openDetail() {
      this.show = false
    }
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
