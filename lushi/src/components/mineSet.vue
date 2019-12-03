<template>
    <div class="All">
        <div class="top">
            <van-icon name="arrow-left" @click="goMine('mineOne')"/>
            设置
        </div>
        <!-- 下半部分驻北京 -->
        <div class="cont">
            <ul>
                <li>夜间护眼模式 <van-switch v-model="checked" size="20px" inactive-color="#ccc"  /></li>
                <li>消息推送 <van-switch v-model="checked2" size="20px" inactive-color="#ccc"  /> </li>
                <li>屏蔽名单 <van-icon name="arrow" /> </li>
                <li>清除缓存 <van-icon name="arrow" /> </li>
                <li>当前版本 <span>v3.021.012.3</span></li>
                <li>关于我们 <van-icon name="arrow" /> </li>
            </ul>
        </div>
        <div>
            
        </div>
        <!--  -->
    </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
    data(){
        return {
            checked:false,
            checked2:true
        }
    },
    methods:{
        goMine(val){
            this.$emit("goMine",val)
        },
        ...mapMutations([
            "changeFoot"
        ])
    },
    mounted(){
        this.changeFoot();
    }
}
</script>

<style lang="scss" scoped>
.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
//   padding-right: 0.3rem;
//   padding-left: 0.3rem;
  padding-top: 0.3rem;
    .top{
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid rgb(230, 228, 228);
        padding-bottom: 0.2rem;;
        .van-icon{
            float: left;
            margin-top: 0.1rem;
            font-weight: 600;
            margin-left: 0.3rem;
        }
    }
    .cont{
      box-sizing: border-box;  
      li{
          height: 1rem;
          line-height: 1rem;
          padding-left: 0.3rem;
          padding-right: 0.3rem;
          border-bottom: 1px solid rgb(230, 228, 228);
          .van-switch{
              float: right;
              margin-top: 0.3rem;
          }
          .van-icon{
              float: right;
              margin-top: 0.3rem;
          }
          span{
              float: right;
          }
      }
    }
}
</style>