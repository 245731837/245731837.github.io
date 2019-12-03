<template>
  <div class="All">
    <!-- 顶部 -->
    <div class="top">
      <div class="img" >
        <img :src="pic" alt="" @click="posttouxing" />
        <input type="file" @change="todoupload"  ref="upload" class="fileclass">
      </div>
      <div class="top2">
        <h2>酒馆顾客：{{stuList.nickname}}</h2>
        <p>战网ID: {{stuList._id}}</p>
      </div>
      <div class="top3">></div>
    </div>

    <!-- 动态 评论 关注 分时 -->
    <div class="moment">
      <ul>
        <li>
          0
          <br />动态
        </li>
        <li>
          0
          <br />评论
        </li>
        <li>
          0
          <br />关注
        </li>
        <li>
          0
          <br />粉丝
        </li>
      </ul>
    </div>

    <!-- 我的战绩 我的收藏 卡牌收集  任务&等级 -->
    <div class="rank">
      <van-grid class="rank1">
        <van-grid-item icon="award-o" text="我的战绩" />
        <van-grid-item icon="star-o" text="我的收藏" />
        <van-grid-item icon="photo-o" text="卡牌收集" />
        <van-grid-item icon="diamond-o" text="任务/等级" />
      </van-grid>
    </div>

    <!-- 设置区域 -->
    <div class="set">
        <ul>
            <li @click="toSet('mineSet')">设置 <span> > </span></li>
            <li @click="toArgue('mineArgue')">个人资料修改 <span> > </span></li>
            <li class="agrue" @click="toChangeInfo('mineChangeInfo')">意见和反馈 <span> > </span></li>
            <van-button type="danger" text="退出登录" @click="outLogin" size="normal"></van-button>
        </ul>
    </div>

  </div>
</template>

<script>
import pic from "@/assets/img2.jpg"
import {mapMutations} from "vuex"
export default {
    data(){
        return {
          pic:""
        }
    },
    methods:{
        reLogin(){
            this.$router.push({name:"login"})
        },
        outLogin(){
            sessionStorage.token="";
            location.reload()
        },
        posttouxing(){
          console.log(this.$refs)
            this.$refs.upload.click();
          
        },
        todoupload(){
           console.log("开始上传....");
            var file = this.$refs.upload.files[0];  // 需要上传的文件 
            console.log(file);
            var data = new FormData(); // 转换为表单的形式提交到后台  
            data.append("avatar",file);
            this.$axios({
                url:"/vue/uploadpic",
                method:"POST",
                params:{
                    flag:""
                },
                data
            }).then(res=>{
                console.log(res);
                this.pic = res.data.pic.replace("public","http://101.132.172.81:2020");
                // this.pic = res.data.pic.replace("public","/vue");  // 反选代理 
                localStorage.avatar = this.pic;
            })
        },
        toSet(val){
          console.log(val)
          this.$emit("toSet",val)
        },
        toArgue(val){
          console.log(val)
          this.$emit("toArgue",val)
        },
        toChangeInfo(val){
          console.log(val)
          this.$emit("toChangeInfo",val)
        },
        ...mapMutations(["changeFoot2"]),

    },
    computed:{
        stuList(){
            return this.$store.state.stuList
        }
    },
    mounted(){
      if(localStorage.avatar){
        this.pic =localStorage.avatar
      }else{
        this.$axios.get("/vue/lushi/getAvatar").then(res=>{
          console.log(res)
          if(!!res.data.flag){
             this.pic = res.data.res.pic.replace("public","http://101.132.172.81:2020");
          }else{
            this.pic = pic;
          }
        })
      };
      this.changeFoot2();
    },

};
</script>

<style lang="scss" scoped>
.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-right: 0.3rem;
  padding-left: 0.3rem;
  padding-top: 0.3rem;
  .fileclass{
    display: none;
  }
  // 顶部
  .top {
    width: 100%;
    height: 1.2rem;
    .img {
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 50%;
      background-color: #ccc;
      float: left;
      img {
        height: 1.2rem;
        width: 1.2rem;
        border-radius: 50%;
      }
    }
    .top2 {
      float: left;
      margin-left: 0.3rem;
      margin-top: 0.2rem;
      p {
        font-size: 12px;
        margin-top: 0.1rem;
      }
    }
    .top3 {
      float: right;
      margin-top: 0.4rem;
    }
  }
  // 动态 评论 关注 分时
  .moment {
    height: 1.2rem;
    width: 100%;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        text-align: center;
        width: 25%;
        margin-top: 0.2rem;
      }
    }
  }

// 设置区域
.set{
    margin-top: 0.3rem;
    li{
        height: 1rem;
        line-height: 1rem;
        border-top: 0.01rem solid #ccc;
        span{
            float: right;
        };
    }
    .agrue{
        border-bottom: 0.01rem solid #ccc;
    }
    .van-button{
        width: 100%;
        text-align: center;
        margin-top: 0.2rem;
    }
}
  footer{
    width: 100%;
    height: 1rem;
  }

}
</style>