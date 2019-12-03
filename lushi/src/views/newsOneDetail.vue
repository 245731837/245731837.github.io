<template>
    <div class="All">
        <!--  -->
        <div class="top">
            <van-icon name="arrow-left" @click="toBack"/>
            <img src="//ok.166.net/16163/2018-05-04/mm18/1525433813564_cilqpe.jpg" alt="">
            <span>{{list?list.title:"祝你快乐"}}</span>
        </div>
        <!-- 分享 -->
        <div class="shar">
            <h2>——分享到——</h2>
            <div class="shar1 clear">
                <img src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=318b6bf6073387449cc5287a6934bec4/d53f8794a4c27d1e15b40e6210d5ad6edcc43881.jpg" alt="">
                <img src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=a76e3a8a47540923aa696478aa63b634/f3d3572c11dfa9eca0cc92be6cd0f703908fc1bd.jpg" alt="">
                <img src="https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=6009cbf88d025aafd33279cdc3d6cc59/4a36acaf2edda3cccdc335180ee93901213f92e7.jpg" alt="">
            </div>
            <h3>热门评论</h3>
        </div>
        <!-- hotcommit -->
        <!-- <div class="hot clear">
            <img src="http://ok.166.net/lushi-app/user/2019-07-13/1563025842641_1lbmw0.jpg" alt="">
            <div class="hot1 clear">
                <div class="leve">
                    <h6>LV9</h6>
                    <h4>你好像不平凡</h4>
                </div>
            </div>
            <p>
                山歌给约好手段和打卡时间和打卡时间很快的撒大阿达撒是撒大撒
            </p>
            <div class="hot2 clear">
                <span>5天前</span>
                <b>27条回复</b>
                <van-icon name="arrow" />
                <p>86<van-icon name="good-job-o" /></p>
            </div>
        </div> -->
        <div v-if="show">
                    <div class="hot clear"  v-for="(item,index) in list.comment_list" :key="index">
                    <img :src="item.avatar" alt="">
                    <div class="hot1 clear">
                        <div class="leve">
                            <h6>LV{{item.commentCount}}</h6>
                            <h4>{{item.nickname}}</h4>
                        </div>
                    </div>
                    <p>
                        {{item.msg}}
                    </p>
                    <div class="hot2 clear">
                        <span>{{item.time | filterTime}}</span>
                        <b>{{item.likeCount}}条回复</b>
                        <van-icon name="arrow" />
                        <p>{{item.totalReward}}<van-icon name="good-job-o" /></p>
                    </div>
                </div>
        </div>
        
        <!--  -->
        <div v-if="!show">没有根据url 中的cid 获取到数据库的信息 </div>
        <div v-if="!show">数据库只有 前面5 条 </div>
        <div v-if="!show">偷数据不易程序猿何苦为难程序猿 ！！！</div>
    </div>
</template>

<script>
import {mapMutations} from "vuex"

export default {
    data(){
        return {
            show:false,
            list:{
                comment_list:[]
            }
        }
    },
    methods:{
        toBack(){
            this.$router.go(-1)
        },
        ...mapMutations([
            "changeFoot"
        ])
    },
    filters:{
            // 局部注册 过滤器 
            filterTime(value){
                const ooo =value.slice(0,10)
                return ooo
            }
        },
    mounted(){
        const que =this.$route.query
        console.log(que)
        this.$axios.get("/vue/lushi/newsOneDel",{params:{id:que.cid}}).then(res=>{
            console.log(res)
            if(res.data.msg.length > 0){
                this.list =res.data.msg[0];
                console.log("21321",this.list)
                this.show =true
            }
        })
        this.changeFoot();
    }
}
</script>


<style lang="scss" scoped>
.All{
    width: 100%;
    height: 100px;
    .top{
        margin-top: 0.2rem;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.2rem;
        img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            float: left;
            margin-left: 1.7rem;
            margin-right: 0.2rem;
        }
        span{
            float: left;
            font-weight: 600;
        }
        .van-icon{
            float: left;
            margin-top: 0.2rem;
            margin-left: 0.3rem;
            font-weight: 600;
            font-size: 20px;
        }
        
    };
    .shar{
        box-sizing: border-box;
        h2,h3{
            margin: 0 auto;
            width: 4rem;
            text-align: center;
            margin-top: 0.5rem;
        }
        .shar1{
            margin-left: 1.7rem;
            margin-top: 0.3rem;
            img{
                float: left;
                height: 1rem;
                width: 1rem;
                border-radius: 50%;
                margin-right: 0.6rem;
                margin-bottom: 0.2rem;
            }
        }
    }
    .hot{
        margin-top: 0.3rem;
        box-sizing: border-box;
        padding-right: 0.3rem;
        border-bottom: 1px solid #ccc;
        img{
            height: 0.8rem;
            width: 0.8rem;
            border-radius: 50%; 
            float: left;
            margin-right: 0.3rem;
        }
        .hot1{
            margin-top: 0.1rem;
            height: 0.5rem;
            .leve{
                float: left;
                h4{
                    float: left;
                    font-size: 14px;
                    color: #979797
                };
                h6{
                    float: left;
                    font-size: 12px;
                    margin-top: 0.03rem;
                    background-color: rgb(14, 177, 241);
                    color: #fff;
                    padding-left: 0.1rem;
                    padding-right: 0.1rem;
                    border-radius: 5px;
                    margin-right: 0.2rem;
                }
            }
        }
        p{
            float: right;
            width: 6.1rem;
        }
        .hot2{
            float: left;
            margin-top: 0.2rem;
            margin-bottom: 0.2rem;
            width: 100%;
            .van-icon{
                float: left;
                margin-top: 0.1rem;
                margin-left: 0.2rem;
            }
            p{
                float: right;
                width: 1.5rem;
                line-height: 0.5rem
            }
            span{
                float: left;
                margin-left: 1.1rem;
            }
            b{
                float: left;
                color: rgb(238, 140, 12);
                margin-left: 0.3rem;
            }
        }
    }
}
</style>