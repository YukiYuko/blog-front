<template>
  <div class="profile" flex dir="column">
    <div class="profile_bg" :style="{ backgroundImage: `url(${bgImg})` }"></div>
    <div class="profile_cont" flex="">
      <div class="profile_cont_left" box="4">
        <img class="touxiang" src="../../assets/images/touxiang.png" alt="" />
        <div class="left_box">
          <h3>凤凰院凶真</h3>
          <p>前端工程师</p>
          <p>690517217@qq.com</p>
          <div class="profile_mess">
            <p>一个前端页面仔，努力向着全栈发展。</p>
            <p>一个死宅。FF14er/蕾姆本命/偶尔女装/最喜欢的动漫是命运石之门。</p>
          </div>
          <div class="profile_contact">
            <Tooltip placement="top" content="github">
              <a class="icon"><i class="iconfont icon-github-circle"></i></a>
            </Tooltip>
            <Tooltip placement="top" content="QQ">
              <a class="icon"><i class="iconfont icon-qq-copy"></i></a>
            </Tooltip>
            <Tooltip placement="top" content="微博">
              <a class="icon"><i class="iconfont icon-logo-weibo"></i></a>
            </Tooltip>
          </div>
        </div>
      </div>
      <div class="profile_cont_right" box="7">
        <Tabs value="animation">
          <TabPane label="动漫推荐" name="animation">
            <div class="animation_tab">
              <Row :gutter="16">
                <Cols span="8" v-for="i in 6" :key="i">
                  <div class="animation_tab_item">
                    <img
                      class="banner"
                      src="../../assets/images/img/10380_YwP4R.jpg"
                      alt=""
                    />
                    <div class="animation_tab_item_cont">
                      <div class="title">命运石之门</div>
                      <div class="intro">
                        故事发生在「CHAOS;HEAD」的“涩谷崩坏”事件一年半之后的世界，而舞台则从涩谷转移到了秋叶原。主角冈部伦太郎是一位深度中二病的大学生，时常幻想自己身肩重任，并自称“狂气的疯狂科学家・凤凰院凶真”，不过说到底其作为不过就是在名为“未来道具研究所”中与两个伙伴开发着奇奇怪怪又不切实际的东西。然而，这样的他们却在偶然间发明出可以把电子讯息传送过去的时间机器。在他们对未来及过去知道得越多的同时，却不知道危难正渐渐临到自己身上……
                      </div>
                      <div class="rate" flex="">
                        <div
                          class="rate_img"
                          style="background-position: -153px 0;"
                        ></div>
                        <div class="rate_text">
                          <h3><span>8.6</span> 神作</h3>
                          <p>Bangumi Anime Ranked: <span>#25</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Cols>
              </Row>
            </div>
          </TabPane>
          <TabPane label="漫画推荐" name="comic">漫画推荐</TabPane>
          <TabPane label="日剧推荐" name="drama">日剧推荐</TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TabHead from "../../components/common/TabHead.vue";
export default {
  name: "Profile",
  data() {
    return {};
  },
  components: {
    TabHead
  },
  mounted() {
    this.getBgImg();
    this._bangumi_get_user();
  },
  computed: {
    ...mapGetters(["bgImg"])
  },
  methods: {
    ...mapActions(["getBgImg"]),
    // 选择想看，已看，抛弃
    select(id) {
      console.log(id);
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/var";
@import "../../assets/styles/mixins";
.profile {
  .profile_bg {
    height: 40vh;
    background-size: cover;
    background-position: center;
  }
  .profile_cont {
    .profile_cont_left {
      position: relative;
      .touxiang {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        top: -40px;
        left: 50%;
        margin-left: -40px;
        border: 1px solid @border_color;
        background-color: @border_color;
      }
      .left_box {
        padding: 60px 50px 0;
        text-align: center;
        h3 {
          font-size: 20px;
          color: @title_color;
          margin-bottom: 10px;
        }
        > p {
          font-size: 14px;
          color: @sub_color;
          margin-bottom: 10px;
        }
        .profile_mess {
          margin-top: 30px;
          p {
            margin-bottom: 10px;
            color: @info_color;
          }
        }
        .profile_contact {
          padding: 30px 0;
          border-top: 1px solid @border_color;
          a {
            padding: 0 10px;
            color: @info_color;
            i {
              font-size: 26px;
            }
          }
        }
      }
    }
    .profile_cont_right {
      padding: 25px;
      .ivu-tabs-bar {
        border: none;
        margin-bottom: 5px;
      }
      .ivu-tabs-ink-bar {
        display: none;
      }
      .ivu-tabs-nav .ivu-tabs-tab-active {
        color: @active_color;
      }
      .tab_head {
        text-align: center;
        a {
          display: inline-block;
          padding: 10px;
          color: #111;
          font-size: 14px;
          &.active {
            color: @active_color;
          }
        }
      }
      /*animation*/
      .animation_tab {
        .animation_tab_item {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
          margin: 5px;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          &:hover {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }
          .banner {
            width: 100%;
            height: 200px;
          }
          .animation_tab_item_cont {
            padding: 10px 15px;
            .title {
              font-size: 18px;
              color: @title_color;
              margin-bottom: 5px;
            }
            .intro {
              font-size: 12px;
              color: @info_color;
              margin-bottom: 10px;
              .line-clamp();
            }
            .rate {
              .rate_img {
                background-repeat: no-repeat;
                background-image: url("../../assets/images/img/rate_emo.gif");
                height: 37px;
                width: 30px;
                margin: 0 5px 5px 0;
              }
              .rate_text {
                h3 {
                  font-size: 12px;
                  color: @title_color;
                  margin-bottom: 5px;
                  span {
                    font-size: 16px;
                    color: @active_color;
                    font-weight: bold;
                  }
                }
                p {
                  font-size: 12px;
                  color: @sub_color;
                  span {
                    color: @title_color;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
