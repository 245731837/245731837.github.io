const express = require("express");

const app = express();

const server = require("http").createServer(app);
const port = 1909;
const hostname = "0.0.0.0"

const cors =require("cors")
app.use(cors()) //利用从ors结局跨域问题

app.use(express.json()); //  得到 post请求的提交的 formData 数据 
app.use(express.urlencoded({ extended: false })); // req.body 

var session = require("express-session");   //导入引用session
app.use(session({
  name:"my-item",
  saveUninitialized:true,
  secret:"test",
  cookie:{maxAge:1000*60*60},  // session 保存时长  1hour 
  resave:false
}))

//自定义中间件 检查token
// const {checkToken} =require("./utils/index")
// app.use(checkToken)

const connection =require("./utils/connect")

app.get("/index", (req, res) => {
    res.send("success")
})

const vueRouter =require("./vue");
app.use("/vue",vueRouter)

const reactRouter =require("./react");
app.use("/react",reactRouter)





server.listen(port, hostname, () => {
    console.log(`my server is success on http://${hostname}:${port}}`)
})