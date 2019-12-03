<template>
    <div class="All">
        <div class="top">
            工具
        </div>
        <!--  jipai  -->
        <div class="jipaiqi">
            记牌器
        </div>
        
        <div class="jipai clear">
            <div class="T1 T2">
                    <img :src="list.img7" alt="">
                    <h3>Mini记牌器</h3>
                    <p>启动游戏即可记牌</p>             
            </div>
            <div class="T1">              
                    <img :src="list.img3" alt="">
                    <h3>盒子工具版</h3>
                    <p>完美支持添加和竞技场记牌器</p>
            </div>
        </div>
        <!-- 小工具 -->
        <div class="xiaogong">
            小工具
        </div>
        <div class="jipai clear">
            <div class="T1 T2">
                    <img :src="list.img1" alt="">
                    <h3>卡牌库</h3>
                    <p>卡牌及3衍生卡数据查询</p>             
            </div>
            <div class="T1">              
                    <img :src="list.img2" alt="">
                    <h3>大数据</h3>
                    <p>天体流派、竞技场大数据</p>
            </div>
            <div class="T1 T3" >              
                    <img :src="list.img4" alt="">
                    <h3>竞技场选牌</h3>
                    <p>完美支持添加和竞技场记牌器</p>
            </div>
        </div>

        <!-- 活动中心 -->
        <div class="act">
            活动中心
        </div>
        <div class="jipai clear">
            <div class="T1 T2">
                    <img :src="list.img5" alt="">
                    <h3>神秘商店</h3>
                    <p>使用战网积分即可兑换战网点！</p>             
            </div>
            <div class="T1">              
                    <img :src="list.img6" alt="">
                    <h3>大神赠礼</h3>
                    <p>关注网易大神号领积分、称号</p>
            </div>
        </div>
<!-- ------------ -->
    </div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
    data(){
        return{
            list:{
                img1:"http://ok.166.net/16163/2018-12-26/mm18/1545825504019_sycr6f.jpg",
                img2:"http://ok.166.net/16163/2019-01-10/mm18/1547120270434_wgcfpf.jpg",
                img3:"http://ok.166.net/16163/2019-01-07/mm18/1546861052310_egtcbn.jpg",
                img4:"http://ok.166.net/16163/2019-01-10/mm18/1547119192742_js7si0.jpg",
                img5:"http://ok.166.net/16163/2019-01-15/mm18/1547551312397_z4e3xy.jpg",
                img6:"http://ok.166.net/16163/2019-01-28/mm18/1548677222069_vjtp1s.jpg",
                img7:"http://ok.166.net/16163/2019-03-05/mm18/1551778230504_sfafer.jpg",
            }
        }
    },
    methods:{
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
.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
//   top
    .top{
        width: 100%;
        text-align: center;
        margin-top: 0.3rem;
    }
// jipai
    .jipai{
        width: 100%;
        margin-top: 0.2rem;
        .T2{
            margin-right: 0.5rem;
        }
        .T1{
            background-color: #f8f1f1;
            float: left;
            width: 3.2rem;
            border-radius: 5px;
            height: 1.5rem;
            img{
                width: 1rem;
                height: 1rem;
                float: left;
                margin-top: 0.2rem;
                margin-left: 0.2rem;
            }
            h3{
                float: left;
                margin-top: 0.2rem;
                margin-left: 0.1rem;
            }
            p{
                float: left;
                font-size: 12px;
                margin-left: 0.1rem;
                margin-top: 0.15rem;
                width: 1.8rem;
                white-space:wrap
            }
        }
    }
    // 小工具
    .xiaogong{
        margin-top: 0.3rem;
    }
    .T3{
        margin-top: 0.3rem;
    }
    // 活动中心
    .act{
        margin-top: 0.3rem;
    }
}
</style>