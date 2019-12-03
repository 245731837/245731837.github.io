<template>
    <div class="All">
        <div class="top">
            <van-icon name="arrow-left" @click="goMine('mineOne')"/>
            个人资料
        </div>
        <!-- 下半部分驻北京 -->
        <div class="cont">
            <ul>
                <li @click="toChangeNick">昵称 <van-icon name="arrow" /> <span>{{stuList.nickname}}</span> </li> 
                    <transition v-if="ChangeNick" name="fade" mode="out-in" > 
                        <changename></changename>
                    </transition>

                <van-action-sheet v-model="show" :actions="actions" @select="onSelect" class="ooo" />
                <li  @click="changeShow">性别 <van-icon name="arrow" /> 
                <span>{{stuList.sex}}</span> 
                </li>

                <li @click="changeShowB">出生日期 <van-icon name="arrow" /> <span>{{stuList.birthday}}</span>  </li>
                <li>战网ID <van-icon name="arrow" />
                  <span>
                    <a href="https://www.battlenet.com.cn/login/zh/?ref=https://www.blizzardgames.cn/zh/&app=com-root">  点击获取您的战网ID</a>
                    </span>
                </li> 

                <li @click="changeShowS">个性签名 <van-icon name="arrow" /> 
                    <span>{{stuList.sign?stuList.sign:"未设置"}}</span>  
                </li>
                    <transition v-if="showS" name="fade" mode="out-in" > 
                        <changeSign></changeSign>
                    </transition>

                <li>我的称号 <van-icon name="arrow" /> <span>未获得</span>  </li>
            </ul>
        </div>
        <!--  -->
        <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            :min-date="minDate"
            :formatter="formatter"
            @confirm ="getBirthday"
            @cancel ="cBirthday"
            v-if="showB"
        />
        <!--  -->
    </div>
</template>

<script>
import changename from "./changeName"
import changeSign from "./changeSign"

import {mapMutations} from "vuex"

export default {
    data(){
        return {
            checked:false,
            checked2:true,
            ChangeNick:false,
            show: false,
            showB:false,
            showS:false,
            actions: [
                { name: '男' },
                { name: '女' },
            ],
            currentDate: new Date(),
            minDate:new Date('1950-01-01'),
            newnickname:null,
            newSex:null
        }
    },
    methods:{
        goMine(val){
            this.$emit("goMine",val)
        },
        toChangeNick(){
            this.ChangeNick =!this.ChangeNick
        },
        onCancel() {
            this.show = false;
            },
        changeShow(){
            this.show =true
        },
        onSelect(item) {
            // 默认情况下，点击选项时不会自动关闭菜单
            // 可以通过 close-on-click-action 属性开启自动关闭
            this.show = false;
            this.$toast('修改性别成功');
            console.log(item.name)
            // this.$axios.get("/vue/lushi/changeSex",{params:{sex:item.name}}).then(res=>{
            //     console.log(res)
            //     this.newSex = item.name
            //     console.log(this.newSex,31323)
            // })
            this.$store.dispatch("changeSex",item.name)

        },
        changeShowB(){
            this.showB =!this.showB
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            }
            return value;
        },
        getBirthday(value){
            const date = value.getFullYear() + '-' + (value.getMonth() + 1)
            console.log(date)
            this.showB =!this.showB 
            // this.$axios.get("/vue/lushi/changebirthday",{params:{birthday:date}}).then(res=>{
            //     console.log(res)
            // })
            this.$store.dispatch("changebirthday",date)

            this.$toast('生日修改成功');
        },
        cBirthday(){
            this.showB =!this.showB
        },
        changeShowS(){
            this.showS =!this.showS
        },
        ...mapMutations([
            "changeFoot"
        ])
    
    },
    components:{
        changename,
        changeSign
    },
    computed:{
        stuList(){
            return this.$store.state.stuList
        },
      
    },
    mounted(){
        this.changeFoot();
    }
}
</script>

<style lang="scss" scoped>
.fade-leave-active{animation:fadeOutRight .9s;}
.ooo{
    text-align: center
}
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
          .van-icon{
              float: right;
              margin-top: 0.37rem;
          }
          span{
              float: right;
          }
          .van-action-sheet{
              text-align: center;
          }
          a{
              color: rgb(177, 100, 6);
              text-decoration: underline
          }
      }
    }
}
</style>