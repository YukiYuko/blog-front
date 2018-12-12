<template>
  <div class="home" flex justify="center" items="center">
    <FrameBtn @click="go('index')">
      <h3 slot="aa" slot-scope="props">{{props.text}}</h3>
    </FrameBtn>
  </div>
</template>

<script>
// @ is an alias to /src
import FrameBtn from "../components/public/FrameBtn/FrameBtn";
export default {
  name: "home",
  components: {
    FrameBtn
  },
  mounted() {}
};
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100vh;
  background: #111;
}
</style>
