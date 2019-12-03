const express =require("express");
const app =express();

const path =require("path")

const server = require("http").createServer(app);
const port = 2020;
const hostname = "0.0.0.0"


app.use(express.static(path.join(__dirname, 'public')));  // 设置express静态文件目录 img/css/js

app.use(express.json()); //  得到 post请求的提交的 formData 数据 
app.use(express.urlencoded({ extended: false })); // req.body 

const cors =require("cors")
app.use(cors()) //利用从ors结局跨域问题

var session = require("express-session");   //导入引用session
app.use(session({
  name:"my-item",
  saveUninitialized:true,
  secret:"test",
  cookie:{maxAge:1000*60*60},  // session 保存时长  1hour 
  resave:false
}))

app.get("/index",(req,res)=>{
    res.json({
        code:200,
        msg:"ok"
    })
})

//自定义中间件 检查token
const {checkToken} =require("./utils/index")
app.use(checkToken)

//导入路由模块
const vueRouter =require("./vue");
app.use("/vue",vueRouter)




//导入数据库连接
const connection =require("./utils/connect")




server.listen(port,hostname,()=>{
    console.log(`my server is at http://${hostname}:${port}`)
})