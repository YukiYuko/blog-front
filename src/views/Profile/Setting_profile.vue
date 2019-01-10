<template>
  <div class="setting_profile">
    <h1>个人资料</h1>
    <ul>
      <li class="headImage" flex="" items="center">
        <div class="left">头像</div>
        <div class="center" box="1" flex="">
          <img :src="headImage" :alt="userName" />
          <div class="upload">
            <p>支持 jpg、png 格式大小 5M 以内的图片</p>
            <p>
              <EffectBtn text="点击上传" type="normal">
                <label class="upload-img-btn" for="upload-img">上传图片</label>
                <input id="upload-img" type="file" @change="upload_img" />
              </EffectBtn>
            </p>
          </div>
        </div>
      </li>
      <setting_profile_item
        v-model="userName"
        @input="v => (userName = v)"
        placeholder="请填写你的用户名"
        label="用户名"
        @save="save('userName');"
        @cancel="cancel('userName');"
      ></setting_profile_item>
      <setting_profile_item
        v-model="job"
        @input="v => (job = v)"
        placeholder="请填写你的职位"
        label="职位"
        @save="save('job');"
        @cancel="cancel('job');"
      ></setting_profile_item>
      <setting_profile_item
        v-model="company"
        @input="v => (company = v)"
        placeholder="请填写你的公司"
        label="公司"
        @save="save('company');"
        @cancel="cancel('company');"
      ></setting_profile_item>
      <setting_profile_item
        v-model="introduce"
        @input="v => (introduce = v)"
        placeholder="请填写你的个人介绍"
        label="个人介绍"
        @save="save('introduce');"
        @cancel="cancel('introduce');"
      ></setting_profile_item>
      <setting_profile_item
        v-model="homePage"
        @input="v => (homePage = v)"
        placeholder="请填写你的个人主页"
        label="个人主页"
        @save="save('homePage');"
        @cancel="cancel('homePage');"
      ></setting_profile_item>
    </ul>
    <!-- 上传图像 -->
    <div class="cropper-img-box" v-if="cropper_box_mark">
      <vueCropper
        ref="cropper"
        :img="cropperData.img"
        :autoCrop="true"
        :autoCropWidth="600"
        :autoCropHeight="300"
        :fixedBox="false"
        :fixed="false"
        :outputSize="0.5"
      ></vueCropper>
      <div class="cropper-img-tool">
        <button class="cropper-img-tool-btn" @click="rotateRight">
          顺时针90°
        </button>
        <button class="cropper-img-tool-btn" @click="finish">确认</button>
        <button class="cropper-img-tool-btn" @click="cropper_box_mark = false;">
          取消
        </button>
        <button class="cropper-img-tool-btn" @click="rotateLeft">
          逆时针90°
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
import { mapGetters, mapActions } from "vuex";
import setting_profile_item from "./Setting_profile_item";
import EffectBtn from "../../components/public/EffectBtn/EffectBtn";
export default {
  name: "Setting_profile",
  data() {
    return {
      cropper_box_mark: false,
      cropperData: {
        img: "",
        autoCrop: true
        // autoCropWidth: 200,
        // autoCropHeight: 200
        // fixedNumber: [16, 9],
        // fixedBox: true
      },
      headImage: "",
      userName: "",
      job: "",
      company: "",
      introduce: "",
      homePage: ""
    };
  },
  computed: {
    ...mapGetters(["user_id", "nav", "userInfo"])
  },
  components: {
    setting_profile_item,
    EffectBtn,
    VueCropper
  },
  watch: {
    userInfo: function(val) {
      console.log(val);
      this.headImage = val.headImage;
      this.userName = val.userName;
      this.job = val.job;
      this.company = val.company;
      this.homePage = val.homePage;
      this.introduce = val.introduce;
    }
  },
  mounted() {},
  methods: {
    ...mapActions(["getNav", "_getUser", "_updateUser"]),
    cancel(key) {
      this[key] = this.userInfo[key];
    },
    save(key) {
      let data = {
        [key]: this[key]
      };
      this._updateUser(data);
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    finish() {
      this.$refs.cropper.getCropData(async data => {
        await this._updateUser({ headImage: data });
        this.cropper_box_mark = false;
      });
    },
    upload_img(e) {
      let obj = e.target;
      let file = obj.files[0];
      let temArr = file.name.split(".");
      let file_suffix = temArr[temArr.length - 1];
      if (
        file_suffix !== "jpg" &&
        file_suffix !== "png" &&
        file_suffix !== "jpeg"
      ) {
        this.$Message.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
        return;
      }
      let reader = new FileReader();
      let _self = this;
      reader.onload = ev => {
        _self.cropperData.img = ev.target.result;
        _self.cropper_box_mark = true;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/styles/mixins";
@import "../../assets/styles/var";
.setting_profile {
  h1 {
    font-size: 18px;
    padding: 20px 0;
  }
  .headImage {
    padding: 10px 0;
    border-top: 1px solid @border_color;
    .left {
      width: 120px;
    }
    .center {
      img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }
      .upload {
        p {
          color: @sub_color;
          margin: 10px 0;
        }
      }
    }
  }

  #upload-img {
    opacity: 0;
    display: none;
  }
  .upload-img-btn {
    display: block;
    text-align: center;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .cropper-img-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    .cropper-img-tool {
      position: absolute;
      z-index: 2;
      bottom: 20px;
      left: 0;
      text-align: center;
      width: 100%;
      .cropper-img-tool-btn {
        width: 140px;
        height: 50px;
        font-size: 18px;
        cursor: pointer;
        color: #ffffff;
        & + .cropper-img-tool-btn {
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
