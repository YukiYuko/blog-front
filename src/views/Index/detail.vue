<template>
  <div class="detail">
    <div class="detail_box">
      <div class="detail_head" flex>
        <div class="scrollbar" :style="{ width: width }"></div>
        <div class="left" @click="go('index');">
          <i class="iconfont icon-shouye"></i>
        </div>
        <div class="center" box="1">
          <transition name="fade">
            <span v-show="scrollVal > 100">{{ detail.title }}</span>
          </transition>
        </div>
        <div
          id="code"
          class="right"
          @mouseover="show_code = true;"
          @mouseout="show_code = false;"
        >
          <i class="iconfont icon-QR"></i> <v-code v-show="show_code"></v-code>
        </div>
      </div>
      <div class="detail_cont">
        <div class="min_container">
          <div class="detail_cont_title">{{ detail.title }}</div>
          <div class="detail_cont_time">
            {{ detail.createdAt | getDate("year") }}
          </div>
          <div class="detail_cont_tags">
            <a v-for="(item, index) in detail.tags" :key="index">{{ item }}</a>
          </div>
          <div class="detail_cont_banner">
            <img :src="detail.image" :alt="detail.title" />
          </div>
          <div class="detail_cont_cont" v-html="detail.content"></div>

          <div class="detail_discuss">
            <div class="detail_discuss_btn">
              <FrameBtn @click="open_discuss" text="发表评论"></FrameBtn>
            </div>
            <div class="detail_discuss_input">
              <div class="detail_discuss_input_num">{{ total }}条评论</div>
            </div>
          </div>
          <!-- comments -->
          <div class="detail_comments">
            <div class="detail_comments_list">
              <div
                class="detail_comments_list_item"
                flex=""
                v-for="(item, index) in comments"
                :key="index"
              >
                <div class="detail_comments_list_item_image">
                  <img :src="item.headImage" alt="" />
                </div>
                <div class="detail_comments_list_item_text" box="1">
                  <div
                    class="detail_comments_list_item_text_title"
                    flex
                    justify="between"
                  >
                    <h3>{{ item.name }}</h3>
                    <span>{{ item.floor }} L</span>
                  </div>
                  <div class="detail_comments_list_item_text_cont">
                    {{ item.desc }}
                  </div>
                  <div class="detail_comments_list_item_text_time">
                    {{ item.createdAt | getDate }}
                    <a @click="reply_fun(item, item._id);">回复</a>
                  </div>
                  <div
                    v-show="item.reply && item.reply.length"
                    class="detail_comments_list_item_text_reply"
                    flex
                    v-for="(reply_item, reply_key) in item.reply"
                    :key="reply_key"
                  >
                    <div class="detail_comments_list_item_image">
                      <img :src="reply_item.headImage" alt="" />
                    </div>
                    <div class="detail_comments_list_item_text">
                      <div
                        class="detail_comments_list_item_text_title"
                        flex
                        justify="between"
                      >
                        <h3>
                          <span>@{{ reply_item.name }}</span> 回复
                          <span>@{{ reply_item.answer.name }}</span>
                        </h3>
                      </div>
                      <div class="detail_comments_list_item_text_cont">
                        {{ reply_item.desc }}
                      </div>
                      <div class="detail_comments_list_item_text_time">
                        {{ reply_item.createdAt | getDate }}
                        <a @click="reply_fun(reply_item, item._id);">回复</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="loadMore" style="text-align: center">
            <FrameBtn
              :loading="btnLoading"
              @click="_getComment"
              :text="hasMore ? '更多评论' : '没有更多了'"
            ></FrameBtn>
          </div>
        </div>
      </div>
      <!-- <infinite-loading -->
      <!-- :identifier="infiniteId" -->
      <!-- ref="infinite" -->
      <!-- @infinite="_getComment" -->
      <!-- &gt;</infinite-loading> -->
      <!-- 返回顶部 -->
      <BackTop></BackTop>
      <!-- 发表留言 -->
      <Modal draggable v-model="show_discuss" title="发表留言">
        <c-form
          ref="formValidate"
          :model="formValidate"
          :rules="ruleValidate"
          :label-width="80"
        >
          <div v-if="reply" class="reply_tips">
            回复<a>@{{ reply.name }}:</a>
          </div>
          <FormItem label="说点什么" prop="desc">
            <c-input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{ minRows: 4 }"
              placeholder="说点儿什么吧..."
            />
          </FormItem>
          <div v-if="!user_id">
            <FormItem label="昵称" prop="name">
              <c-input v-model="formValidate.name" placeholder="输入您的昵称" />
            </FormItem>
            <FormItem label="邮箱" prop="mail">
              <c-input
                v-model="formValidate.mail"
                placeholder="邮箱不会被公开显示"
              />
            </FormItem>
            <FormItem label="QQ" prop="qq">
              <c-input
                v-model.number="formValidate.qq"
                placeholder="QQ不会被公开显示"
              />
            </FormItem>
            <FormItem label="url" prop="url">
              <c-input
                v-model="formValidate.url"
                placeholder="Url会被当做昵称的外链使用,您可以放置您的个人博客于此"
              />
            </FormItem>
          </div>
        </c-form>
        <div slot="footer">
          <c-button size="large" @click="cancel_visitor('formValidate');"
            >取消</c-button
          >
          <c-button
            type="primary"
            size="large"
            :loading="loading"
            @click="submit_visitor('formValidate');"
            >确定</c-button
          >
        </div>
      </Modal>
      <!-- 分享 -->
      <Share
        :likes="detail.likes"
        :comments="total"
        @likeHandle="likeHandle"
        :isLike="detail.isLike"
        @commentsHandle="commentsHandle"
      ></Share>
    </div>
  </div>
