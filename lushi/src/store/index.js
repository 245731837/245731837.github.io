import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {http} from "@/utils/axios"

const stuInfo ={
  state:{
    
  },
  actions:{

  },
  mutations:{
   
  }
}

export default new Vuex.Store({
  state: {
    stuList:[1],
    footFlag:true,
    nickname:""
  },
  mutations: {
    getStu(state,item){
      state.stuList =item
    },
    changeFoot(state){
      state.footFlag =false
    },
    changeFoot2(state){
      state.footFlag =true
    },
    changeNick(state,item){
      state.stuList =item
    },
    getNewStu(state,item){
      state.stuList =item
    }
  },
  actions: {
    getStu(context,item){
      http.get("/vue/lushi/getStuInfo").then(res=>{
        console.log("666666666666",res);
        context.commit("getStu",res.data.result)
      })
    },
    //修改个人信息 修改昵称
    changeNick(context,item){
      http.get("/vue/lushi/changenickname",{params:{nickname:item}}).then(res=>{
          console.log("666666666666",res);
          http.get("/vue/lushi/getMine").then(res=>{
            console.log(132132,res.data.result)
            context.commit("getNewStu",res.data.result)
          })
      })
    },
    //修改性别
    changeSex(context,item){
      http.get("/vue/lushi/changeSex",{params:{sex:item}}).then(res=>{
          console.log(res.data.sex)
          http.get("/vue/lushi/getMine").then(res=>{
            console.log(132132,res.data.result)
            context.commit("getNewStu",res.data.result)
          })
      })
    },
    //修改年龄
    changebirthday(context,item){
        http.get("/vue/lushi/changebirthday",{params:{birthday:item}}).then(res=>{
            http.get("/vue/lushi/getMine").then(res=>{
              console.log(132132,res.data.result)
              context.commit("getNewStu",res.data.result)
            })
        })
      },
    //修改签名
    changeSign(context,item){
        http.get("/vue/lushi/changeSign",{params:{sign:item}}).then(res=>{
            http.get("/vue/lushi/getMine").then(res=>{
              console.log(132132,res.data.result)
              context.commit("getNewStu",res.data.result)
            })
        })
      }
    
  },
  modules: {
    stuInfo
  }
})
