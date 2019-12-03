<template>
  <div class="All">
    <div :is="nowRouter"
    @toSet="toSet2"
    @toArgue="toArgue2"
    @toChangeInfo="toChangeInfo2"
    @goMine ="goMine2"
    @getCommit ="getCommit2"
    ></div>

  </div>
</template>

<script>
//引入组件 one
import mineOne from "@/components/mineOne"
import mineTwo from "@/components/mineTwo"
import mineSet from "@/components/mineSet"
import mineArgue from "@/components/mineArgue"
import mineChangeInfo from "@/components/mineChangeInfo"

import {mapMutations} from "vuex"
export default {
    data(){
        return {
          nowRouter:""
        }
    },
    methods:{
        reLogin(){
            this.$router.push({name:"login"})
        },
        ...mapMutations([
            "changeFoot2"
        ]),
        toSet2(val){
          this.nowRouter ="mineSet"
        },
        toArgue2(val){
          this.nowRouter ="mineChangeInfo"
        },
        toChangeInfo2(val){
          this.nowRouter ="mineArgue"
        },
        goMine2(val){
          this.nowRouter ="mineOne"
        },
        getCommit2(val){
          this.nowRouter ="mineOne"
        },
    },
    mounted(){
      this.$axios.get("/vue/lushi/getMine").then(res=>{
        if(res.data.code == 10000){
          this.nowRouter ="mineTwo"
          }else if(res.data.code ==200){
            this.nowRouter ="mineOne"
            // 登录成功就获取个人信息
          this.$store.dispatch("getStu")
          console.log(res)
        }
      });
       this.changeFoot2();
    },
    computed:{
      lol(){
        return this.$store.state.stuList
      }
  
    },
    components:{
      mineOne,
      mineTwo,
      mineSet,
      mineArgue,
      mineChangeInfo
    }
};
</script>

<style lang="scss" scoped>
.All{
  height: 100%;
}
</style>