</template>

<script>
import { getNewsDetail, commentCreate, getComment } from "../../ajax/api";
import { getScrollTop } from "../../lib/index";
import Code from "../../components/common/QRCode";
import BackTop from "../../components/public/BackTop/BackTop";
import FrameBtn from "../../components/public/FrameBtn/FrameBtn";
import Share from "../Blog/components/Share";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "detail",
  data() {
    return {
      id: "",
      reply: "",
      infiniteId: +new Date(),
      formValidate: {
        name: "",
        mail: "",
        desc: "",
        qq: "",
        url: "",
        headImage: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: false,
            type: "email",
            message: "请输入正确的邮箱号码",
            trigger: "blur"
          }
        ],
        qq: [
          {
            required: false,
            type: "number",
            message: "请输入正确的QQ号码",
            trigger: "blur"
          }
        ],
        url: [
          {
            required: false,
            type: "url",
            message: "请输入正确的链接地址",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "说点儿什么吧~",
            trigger: "blur"
          }
        ]
      },
      detail: {},
      show_code: false,
      scrollVal: 0,
      loading: false,
      discuss: "",
      show_discuss: false,
      isLogin: false,
      comments: [],
      total: 0,
      page: 1,
      pid: "",
      likeType: "like",
      hasMore: true,
      btnLoading: false
    };
  },
  computed: {
    ...mapGetters(["user_id", "userInfo"]),
    width() {
      let w = document.body.clientWidth;
      let h = document.body.clientHeight;
      // 为什么减去window.innerHight ? 因为初始的时候就有一屏幕的高度的, 滚动条是在此基础上进行的滚动
      let _w = (this.scrollVal / (h - window.innerHeight)) * w;
      return _w + "px";
    }
  },
  components: {
    VCode: Code,
    BackTop,
    FrameBtn,
    Share
  },
  beforeRouteEnter(to, from, next) {
    window.scroll(0, 0);
    next();
  },
  created() {
    this.id = this.$route.params.id || "";
  },
  mounted() {
    this.getData();
    this._getComment();
    this.scroll();
  },
  methods: {
    ...mapActions(["_likeNews"]),
    getData() {
      getNewsDetail({ id: this.id, uid: this.user_id }).then(res => {
        const { data } = res;
        this.detail = data;
        this.likeType = data.isLike ? "unlike" : "like";
      });
    },
    scroll() {
      window.addEventListener("scroll", () => {
        this.scrollVal = getScrollTop();
      });
    },
    loadDiscuss() {
      this.loading = true;
    },
    submit_discuss() {
      if (!this.discuss) {
        this.$Message.error("请输入内容");
      }
    },
    submit_visitor(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let userId = "";
          if (this.user_id) {
            this.formValidate.name = this.userInfo.userName;
            this.formValidate.mail = this.userInfo.email;
            this.formValidate.qq = this.userInfo.qq;
            this.formValidate.url = this.userInfo.homePage;
            this.formValidate.headImage = this.userInfo.headImage;
          }
          let data = {
            ...this.formValidate,
            newsId: this.$route.params.id,
            userId,
            pid: this.pid,
            answer: {
              name: this.reply.name
            }
          };
          commentCreate(data).then(res => {
            this.$Message.success(res.info);
            this.show_discuss = false;
            this.handleReset(name);
            if (!this.reply) {
              this.comments.unshift(res.data);
            } else {
              if (this.reply.pid == 0) {
                this.reply.reply.push(res.data);
              } else {
                let parent = this.comments.filter(
                  item => item._id === this.reply.pid
                );
                parent[0].reply.push(res.data);
              }
            }
          });
        } else {
          this.$Message.error("请填写相关信息!");
        }
      });
    },
    cancel_visitor() {
      this.show_discuss = false;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    // 获取评论
    _getComment() {
      if (!this.hasMore) {
        return false;
      }
      let params = {
        page: this.page,
        newsId: this.id
      };
      this.btnLoading = true;
      getComment(params)
        .then(res => {
          const { data } = res.data;
          if (data.length) {
            setTimeout(() => {
              this.page += 1;
              this.comments = [...this.comments, ...data];
              this.total = res.data.total;
              this.btnLoading = false;
            }, 1000);
          } else {
            this.hasMore = false;
            this.btnLoading = false;
          }
        })
        .catch(() => {
          this.btnLoading = false;
        });
    },
    open_discuss() {
      this.reply = "";
      this.pid = "";
      this.show_discuss = true;
    },
    // 回复别人
    reply_fun(item, id) {
      this.pid = id;
      this.reply = item;
      // if (this.reply.pid == 0) {
      //   this.reply.pid = this.reply._id;
      // }
      this.show_discuss = true;
    },
    // 喜欢
    likeHandle() {
      if (!this.user_id) {
        return;
      }
      this._likeNews({ aid: this.id, type: this.likeType }).then(() => {
        this.$Message.success("成功!");
        if (this.likeType === "like") {
          this.detail.likes += 1;
          this.likeType = "unlike";
          this.detail.isLike = true;
        } else {
          this.detail.likes -= 1;
          this.likeType = "like";
          this.detail.isLike = false;
        }
      });
    },
    // 左侧评论
    commentsHandle() {
      this.show_discuss = true;
    }
  }
};
</script>

