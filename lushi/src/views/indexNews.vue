<template>
    <div class="All">
        <!-- 顶部导航 -->
        <div class="top">
        <ul>
            <li
            li-active="1"
            v-for="(item,index) in wpList"
            :key="index"
            :class="{active : active == item.name}"
            @click="selected(item.name,item.com)"
            >
            <router-link :to="item.goto">{{item.name}}</router-link>
            </li>
        </ul>
        </div>

        <div :is="currentView"></div>

        

        <!-- --------- -->
        <div class="even">

        </div>
    </div>
</template>

<script>
import newsOne from "@/components/newsOne"
import newsTwo from "@/components/newsTwo"
import newsThree from "@/components/newsThree"
import newsFour from "@/components/newsFour"
import newsFive from "@/components/newsFive"

import {mapMutations} from "vuex"
export default {
    data(){
        return{
            currentView:"newsOne",
            current: 0,
            show: false,
            wpList: [
                {
                name: "最新",
                goto:"indexNews",
                com:"newsOne"
                },
                {
                name: "卡组",
                goto:"indexNews",
                com:"newsTwo"
                },
                {
                name: "视频",
                goto:"indexNews",
                com:"newsThree"
                },
                {
                name: "娱乐",
                goto:"indexNews",
                com:"newsFour"
                },
                {
                name: "赛事",
                goto:"indexNews",
                com:"newsFive"
                }

            ],
            active: "最新"
                }
    },
    components:{
        newsOne,
        newsTwo,
        newsThree,
        newsFour,
        newsFive
    },
    methods:{
        selected(name,com) {
            this.active = name;
            this.currentView =com
        },
        ...mapMutations([
            "changeFoot2"
        ])
    },
    mounted(){
        this.changeFoot2();
    }
}
</script>

<style lang="scss" scoped>
.active {
    border-bottom: 2px solid rgb(243, 141, 9);
}

.All {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;

    .top {
    width: 100%;
    height: 0.8rem;
    // background-color: #ccc;
    box-sizing: border-box;
    padding-right: 0.3rem;
    padding-left: 0.3rem;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 1000;
    border-bottom: 1px solid rgb(233, 231, 231);
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        line-height: 0.8rem;
        width: 25%;
        text-align: center;
        a {
          color: #000;
        }
      }
    }
  }

   .even{
       width: 100%;
       height: 1rem;
   }
}
</style>