const express = require("express");
const router = express.Router();


var {
    Move,
    Uid,
    Teacher,
    Student,
    Banji
} = require("./utils/schema");
//导入加密模块
const {aesEncrypt,keys}  = require("./utils/index.js");

router.get("/index", (req, res) => {
    res.json({
        msg: "这是vue  后台接口测试",
        status: true,
        code: 200,
        ss: 300
    })
})

//请求电影数据测试接口
router.get("/move", (req, res) => {
    var query = req.query;
    Move.find().sort({
        year: -1
    }).then((result) => {
        res.json({
            result,
            mgs: "数据请求成功",
            code: 200,
            query,
            status: true
        })
    })
})


//请求电影数据测试接口 axios
router.get("/move2", (req, res) => {
    var query = req.query;
    Move.find().sort({
        year: -1
    }).limit(10).then((result) => {
        res.json({
            result,
            mgs: "数据请求成功",
            code: 200,
            query,
            status: true
        })
    })
})

//请求电影数据测试接口 axios post请求
router.post("/move3", (req, res) => {
    var body = req.body;
    Move.find().sort({
        year: -1
    }).limit(10).then((result) => {
        res.json({
            result,
            mgs: "数据请求成功",
            code: 200,
            body,
            status: true
        })
    })
})

//  项目请求数据接口 -------------------------------
//  1、register 路由
router.post("/item/register", (req, res) => {

    var body = req.body;
    console.log(body)
    var flag = !!(body.type * 1);
    console.log(flag)

    flag ? insertData(Teacher, "teacher") : insertData(Student, "student");

    function insertData(coll, collName) {
        coll.findOne({
            phone: body.phone * 1,
        }).then(result => {
            if (result) {
                res.json({
                    msg: "账号或者手机号已经被注册,请重新注册",
                    code: 200,
                    flag: 0,
                    result: "注册失败"
                })
            } else {
                // 插入 
                Uid.updateOne({
                    name: collName
                }, {
                    $inc: {
                        id: 1
                    }
                }).then(result => {
                    Uid.findOne({
                        name: collName
                    }).then(result => {
                        body.sid = result.id;
                        body.flag = flag;
                        coll.insertMany(body).then(result => {
                            console.log(result)
                            res.json({
                                msg: "注册成功...",
                                code: 200,
                                flag: 1,
                                type:body.type,
                                result: ""
                            })
                        })
                    })
                })
            }
        })
    }


})

//  2、login 路由
router.post("/item/login", (req, res) => {
    var body = req.body;
    console.log(body);
    var flag = !!(body.type * 1)

    flag ? findData(Teacher) : findData(Student)
    

    function findData(coll) {
        coll.findOne({
            phone: body.phone * 1
        }).then((result) => {
            if (result) {
                if (result.password == body.password) {
                    req.session.phone = result.phone;
                    req.session.username = result.username;
                    req.session.flag = result.flag;
                    req.session.sid=result.sid;
                    req.session.token = aesEncrypt(body.phone, keys);
                    res.json({
                        msg: "登录成功",
                        code: 200,
                        flag: 1,
                        result,
                        type:body.type,
                        coll,
                        token:req.session.token
                    })
                } else {
                    res.json({
                        msg: "账号或密码错误",
                        code: 200,
                        flag: 0
                    })
                }
            } else {
                res.json({
                    msg: "账号不存在",
                    code: 200,
                    flag: 0
                })
            }

        })
    }


})

//3\ 学生页面 请求数据获取学生信息
router.get("/item/stu",(req,res)=>{
    var sid =req.session.sid;
    Student.findOne({
        sid
    }).then((result)=>{
        console.log(result)
        res.json({
            code:200,
            msg:"获取数据成功",
            result
        })
    })
})

//修改密码 接口
router.post("/item/changepwd",(req,res)=>{
    var body =req.body;
    var sid =req.session.sid;
    Student.findOne({
        sid
    }).then(result=>{
        console.log("old",body.oldValue)
        if(result.password==body.oldValue){
            Student.updateOne({
                sid
            },{
                $set:{
                    password:body.newValue
                }
            }).then(result=>{
                res.json({
                    code:200,
                    msg:"修改密码成功",
                    flag:1
                })
            })
        }else{
            res.json({
                code:200,
                msg:"原密码错误",
                flag:0
            })
        }
    })
})

//学生列表获取班级信息
router.get("/item/banjiinfo",(req,res)=>{
    Banji.find().then(result=>{
        res.json({
            code:200,
            msg:"班级获取成功",
            flag:1,
            result
        })
    })
})


module.exports = router;