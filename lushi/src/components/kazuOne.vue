<template>
  <div class="All">
    <!--  -->
      <div class="top">
        <div class="search">
            <van-search @click="clickS" placeholder="请输入搜索关键词" v-model="value" round/>
        </div>
        <div class="fold">
          <van-collapse v-model="activeNames" class="sear">
            <van-collapse-item id="a" title="模式" name="1">
              <van-button type="warning">标准</van-button>
              <van-button type="warning">狂野</van-button>
            </van-collapse-item>
          </van-collapse>
          <van-collapse v-model="activeNames" class="sear">
            <van-collapse-item title="职业" name="2">内容</van-collapse-item>
          </van-collapse>
          <van-collapse v-model="activeNames" class="sear">
            <van-collapse-item title="最新" name="3">内容</van-collapse-item>
          </van-collapse>
          <van-collapse v-model="activeNames" class="sear">
            <van-collapse-item title="筛选" name="4">内容</van-collapse-item>
          </van-collapse>
        </div>
      </div>

    <!-- 刷新van 组件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 下半部分主内容 -->
      <!-- 以订阅 -->
      <div v-if="ding">
          <div class="cont clear" v-for="(item,index) in list2" :key="index">
            <div class="contOne clear contTwo">
              <img :src="item.img" alt />
              <div class="tal">
                <h2>{{item.title}}</h2>
                <p>{{item.tips}}</p>
              </div>
              <van-button type="info" size="mini" round >退订</van-button>
            </div>
          </div>
      </div>
        <!-- 未订阅 -->
      <div class="cont clear" v-for="(item,index) in list" :key="index">
        <div class="contOne clear">
          <img :src="item.img" alt />
          <div class="tal">
            <h2>{{item.title}}</h2>
            <p>{{item.tips}}</p>
          </div>
          <van-button type="warning" size="mini" round :disabled="btnDis" @click="changeBtn($event)">订阅</van-button>
        </div>
      </div>
    
    <!-- 刷新van 组件 -->
    </van-pull-refresh>
    <!--  -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeNames: ["0"],
      value: "",
      list: [],
      list2:[],
      dingyuelist:{
        flage:0
      },
      count: 0,
      isLoading: false,
      btnDis:false,
      ding:false,
    };
  },
  methods: {
    clickS(){
        this.$emit("changeByOne")
    },
     onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        // console.log(this.dingyuelist)
        if(this.dingyuelist.flage){
            this.$axios.get("/vue/lushi/dingyue",{params:this.dingyuelist}).then(res=>{
            // console.log(this.list)
            // console.log(res)
            this.list =this.list.filter((item,index)=>{
              return item.title != res.data.result[0].title
            })
            this.list2 = res.data.result;
            // console.log(this.list2 )
            this.ding = true;
          })
        }
      }, 500);
    },
    changeBtn($event){
      const e =$event;
      const dingyue={};
      $(e.target).attr({disabled:true}).css({backgroundColor:"rgb(245, 166, 120, 0.712)",border:0}).text("下拉查看");
       this.dingyuelist.img=$(e.target).siblings("img").attr("src")
        this.dingyuelist.title=$(e.target).siblings(".tal").children("h2").text()
        this.dingyuelist.tips =$(e.target).siblings(".tal").children("p").text()
        this.dingyuelist.flage =1
      //  console.log( this.dingyuelist)
       
    }
  },
  mounted() {
    this.$axios("/vue/lushi/kazu").then(res => {
      console.log(res);
      this.list = res.data.mgs;
    });
  },
  watch:{

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
  // 顶部

  .fold {
    display: flex;
    font-size: 10px;
    justify-content: space-between;
    .sear{
        display: flex;
    }
  }

//   /下半部分主内容
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
         .contTwo{
          border-bottom: 2px solid rgb(173, 238, 250)
        }
    }
}
</style>