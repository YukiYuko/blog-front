<template>
  <div class="arrow">
    <p><a></a></p>
  </div>
</template>

<script>
export default {
  name: "Down"
};
</script>

<style lang="less" scoped>
/*arrow*/
.arrow {
  display: block;
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  animation: fuwafuwa 1.6s ease-in-out infinite;
  z-index: 5;
  cursor: pointer;
  p {
    display: block;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    -webkit-animation: uneune 4s linear infinite;
    animation: uneune 4s linear infinite;
    a {
      position: relative;
      display: block;
      width: 40px;
      height: 40px;
      background: url("../../../assets/down.svg") no-repeat center;
      background-size: 31px 22px;
      -webkit-animation: fuwafuwa2 1.6s ease infinite 0.4s;
      animation: fuwafuwa2 1.6s ease infinite 0.4s;
    }
  }
}

@keyframes fuwafuwa {
  0% {
    transform: translate(-50%, 0px);
  }
  50% {
    transform: translate(-50%, 10px);
  }
  100% {
    transform: translate(-50%, 0px);
  }
}
@keyframes fuwafuwa2 {
  0% {
    -webkit-transform: translate(0%, -5px);
    transform: translate(0%, -5px);
  }
  50% {
    -webkit-transform: translate(0%, 5px);
    transform: translate(0%, 5px);
  }
  100% {
    -webkit-transform: translate(0%, -5px);
    transform: translate(0%, -5px);
  }
}
@keyframes uneune {
  0% {
    border-radius: ~"60% 50% 70% 80% / 50% 60% 50% 70%";
  }
  12.5% {
    border-radius: ~"40% 70% 80% 50% / 80% 40% 60% 50%";
  }
  25% {
    border-radius: ~"70% 60% 60% 90% / 70% 80% 40% 90%";
  }
  37.5% {
    border-radius: ~"50% 50% 80% 40% / 50% 40% 60% 50%";
  }
  50% {
    border-radius: ~"60% 40% 70% 60% / 40% 60% 50% 60%";
  }
  62.5% {
    border-radius: ~"40% 50% 50% 40% / 50% 70% 60% 50%";
  }
  75% {
    border-radius: ~"90% 60% 40% 70% / 70% 50% 80% 40%";
  }
  87.5% {
    border-radius: ~"50% 70% 50% 40% / 80% 40% 60% 50%";
  }
  100% {
    border-radius: ~"60% 50% 70% 80% / 50% 60% 50% 70%";
  }
}
</style>
