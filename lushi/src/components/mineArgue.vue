<template>
  <div class="All">
    <div class="top">
      <van-icon name="arrow-left" @click="goMine('mineOne')" />意见反馈
    </div>
    <!--  -->
    <div class="argueTitle">
      <span>问题和意见</span>
      <p>您还可以输入200字</p>
    </div>
    <!--  -->
    <div class="inpText">
      <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="200"
          placeholder="留下您宝贵的意见~"
          show-word-limit
          border
        />
      </van-cell-group>
    </div>
    <!--  -->
    <div class="upImg">
      <h6>上传图片({{imgNum}}/3)</h6>
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="3"
        :after-read="afterRead"
        :before-delete="deleteImg"
      />
    </div>
    <!--  -->
    <div class="contact">
      <h5>联系QQ</h5>
      <van-cell-group>
        <van-field v-model="valuecontact" placeholder="选填，便于我们和你联系" />
      </van-cell-group>
      <h5>联系电话</h5>
      <van-cell-group>
        <van-field v-model="valuecontact2" placeholder="选填，便于我们和你联系" />
      </van-cell-group>
    </div>
    <!--  -->
    <div class="bbb">
      <van-button type="warning" round @click="subShow">提交</van-button>
    </div>
    <!--  -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop @click="show1" >
        <div class="block" @click="show = false" >
          感谢您的留言~
        </div>
      </div>
    </van-overlay>
    <!--  -->
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  data() {
    return {
      showwordlimit: true,
      message: "",
      fileList: [],
      imgNum: 0,
      valuecontact: "",
      valuecontact2: "",
      show: false
    };
  },
  methods: {
    goMine(val) {
      this.$emit("goMine", val);
    },
    afterRead(file, fileList) {
      // 此时可以自行将文件上传至服务器

      this.imgNum = fileList.index + 1;
    },
    deleteImg(file, fileList) {
      console.log(fileList);
      this.imgNum = fileList.index;
      return true;
    },
    ...mapMutations([
            "changeFoot"
        ]),
    subShow(){
      if(this.message){
        this.show =!this.show
      }else{
        this.$toast('您还没写下您的意见呢！');
      }
    },
    show1(){
      this.show =false
      this.$emit("getCommit","mineOne")
    }
  },
   mounted(){
        this.changeFoot();
    }
};
</script>

<style lang="scss" scoped>
.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  .top {
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid rgb(230, 228, 228);
    padding-bottom: 0.2rem;
    background-color: #fff;
    padding-top: 0.3rem;
    .van-icon {
      float: left;
      margin-top: 0.1rem;
      font-weight: 600;
      margin-left: 0.3rem;
    }
  }
  .argueTitle {
    height: 0.8rem;
    line-height: 0.8rem;
    width: 100%;
    box-sizing: border-box;
    padding-left: 0.3rem;
    padding-right: 0.3rem;

    span {
      float: left;
    }
    p {
      float: right;
      font-size: 12px;
      color: #a39d9d;
    }
  }
  .upImg {
    background-color: #fff;
    h6 {
      box-sizing: border-box;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      height: 0.8rem;
      line-height: 0.8rem;
      width: 100%;
      background-color: #f2f2f2;
    }
    .van-uploader {
      box-sizing: border-box;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      padding-top: 0.3rem;
    }
  }
  .contact {
    h5 {
      box-sizing: border-box;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      height: 0.8rem;
      line-height: 0.8rem;
    }
  }
  .bbb {
    box-sizing: border-box;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    .van-button {
      width: 100%;
      margin-top: 0.3rem;
    }
  }
  // 111111111111111111111111
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    width: 100%;
    height: 3rem;
    background-color: #fff;
    border-radius: 0.5rem;
    text-align: center;
    line-height: 3rem
  }
}
</style>