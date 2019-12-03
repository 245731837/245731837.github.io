<template>
  <div>
    <!-- //轮播图 -->
    <div class="swipe">
      <van-swipe
        :autoplay="3000"
        indicator-color="white"
        indicator-position="left"
        class="swipeOne"
      >
        <van-swipe-item>
          <img src="http://ok.166.net/16163/X6IUEDFDFWQG1572401094874.jpg" alt />
          <p>酒馆战旗抢先体验已开启</p>
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="http://ok.166.net/16163/1572664602379_tgeoiy_.png?imageView&thumbnail=216y122"
            alt
          />
          <p>巨龙降临新卡汇总(36/144)</p>
        </van-swipe-item>
        <van-swipe-item>
          <img
            src="http://ok.166.net/16163/2019-10-31/mm18/1572494455347_d7eomg.jpg?imageView&thumbnail=216y122"
            alt
          />
          <p>雾色巨龙的起源上古之战!</p>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 下半部分内容 -->
    <div class="cont">
      <div class="sob" v-for="(item,index) in list" :key="index">
        <p @click="toDel(item.id)">{{item.title}} </p>
        <img :src="item.img" alt @click="toDel(item.id)"/>
        <h3>
          <span>{{item.author}}</span>
          <b>{{item.stime | filterTime}}</b>
          <i>{{item.sns.commentCount}}评</i>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        this.$axios.get("/vue/lushi/cont").then(res=>{
            // console.log(res)
            this.list =res.data.msg
        })
    },
    methods:{
      toDel(val){
        console.log(val)
        this.$router.push({name:"newsOneDetail",query:{cid:val}})
      }
    },
    filters:{
            // 局部注册 过滤器 
            filterTime(value){
                const ooo =value.slice(0,10)
                return ooo
            }
        },
};
</script>

<style lang="scss" scoped>
//   banner图
  .swipe{
      width: 100%;
      height: 3rem;
      height: 4rem;
      .swipeOne{
          width: 100%;
          height: 4rem;
          position: relative;
          p{
              position: absolute;
              left: 0.3rem;
              bottom: 0.2rem;
              color: #fff
          }
          img{
              width: 100%;
              height: 100%;
          }
      }
  }
//   下半部分内容
    .cont{
        width: 100%;
        box-sizing: border-box;
        padding-right: 0.3rem;
        padding-left: 0.3rem;
       
        .sob{
            width: 100%;
            height: 1.6rem;
            border-bottom: 1px solid #ccc;
            p{
                float: left;
                width: 4.7rem;
                margin-top: 0.2rem;
            }
            img{
                display: block;
                width: 1.3rem;
                height: 1.3rem;
                float: right;
                margin-top: 0.2rem;
            }
            h3{
                margin-top: 0.2rem;
                float: left;
                font-size: 12px;
                b{
                    margin-left: 0.3rem;
                    margin-right: 0.3rem;
                }
            }
        }
    }
</style>