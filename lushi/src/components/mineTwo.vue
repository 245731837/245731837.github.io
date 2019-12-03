<template>
  <div class="All">
    <!-- 顶部 -->
    <div class="top">
      <div class="img">
        <img src="#" alt />
      </div>
      <div class="top2" @click="toLogin">
        <h2>点击登录</h2>
        <p>快登录吧，其他小伙伴正在炉边等你</p>
      </div>
      <div class="top3">></div>
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
            <li>设置 <span> > </span></li>
            <li class="agrue">意见和反馈 <span> > </span></li>

        </ul>
    </div>


  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        toLogin(){
            this.$router.push({name:"login"})
        }
    }
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
  //   top p p p p
  .top {
    width: 100%;
    height: 1.2rem;
    margin-bottom: 0.5rem;
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


}
</style>