<template>
    <div class="All">
         <div 
         class="cont clear"
         v-for="(item,index) in list"
         :key="index"
         >
             <div class="con1">
             <p>{{item.title}}</p>
                 <span>{{item.author}}</span>
                 
                 <em>{{item.sns.commentCount}}评</em>
             </div>
             <img :src="item.img" alt="">
             <van-icon name="play-circle-o" size="0.8rem" />
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
        this.$axios.get("/vue/lushi/vedio").then(res=>{
            console.log(res)
            this.list =res.data.msg
        })
    }
}
</script>

<style lang="scss" scoped>
.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 0.1rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  .cont{
      margin-bottom: 0.2rem;
      border-bottom: 0.5px solid #ccc;
      padding-bottom: 0.2rem;
      position: relative;
      .van-icon{
          color: #fff;
          position: absolute;
          top: 0.3rem;
          right: 0.55rem;
      }
        img{
            width: 1.9rem;
            height: 1.5rem;
            float: right;
        }
        .con1{
            float: left;
            width: 4.7rem;
            p{
                margin-bottom: 0.3rem;
                margin-top: 0.2rem;
            }
            span,b,em{
                font-size: 12px;
                color: rgb(112, 112, 112)
            }
            span{
               
                margin-right: 0.6rem;
            }
        }
  }
}
</style>