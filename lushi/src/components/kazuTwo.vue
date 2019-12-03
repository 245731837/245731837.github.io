<template>
    <div class="All">
        <div class="search">
            <form action="/">
                <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    show-action
                    @search="onSearch"
                    @cancel="onCancel"
                    autofocus="autofocus"
                />
            </form>
        </div>

         <!-- 下半部分主内容 -->
        <div class="cont clear" v-for="(item,index) in list" :key="index">
        <div class="contOne clear">
            <img :src="item.img" alt />
            <div class="tal">
            <h2>{{item.title}}</h2>
            <p>{{item.tips}}</p>
            </div>
            <van-button type="warning" size="mini" round>订阅</van-button>
        </div>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
           value:"" ,
           list:[]
        }
    },
    methods:{
        onSearch(){
            this.$axios.get("/vue/lushi/searchkazu",{params:{key:this.value}}).then(res=>{
                // console.log(res)
                if(res.data.msg.length>0){
                    this.list =res.data.msg
                }else{
                    this.$notify({ type: 'warning', message: '没有搜索到您要的关键词哦~',duration: 1000 });
                }
            })
        },
        onCancel(){
            this.$emit("changeByTwo")
        },
       
    }
}
</script>

<style lang="scss" scoped>
.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-right: 0.3rem;
  padding-left: 0.3rem;
  padding-top: 0.3rem;

//    /下半部分主内容
    .cont{
        width: 100%;
        .contOne{
            width: 100%;
            border-bottom: 1px solid #ccc;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            img{
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 5px;
                float: left;
                
            }
            .van-button{
              margin-top: 0.2rem;
              margin-left: 0.1rem;
            }
            .tal{
                float: left;
                width: 4.8rem;
                margin-left: 0.1rem;
                margin-top: 0.1rem;
                p{
                  font-size: 12px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow:ellipsis;
                  color: rgb(197, 190, 190);
                  margin-top: 0.1rem;
                }
            }
        }
    }

}
</style>