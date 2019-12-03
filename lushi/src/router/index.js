import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//login 路由
import login from "@/views/login"
//register 路由
import register from "@/views/register"
//错误地址路由
import notfound from "@/views/notfound"
//首页路由
import index from "@/views/index"
//mine 路由
import mine from "@/views/mine"
//炉友广场路由
import guangchang from "@/views/guangchang"
//卡组路由
import kazu from "@/views/kazu"
//工具路由
import tool from "@/views/tool"



// import indexNews from "@/views/indexNews"

const routes = [
  {
    path:"/",
    redirect:{
      name:"indexNews"
    }
  },
  {
    path:"/index",
    name:"index",
    component:index,
    children:[
      {
        path:"indexNews",
        name:"indexNews",
        component:()=>import("@/views/indexNews")
      }
    ]
  },
  {
    path:"/guangchang",
    name:"guangchang",
    component:guangchang
  },
  {
    path:"/kazu",
    name:"kazu",
    component:kazu
  },
  {
    path:"/tool",
    name:"tool",
    component:tool
  },
  {
    path:"/login",
    name:"login",
    component:login,
    children:[
      {
        path:"emalLogin",
        name:"emalLogin",
        component:()=>import("@/components/emalLogin")
      }
    ]
  },
  {
    path:"/register",
    name:"register",
    component:register
  },
  {
    path:"/mine",
    name:"mine",
    component:mine
  },
  //  newsOne 详情页路由
  {
    path:"/newsOneDetail",
    name:"newsOneDetail",
    component:()=>import("@/views/newsOneDetail")
  },
  {
    path:"/notfound",
    name:"notfound",
    component:notfound
  },
  {
    path:"*",
    redirect:{
      name:"notfound"
    }
  }
]

const router = new VueRouter({
  routes
})

export default router

