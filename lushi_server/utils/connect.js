
const mongoose =require("mongoose");

const hostname="0.0.0.0";
const port=27017;
const dbName="wh1909";

const DB_CONN_STR=`mongodb://${hostname}:${port}/${dbName}`;

mongoose.connect(DB_CONN_STR,{useNewUrlParser:true,useUnifiedTopology:true});

const connection =mongoose.connection;

connection.on("connected",()=>{
    console.log("数据库连接成功")
});

connection.on('open',function () {    
    console.log('mongodb 已经链接 open 开启 ');  
}); 

connection.on('error',function (err) {    
    console.log('Mongoose connection 异常: ' + err);  
}); 

connection.on('disconnected',function () {    
    console.log('mongodb 断开链接  ');  
}); 

module.exports=connection;