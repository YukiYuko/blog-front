<template>
  <div class="profile" flex dir="column">
    <div class="profile_bg" :style="{ backgroundImage: `url(${bgImg})` }"></div>
    <div class="profile_cont" box="1" flex="">
      <div class="left" box="4">
        <img class="touxiang" src="../../assets/images/touxiang.png" alt="" />
        <div class="left_box">
          <h3>凤凰院凶真</h3>
          <p>前端工程师</p>
          <p>690517217@qq.com</p>
          <div class="profile_mess">
            <p>一个前端页面仔，努力向着全栈发展。</p>
            <p>一个死宅。FF14er/蕾姆本命/偶尔女装/最喜欢的动漫是命运石之门。</p>
          </div>
        </div>
      </div>
      <div class="right" box="7"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Profile",
  data() {
    return {};
  },
  mounted() {
    this.getBgImg();
  },
  computed: {
    ...mapGetters(["bgImg"])
  },
  methods: {
    ...mapActions(["getBgImg"])
  }
};
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  .profile_bg {
    height: 40vh;
    background-size: cover;
    background-position: center;
  }
  .profile_cont {
    .left {
      position: relative;
      .touxiang {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        top: -40px;
        left: 50%;
        margin-left: -40px;
        border: 1px solid #f5f5f5;
        background-color: #f5f5f5;
      }
      .left_box{
        padding: 60px 50px 0;
        text-align: center;
        h3{
          font-size: 20px;
          color: #444;
          margin-bottom: 10px;
        }
        > p{
          font-size: 14px;
          color: #999;
          margin-bottom: 10px;
        }
        .profile_mess{
          margin-top: 30px;
          p{
            margin-bottom: 10px;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
