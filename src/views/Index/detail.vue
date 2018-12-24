<template>
  <div class="detail">
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
            <FrameBtn @click="show_discuss = true;" text="发表留言"></FrameBtn>
          </div>
          <div class="detail_discuss_input">
            <div class="detail_discuss_input_num">17条评论</div>
            <div class="detail_discuss_input_input">
              <c-input
                v-model="discuss"
                type="textarea"
                :autosize="{ minRows: 4 }"
                placeholder="说点儿什么吧..."
              />
            </div>
            <div class="detail_discuss_input_btn">
              <c-button @click="submit_discuss" type="primary" size="large">
                发表评论
              </c-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
    <!-- 发表留言 -->
    <Modal
      v-model="show_discuss"
      title="发表留言"
      :loading="loading"
      @on-ok="submit_visitor('formValidate')"
    >
      <c-form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="80"
      >
        <FormItem label="说点什么" prop="desc">
          <c-input
            v-model="formValidate.desc"
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="说点儿什么吧..."
          />
        </FormItem>
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
          <c-input v-model="formValidate.qq" placeholder="QQ不会被公开显示" />
        </FormItem>
        <FormItem label="url" prop="url">
          <c-input
            v-model="formValidate.qq"
            placeholder="Url会被当做昵称的外链使用,您可以放置您的个人博客于此"
          />
        </FormItem>
      </c-form>
    </Modal>
  </div>
</template>

<script>
import { getNewsDetail } from "../../ajax/api";
import Code from "../../components/common/QRCode";
import BackTop from "../../components/public/BackTop/BackTop";
import FrameBtn from "../../components/public/FrameBtn/FrameBtn";
export default {
  name: "detail",
  props: {
    id: String
  },
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        desc: "",
        qq: "",
        url: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      detail: {},
      show_code: false,
      scrollVal: 0,
      loading: false,
      discuss: "",
      show_discuss: false
    };
  },
  computed: {
    width() {
      let w = window.innerWidth;
      let h = document.body.clientHeight;
      let _w = (this.scrollVal / h) * w;
      return _w + "px";
    }
  },
  components: {
    VCode: Code,
    BackTop,
    FrameBtn
  },
  mounted() {
    this.getData();
    // document.getElementById("code").addEventListener("hover", () => {
    //   this.show_code = true
    // });
    this.scroll();
  },
  methods: {
    getData() {
      let id = this.id || this.$route.params.id || "";
      if (id) {
        getNewsDetail({ id: id }).then(res => {
          const { data } = res;
          this.detail = data;
        });
      }
    },
    scroll() {
      window.addEventListener("scroll", () => {
        let scrollVal = window.document.documentElement.scrollTop;
        this.scrollVal = scrollVal;
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
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style lang="less">
.detail {
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*bottom: 0;*/
  background-color: #fff;
  z-index: 1000;
  padding-top: 50px;
  .detail_head {
    height: 50px;
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
    background: #fefefe;
    width: 100%;
    position: fixed;
    top: 0;
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
}
</style>