<style lang="less">
@import "../../assets/styles/var";
@import "../../assets/styles/mixins";
.detail {
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*bottom: 0;*/
  /*overflow: auto;*/
  /*background-image: linear-gradient(to right top, #ffcc00 50%, #fff 50%);*/
  /*background-repeat: no-repeat;*/
  background-color: @background_color;
  z-index: 1000;
  padding: 50px 0;
  position: relative;
  /*min-height: 100vh;*/
  .detail_box {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 960px;
    background-color: #ffffff;
  }
  .detail_head {
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
    background: #fefefe;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 20px;
    line-height: 50px;
    .scrollbar {
      position: absolute;
      height: 2px;
      top: 0;
      left: 0;
      background-color: #50bcb6;
      -webkit-transition: width 0.5s ease;
      -moz-transition: width 0.5s ease;
      transition: width 0.5s ease;
    }
    .left {
      width: 40px;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
    .center {
    }
    .right {
      width: 50px;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      position: relative;
      i {
        font-size: 30px;
      }
    }
  }
  .detail_cont {
    padding: 80px 0;
    .detail_cont_banner {
      img {
        width: 100%;
      }
    }
    .detail_cont_title {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .detail_cont_time {
      font-size: 14px;
      color: #999;
      margin-bottom: 10px;
    }
    .detail_cont_tags {
      margin-bottom: 30px;
      a {
        margin-right: 10px;
        background: rgba(102, 128, 153, 0.075);
        border-radius: 0;
        padding: 2px 5px;
        color: rgba(44, 63, 81, 0.5);
        font-size: 12px;
      }
    }
    .detail_cont_cont {
      img {
        max-width: 100%;
      }
      iframe {
        max-width: 100%;
      }
      p {
        font-size: 14px;
        color: #111;
        margin-bottom: 10px;
        line-height: 18px;
      }
    }
  }
  .detail_discuss {
    margin-bottom: 30px;
    &_btn {
      padding: 20px 0;
      text-align: center;
      margin-bottom: 20px;
    }
    &_input {
      &_num {
        font-size: 16px;
        margin-bottom: 20px;
      }
      &_input {
        margin-bottom: 20px;
      }
      &_btn {
        text-align: right;
      }
    }
  }
  .detail_comments {
    &_list {
      margin-bottom: 20px;
      &_item {
        padding: 20px 0;
        position: relative;
        &:before {
          .bottom-line();
        }
        &_image {
          width: 70px;
          height: 70px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &_text {
          &_title {
            margin-bottom: 10px;
            h3 {
              font-size: 16px;
              color: @title_color;
              span {
                color: #3680e8;
              }
            }
            span {
              font-size: 12px;
              color: @sub_color;
            }
          }
          &_cont {
            font-size: 14px;
            padding-bottom: 25px;
            color: @info_color;
          }
          &_time {
            color: @sub_color;
            a {
              margin-left: 20px;
              color: @active_color;
            }
          }
          &_reply {
            padding-top: 20px;
          }
        }
      }
    }
  }
}
.reply_tips {
  margin-bottom: 10px;
  font-size: 14px;
  a {
    color: @active_color;
  }
}
</style>
