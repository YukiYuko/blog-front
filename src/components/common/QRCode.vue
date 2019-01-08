<template>
  <div class="qrCode">
    <div class="code"></div>
    <canvas class="canvas"></canvas>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "QRCode",
  props: {
    url: {
      type: String,
      default: () => {
        return window.location.href;
      }
    }
  },
  data() {
    return {
      msg: "hello vue",
      codes: ""
    };
  },
  methods: {
    useqrcode() {
      let canvas = document.querySelector(".canvas");
      QRCode.toCanvas(canvas, this.url, function(error) {
        if (error) console.error(error);
      });
    }
  },

  mounted() {
    this.useqrcode();
  }
};
</script>

<style lang="less" scoped>
.qrCode {
  position: absolute;
  right: 0;
  top: 100%;
}
</style>
