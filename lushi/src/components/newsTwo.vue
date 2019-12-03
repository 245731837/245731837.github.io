<template>
    <div class="All">
         <!-- <div class="cont clear">
             <div class="con1">
             <p>素力高的撒大啊阿斯顿大飒大彩色电视擦身上飒</p>
                 <span>炉石需等会</span>
                 <b>5天前</b>
                 <em>17评</em>
             </div>
             <img src="http://ok.166.net/lushi-app/post/2019-11-08/1573151988298_eqh21i_.jpg" alt="">
         </div> -->
         <div 
         class="cont clear"
         v-for="(item,index) in list"
         :key="index"
         >
             <div class="con1">
             <p>{{item.title}}</p>
                 <span>{{item.author}}</span>
                 <b>{{item.stime}}</b>
                 <em>{{item.sns.commentCount}}评</em>
             </div>
             <img :src="item.img" alt="">
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
        this.$axios.get("/vue/lushi/kazu2").then(res=>{
            // console.log(res)
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
            b{
                margin-left: 0.3rem;
                margin-right: 0.3rem;
            }
        }
  }
}
</style>