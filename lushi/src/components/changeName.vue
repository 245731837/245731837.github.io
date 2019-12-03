<template>
    <div class="All">
          
            <van-cell-group>
                <van-field
                    v-model="value"
                    center
                    clearable
                    label="新昵称"
                    autofocus
                >
                    <van-button slot="button" size="small" type="primary" @click="changeNick" text="确认修改"></van-button>
                </van-field>
            </van-cell-group>
       
    </div>
</template>

<script>
//导入辅助函数
import {mapState,mapGetters,mapMutations, mapActions} from "vuex"

export default {
    data(){
        return{
            value:""
        }
    },
    methods:{
        changeNick(){
            if(this.value){
                this.$store.dispatch("changeNick",this.value);
                 this.$toast('修改成功');
                // this.$axios.get("/vue/lushi/changenickname",{params:{nickname:this.value}}).then(res=>{
                //     console.log(res)
                // })
            }else{
                this.$notify({ type: 'warning', message: '昵称不能为空' });
            }
        }
    },
    computed:{
        stuList(){
            return this.$store.state.stuList
        }
    }
}
</script>

<style lang="scss" scoped>

.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
    .van-field{
        // background-color: rgb(197, 225, 226)
        border-radius: 15px;
        border: 1px solid rgb(24, 28, 29)
    }
}
</style>