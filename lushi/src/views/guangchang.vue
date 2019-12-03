<template>
  <div class="All">
    <!-- 顶部导航 -->
    <div class="top">
      <h1>
        广场
        <van-icon name="friends-o" />
      </h1>
      <!-- 通知栏 -->
      <van-notice-bar text="请在2019暴雪嘉年华和未来的日子中持续关注这一全新游戏模式的更多信息。我们迫不及待地想在酒馆战棋中与大家见面了！" left-icon="volume-o"/>

    </div>
    
    <!-- 选择区 -->
    <div class="select">
        <div>
          <van-icon name="fire-o" />
            #巨龙降临#
        </div>
        <div>
          <van-icon name="hot-o" />
            #酒馆战旗#
        </div>
        <div>
            #趣味晒图#
        </div>
        <div>
            #Box君答疑#
        </div>
    </div>

    <!--  -->
    <div 
    class="cont clear"
    v-for="(item,index) in list"
    :key="index"
    >
        <div class="contTop clear">
            <div class="imgaes">
              <img :src="item.avatar" alt="">
            </div>
            <div class="conC">
                <h2>{{item.nickname}}</h2>
                <p>
                    <span>lv{{item.like_count}}雷洛</span>
                </p>
            </div>
            <div class="guanzhu">
                <van-button plain color="#a36303" round size="mini" @click="gaiS($event)">+ 关注</van-button>
                <!-- <van-button v-else plain color="#ccc" round size="mini">以关注</van-button> -->
                <p>X</p>
            </div>
        </div>

        <div class="contB">
            <p>{{item.content}}</p>
            <div class="xiao clear">
              <h5>41分钟前</h5>
              <div class="xiao1">{{item.hot}}
                <van-icon name="good-job-o" />{{item.comment_count}}
                <van-icon name="chat-o" />
                <van-icon name="share" />
              </div>
            </div>
        </div>
    
    </div>

  <!-- ----------- -->
  </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  data() {
    return {
        list:[],
        GZbtn:"#a36303",
        guanzhushow:true
    };
  },
  methods:{
    ...mapMutations([
            "changeFoot2"
        ]),
        guanzhuBtn($event){
          const e =$event;
          console.log(e.target)
          console.log($(e.target))
          $(e.target).css({border:0}).text("已关注")
          
        },
        gaiS($event){
          this.guanzhushow =!this.guanzhushow
          const e =$event;
          console.log(e.target)
          $(e.target).css({border:0,backgroundColor:"#f9f9f9",color:"#000"}).text("已关注")
        }
  },
  mounted(){
    this.$axios.get("/vue/lushi/guangchang").then(res=>{
      console.log(res)
      this.list =res.data.msg
    })
    this.changeFoot2();
  }
};
</script>



<style lang="scss" scoped>
.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 0.2rem;

  .top {
    width: 100%;
    text-align: center;
    line-height: 0.6rem;
    color: rgb(192, 59, 6);
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 1000;
    border-bottom: 1px solid #d6d3d3;
  }
    .select{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        text-align: center;
        margin-top: 1.3rem;
        border-bottom: 5px solid #f2f2f2;
        div{
            width: 50%;
            margin-bottom: 0.4rem;
        }
    }


  .cont{
      box-sizing: border-box;
      width: 100%;
      padding-right: 0.3rem;
      border-bottom: 2px solid #ccc;
      .contTop{
          box-sizing: border-box;
          width: 100%;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          padding-top: 0.2rem;
          .imgaes{
              float: left;
              box-sizing: border-box;
              height: 0.5rem;
              width: 0.5rem;
              background-color: rgb(204, 33, 33);
              border-radius: 50%;
              margin-right: 0.3rem;
              img{
                width: 100%;
                height: 100%;
                border-radius: 50%
              }
          }
          .conC{
              float: left;
              p{
                font-size: 12px;
                line-height: 0.3rem;
                background-color: rgb(172, 199, 202);
                border-radius: 5px;
                margin-top: 0.2rem;
                width: 1rem;
              }
          }
          .guanzhu{
              float: right;
              margin-right: 0.1rem;
              margin-top: 0.1rem;
              p{
                float: right;
                color: #c0bdbd;
                margin-top: 0.1rem;
                margin-left: 0.3rem;
                font-size: 12px;
              }
          }
      }
      .contB{
        box-sizing: border-box;
        padding-left: 1rem;
        margin-top: 0.2rem;
        font-size: 12px;
        p{
          min-height: 1.3rem;
          width: 100%;
          overflow: hidden;
          text-overflow:ellipsis
        }
        .xiao{
          margin-bottom: 0.1rem;
          h5{
            float: left;
          }
          .xiao1{
            float: right; 
            .van-icon{
              margin-right: 0.2rem;
            }
          }
        }
      }
      
  }

}
</style>