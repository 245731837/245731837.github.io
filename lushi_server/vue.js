const express =require("express");
const router =express.Router()

var {
    Move,
    Uid,
    Teacher,
    Student,
    Banji,
    Code,
    Lushiusername,
    Lushicard,
    Kazus,
    Lushidingyues,
    newsonecommit
} = require("./utils/schema");

//导入加密模块
const {aesEncrypt,keys}  = require("./utils/index.js");


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
});

//注册接口
router.post("/register",(req,res)=>{
    body =req.body
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

//登录接口
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

//炉石项目  数据接口 ---------------------------
//获取验证码接口
router.get("/lushi/getcode",(req,res)=>{
    Code.findOne({
        id:req.query.codeNum*1
    }).then(result=>{
        req.session.codeNum =result.code
        console.log(req.session.codeNum)
        res.json({
            msg:result,
            code:200
        })
    })
})

//登录用户信息接口查询
router.post("/lushi/login",(req,res)=>{
    const body =req.body
    // console.log(body)
    // console.log(req.session.codeNum)
    if(req.session.codeNum == body.check){
        Lushiusername.findOne({
            phone:body.phone*1
        }).then(result=>{
            if(result){
                req.session.phone = result.phone;
                req.session.token = aesEncrypt(body.phone, keys);
                console.log(req.session.token)
                console.log("req.session.phone是",req.session.phone)
                res.json({
                    code:200,
                    msg:"登录成功",
                    flag:1,
                    token:req.session.token
                })
            }else{
                // console.log(result,33333333333333)
                Lushicard.updateOne({
                   type:"wanjia"
                },{
                    $inc:{
                        card:1
                    }
                }).then(result=>{
                    Lushiusername.insertMany({
                        phone:body.phone*1
                    }).then(result=>{
                        req.session.token = aesEncrypt(body.phone, keys);
                        console.log("req.session.token:",req.session.token)
                        req.session.phone = body.phone;
                        res.json({
                            code:200,
                            msg:"登录注册成功",
                            result,
                            flag:1,
                            token:req.session.token
                        })
                    })
                })
            }
        })
        // res.json({
        //     code:200,
        //     msg:"成功"
        // })
    }else{
        res.json({
            code:200,
            msg:"验证码错误",
            flag:0
        })
    }
    
})

//组页面接口数据
router.get("/lushi/cont",(req,res)=>{
    res.json({
        code:200,
        msg: [
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-12/1573525034280_mxinyy_.jpg",
                "author": "Box君译",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306443.html",
                "stime": "2019-11-12 09:34:25",
                "title": "15.6.2补丁上线：酒馆战棋平衡更新，熊妈妈惨遭削弱",
                "tips": "酒馆战棋明天开放！",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 113
                },
                "from": "炉石盒子原创",
                "id": 306443,
                "tag": ",344,249,",
                "time": "2019-11-12 10:15:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-12/1573525034280_mxinyy_.jpg",
                "timestamp": 1573524900
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-12/1573537148886_dq5qyb_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306450.html",
                "stime": "2019-11-12 13:39:09",
                "title": "新版本脑洞套路：一个无限连击32血，一个两回合结束游戏？",
                "tips": "新版本的一些臆想思路。",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 40
                },
                "from": "炉石盒子原创",
                "id": 306450,
                "tag": ",344,249,",
                "time": "2019-11-12 15:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-12/1573537148886_dq5qyb_.jpg",
                "timestamp": 1573542000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-12/1573536614914_gcpydw_.jpg",
                "author": "炉石老干妈",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306449.html",
                "stime": "2019-11-12 13:30:15",
                "title": "今日讨论：巨龙降临会成为有史以来最超模的扩展包吗？",
                "tips": "龙族等于超模？",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 53
                },
                "from": "网易大神",
                "id": 306449,
                "tag": ",344,249,",
                "time": "2019-11-12 14:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-12/1573536614914_gcpydw_.jpg",
                "timestamp": 1573538400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-12/1573535697813_rq9eu5_.jpg",
                "author": "天天卡牌",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306438.html",
                "stime": "2019-11-12 08:24:30",
                "title": "天天素材库#170：这也太大了",
                "tips": "本期看点：iGSword 这也太大了，LvGe 天生丽质难自细，异灵术 暴雪影业精品动画，姜神 脑瓜子嗡嗡的。",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "347"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 3
                },
                "from": "B站",
                "id": 306438,
                "tag": ",344,347,",
                "time": "2019-11-12 13:15:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-12/1573535697813_rq9eu5_.jpg",
                "timestamp": 1573535700
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-11/1573452510469_xotymb_1573452510464_k5sjfa.jpg",
                "author": "正则凌钧",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306425.html",
                "stime": "2019-11-11 14:08:31",
                "title": "职业DIY——大圣徒",
                "tips": "【职业DIY】大圣徒",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 28
                },
                "from": "营地炉石",
                "id": 306425,
                "tag": ",249,344,",
                "time": "2019-11-12 13:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-11/1573452510469_xotymb_1573452510464_k5sjfa.jpg",
                "timestamp": 1573534800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-12/1573533771101_nzv1dg_.jpg",
                "author": "炉边卡牌说",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306448.html",
                "stime": "2019-11-12 12:42:51",
                "title": "战棋酒馆4个新英雄抢先看，芬利铜须携手加盟",
                "tips": "4个新英雄即将上线",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 27
                },
                "from": "微博",
                "id": 306448,
                "tag": ",344,249,",
                "time": "2019-11-12 12:40:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-12/1573533771101_nzv1dg_.jpg",
                "timestamp": 1573533600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-12/1573524528124_i2bptd_.jpg",
                "author": "受害者协会",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306440.html",
                "stime": "2019-11-12 08:24:30",
                "title": "炉石受害者协会#105：没有炎魔解决不了的问题，如果有就多来两发！",
                "tips": "炉石受害者协会#105：没有炎魔解决不了的问题，如果有就多来两发！",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 1
                },
                "from": "B战poi—肥猫丸与HS官方代理",
                "id": 306440,
                "tag": ",344,349,",
                "time": "2019-11-12 12:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-12/1573524528124_i2bptd_.jpg",
                "timestamp": 1573531200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-11/1573449841294_2netj6_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306417.html",
                "stime": "2019-11-11 08:25:47",
                "title": "啦神自走棋的理财思路 剧本都很完美 可惜就是手残",
                "tips": "啦神自走棋的理财思路 剧本都很完美 可惜就是手残",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 49
                },
                "from": "网络",
                "id": 306417,
                "tag": ",344,349,",
                "time": "2019-11-11 15:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-11/1573449841294_2netj6_.jpg",
                "timestamp": 1573455600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-11/1573453449414_wngiid_.jpg",
                "author": "炉石老干妈",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306427.html",
                "stime": "2019-11-11 14:24:09",
                "title": "今日讨论：双十一除了购物，当然还得交朋友脱单啦！",
                "tips": "11.11尝试脱单。",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 120
                },
                "from": "网易大神",
                "id": 306427,
                "tag": ",344,249,",
                "time": "2019-11-11 14:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-11/1573453449414_wngiid_.jpg",
                "timestamp": 1573453800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-11/1573453923904_e0e0fx_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306428.html",
                "stime": "2019-11-11 14:32:04",
                "title": "人气主播带你揭晓“巨龙降临”新卡",
                "tips": "中国地区社区卡牌发布时间表。",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 74
                },
                "from": "炉石传说",
                "id": 306428,
                "tag": ",344,249,",
                "time": "2019-11-11 14:28:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-11/1573453923904_e0e0fx_.jpg",
                "timestamp": 1573453680
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573396591825_yqqbyo_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306412.html",
                "stime": "2019-11-10 22:36:32",
                "title": "飞狐夜吹\"父子局\"再现，王师傅上榜ID惨遭屏蔽？",
                "tips": "京城五爷~",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 22
                },
                "from": "网易大神",
                "id": 306412,
                "tag": ",344,249,",
                "time": "2019-11-11 13:13:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573396591825_yqqbyo_.jpg",
                "timestamp": 1573449180
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573396188903_j20qhk_.jpg",
                "author": "天天卡牌",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306387.html",
                "stime": "2019-11-10 10:04:12",
                "title": "天天白话#05：现在，你们又有手机了吗？",
                "tips": "天天白话第5期。",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "347"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 7
                },
                "from": "B站",
                "id": 306387,
                "tag": ",344,347,",
                "time": "2019-11-11 12:12:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573396188903_j20qhk_.jpg",
                "timestamp": 1573445520
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-08/1573228595445_9ysuyq_.jpg",
                "author": "极地光斑",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306371.html",
                "stime": "2019-11-08 23:56:36",
                "title": "昔日战将天启骑，今日出山威撼狂野",
                "tips": "月初传说狂野天启骑",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 63
                },
                "from": "炉石盒子原创",
                "id": 306371,
                "tag": ",,344,249,",
                "time": "2019-11-11 11:11:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-08/1573228595445_9ysuyq_.jpg",
                "timestamp": 1573441860
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573382607309_qprck4_.jpg",
                "author": "阿里Alee",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306409.html",
                "stime": "2019-11-10 18:43:27",
                "title": "“炉石自走棋”究竟有多香？酒馆战棋模式深度评测",
                "tips": "这不是一篇自走棋攻略，只是评测（正经脸）",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 73
                },
                "from": "网易大神",
                "id": 306409,
                "tag": ",344,249,",
                "time": "2019-11-11 11:11:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573382607309_qprck4_.jpg",
                "timestamp": 1573441860
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573366048319_lu0vfu_1573366048312_sj1zri.jpg",
                "author": "孤月独影",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306395.html",
                "stime": "2019-11-10 14:07:28",
                "title": "五色巨龙的起源与上古之战",
                "tips": "五色巨龙的起源与上古之战",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 31
                },
                "from": "掌游宝-资讯",
                "id": 306395,
                "tag": ",249,344,",
                "time": "2019-11-11 10:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573366048319_lu0vfu_1573366048312_sj1zri.jpg",
                "timestamp": 1573437600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573395596814_c6vjnq_.jpg",
                "author": "瓦莉拉",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306411.html",
                "stime": "2019-11-10 22:19:57",
                "title": "瓦莉拉手把手教你酒馆战棋吃鸡上分",
                "tips": "瓦莉拉的教学！",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 79
                },
                "from": "网易大神",
                "id": 306411,
                "tag": ",344,249,",
                "time": "2019-11-10 22:13:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573395596814_c6vjnq_.jpg",
                "timestamp": 1573395180
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573377361310_o5ucb6_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306405.html",
                "stime": "2019-11-10 17:16:01",
                "title": "炉石最强大属性羁绊是谁？",
                "tips": "炉石传说之中的龙族。",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 80
                },
                "from": "炉石盒子原创",
                "id": 306405,
                "tag": ",344,249,",
                "time": "2019-11-10 18:15:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573377361310_o5ucb6_.jpg",
                "timestamp": 1573380900
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573376816419_bfptow_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306404.html",
                "stime": "2019-11-10 17:06:56",
                "title": "三星大师制作英雄分级表格，托奇是唯一S级！",
                "tips": "战棋酒馆英雄强度。",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 104
                },
                "from": "网易大神",
                "id": 306404,
                "tag": ",344,249,",
                "time": "2019-11-10 17:45:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573376816419_bfptow_.jpg",
                "timestamp": 1573379100
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573376424646_ehinaj_.jpg",
                "author": "炉边聚会",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306403.html",
                "stime": "2019-11-10 17:00:25",
                "title": "独立 骄傲 闪耀：无数个狮酱正在努力",
                "tips": "炉石传说的女玩家们。",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 29
                },
                "from": "网易大神",
                "id": 306403,
                "tag": ",344,249,",
                "time": "2019-11-10 17:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573376424646_ehinaj_.jpg",
                "timestamp": 1573378200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-10/1573375157736_l3cmwa_.jpg",
                "author": "造物者丨止戈",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306401.html",
                "stime": "2019-11-10 16:39:18",
                "title": "从懵懂无知到老谋深算，酒馆战棋大型攻略（二）",
                "tips": "应该是第二期了吧。",
                "content": "",
                "tags": "快讯,最新",
                "tagSet": [
                    "344",
                    "249"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 33
                },
                "from": "网易大神",
                "id": 306401,
                "tag": ",344,249,",
                "time": "2019-11-10 17:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-10/1573375157736_l3cmwa_.jpg",
                "timestamp": 1573376400
            }
        ]
    })
})

//广场数据接口
router.get("/lushi/guangchang",(req,res)=>{
    res.json({
        code:200,
        msg:[
            {
                "id": 1347685,
                "uid": 8431330,
                "liked": 0,
                "nickname": "月下",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "j6BpA4gCk+sEy9bEL75Cmg==",
                "title": "炉石盒子默认话题",
                "createtime": 1573557706,
                "deleted": 0,
                "hot": 86250,
                "content": "不是，我就不懂了，像“炉石老干妈”这样的人也能在盒子水文章？毫无营养价值的大水比",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 13,
                "hot_count": 0,
                "comment_count": 20,
                "topic_type": 1,
                "latest_reply": 1573566447,
                "avatar": "http://ok.166.net/lushi-app/user/2019-10-18/1571363992924_ddydzc.jpg",
                "multi-media": "{\"image\":[]}"
            },
            {
                "id": 1347604,
                "uid": 6561256,
                "liked": 0,
                "nickname": "风间琉璃",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "2u8Gbxp4qXkP/Dje57YFXg==",
                "title": "炉石盒子默认话题",
                "createtime": 1573546393,
                "deleted": 0,
                "hot": 85891,
                "content": "任务做完不就没牌了嘛？/萨满脸",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 6,
                "hot_count": 0,
                "comment_count": 30,
                "topic_type": 1,
                "latest_reply": 1573566553,
                "avatar": "http://ok.166.net/lushi-app/user/2018-10-18/1539866874051_tfct2g.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573546392212_tzduog.jpg\"}]}"
            },
            {
                "id": 1347706,
                "uid": 9449496,
                "liked": 0,
                "nickname": "Iroquois",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "lfuLekQjQFm1Zfzkq/hybQ==",
                "title": "炉石盒子默认话题",
                "createtime": 1573560574,
                "deleted": 0,
                "hot": 82753,
                "content": "我一不小心合了张金色传说怎么办，3200尘，哭哭，有人有经历的没有/猎人脸",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 0,
                "hot_count": 0,
                "comment_count": 11,
                "topic_type": 1,
                "latest_reply": 1573566650,
                "avatar": "http://ok.166.net/lushi-app/user/2019-08-20/1566260001377_kb2zr0.jpg",
                "multi-media": "{\"image\":[]}"
            },
            {
                "id": 1347525,
                "uid": 4884976,
                "liked": 0,
                "nickname": "迅捷鱼",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "kpf7VTqANL6Hi5FGabSiaw==",
                "title": "炉石盒子默认话题",
                "createtime": 1573534168,
                "deleted": 0,
                "hot": 82231,
                "content": "z非要培养亲中人士的话我觉得可以在僵建几所尼 哥大学， 产主分配制，早上读书下午种田训练，把他们集中起来。这样就不会碰我们的妹子票子还有高校学位了，这可比他们原来的生活好对多了让他们回去好好传播 产主 ，请他们来大城市里浪什么？他们带来的滋会毁了我们民 的繁 育拳。中国地大物博，可有些东西是很珍贵的，妹子和学位奖学金。西北的地倒是挺多的，尼 哥戍边，尼 哥维 稳队不用呛就能把僵 读们压的四四的，僵读都哭了。编入社会 义外籍团。服 役满四年毕业发个毕业证送回非洲，改造红色非洲。\n 说提高大学化排名的，你是不需要高考吗？占了那么多教育资 源。",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 12,
                "hot_count": 0,
                "comment_count": 63,
                "topic_type": 1,
                "latest_reply": 1573565564,
                "avatar": "http://ok.166.net/lushi-app/user/2019-02-03/1549190981645_yurddg.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573534167249_8rvarz.jpg\"}]}"
            },
            {
                "id": 1347667,
                "uid": 9592295,
                "liked": 0,
                "nickname": "公良映影",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "QQalTO3eqB1PaMDPVzzHuA==",
                "title": "炉石盒子默认话题",
                "createtime": 1573555504,
                "deleted": 0,
                "hot": 77815,
                "content": "不懂就问：去淘宝代练金币是付完款后直接把账号密码发过去吗? 代练期间能不能登号。(^_^)v",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 3,
                "hot_count": 0,
                "comment_count": 15,
                "topic_type": 1,
                "latest_reply": 1573564353,
                "avatar": "http://ok.166.net/lushi-app/user/2018-08-04/1533347632587_4vudew.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573555502923_ai3eqa.jpg\"}]}"
            },
            {
                "id": 1347659,
                "uid": 8042109,
                "liked": 0,
                "nickname": "蕾姆酱＃5042欢迎py",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "GTs6PMmEQsc6zEWfs/qG2Q==",
                "title": "炉石盒子默认话题",
                "createtime": 1573553523,
                "deleted": 0,
                "hot": 77680,
                "content": "今天标准20投了一小时。。怎么说呢。。。有些人就是后手不投。发谢谢也没用。。我刚刚看了下规则。要带什么卡背吗？给我嗦嗦",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 2,
                "hot_count": 0,
                "comment_count": 15,
                "topic_type": 1,
                "latest_reply": 1573565716,
                "avatar": "http://ok.166.net/lushi-app/user/2019-07-10/1562728209681_gwplkz.jpg",
                "multi-media": "{\"image\":[]}"
            },
            {
                "id": 1347587,
                "uid": 8042109,
                "liked": 0,
                "nickname": "蕾姆酱＃5042欢迎py",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "9XlgtykT3P/+4zhz01p4Yw==",
                "title": "炉石盒子默认话题",
                "createtime": 1573543784,
                "deleted": 0,
                "hot": 74621,
                "content": "炉黑不请自来。不给扭给个佛丁?",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 6,
                "hot_count": 0,
                "comment_count": 32,
                "topic_type": 1,
                "latest_reply": 1573563164,
                "avatar": "http://ok.166.net/lushi-app/user/2018-09-20/1537415168442_cfxcyn.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573543781792_mnlxzw.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573543781796_ujzyoc.jpg\"}]}"
            },
            {
                "id": 1347709,
                "uid": 6348897,
                "liked": 0,
                "nickname": "果冻只吃喜之郎",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "yjv1Diy2yDjekySgCGBU6g==",
                "title": "炉石盒子默认话题",
                "createtime": 1573561157,
                "deleted": 0,
                "hot": 71206,
                "content": "拿不拿，在线等，挺急的/泰兰德",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 1,
                "hot_count": 0,
                "comment_count": 3,
                "topic_type": 1,
                "latest_reply": 1573561733,
                "avatar": "http://ok.166.net/lushi-app/user/2019-05-28/1558987381836_NW7AGb.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573561156044_iduuga.jpg\"}]}"
            },
            {
                "id": 1347662,
                "uid": 7262634,
                "liked": 0,
                "nickname": "亲＾3＾",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "eu8H4ufxueCBzGyaC3Fzkg==",
                "title": "炉石盒子默认话题",
                "createtime": 1573554524,
                "deleted": 0,
                "hot": 70659,
                "content": "九职业你最喜欢哪个，我先来，瓦莉拉",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 3,
                "hot_count": 0,
                "comment_count": 15,
                "topic_type": 1,
                "latest_reply": 1573565315,
                "avatar": "http://ok.166.net/lushi-app/user/2018-08-19/1534684603641_gd5lcz.jpg",
                "multi-media": "{\"image\":[]}"
            },
            {
                "id": 1347654,
                "uid": 6700983,
                "liked": 0,
                "nickname": "咖啡",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "8GYhSfVmJHG6LuoCJCTLLA==",
                "title": "炉石盒子默认话题",
                "createtime": 1573552915,
                "deleted": 0,
                "hot": 68870,
                "content": "我把其他八个职业的卡分完了，只剩法师，然而宇宙法被摁着打，从六级打到十级。这可咋整？？？退游吗/圣骑脸",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 1,
                "hot_count": 0,
                "comment_count": 15,
                "topic_type": 1,
                "latest_reply": 1573566636,
                "avatar": "http://ok.166.net/lushi-app/user/2019-05-27/1558941863190_vuymyd.jpg",
                "multi-media": "{\"image\":[]}"
            },
            {
                "id": 1347675,
                "uid": 9546131,
                "liked": 0,
                "nickname": "lucas",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "7xr6RYT1kipaVPwOX1gxqQ==",
                "title": "炉石盒子默认话题",
                "createtime": 1573557060,
                "deleted": 0,
                "hot": 68750,
                "content": "萌新才开始玩这个游戏，大佬留下你们的ID 我加你们观战学习/猎人脸",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 0,
                "hot_count": 0,
                "comment_count": 11,
                "topic_type": 1,
                "latest_reply": 1573563940,
                "avatar": "http://ok.166.net/lushi-app/user/2019-01-03/1546476582664_ctgfsq.jpg",
                "multi-media": "{\"image\":[]}"
            },
            {
                "id": 1347664,
                "uid": 7049493,
                "liked": 0,
                "nickname": "哈里森·穷吊丝",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "yn8d/z0pWIIdaohz8LZSjg==",
                "title": "炉石盒子默认话题",
                "createtime": 1573554874,
                "deleted": 0,
                "hot": 64594,
                "content": "这DIY作者也太优秀了吧，哈哈哈，这亵渎她不香吗",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 10,
                "hot_count": 0,
                "comment_count": 7,
                "topic_type": 1,
                "latest_reply": 1573565063,
                "avatar": "http://ok.166.net/lushi-app/user/2019-01-16/1547601346396_p7iynb.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573554870789_7lgo7z.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573554870819_u2hcxy.jpg\"}]}"
            },
            {
                "id": 1347601,
                "uid": 7837672,
                "liked": 0,
                "nickname": "弑君推销员",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "ehw/HIznzCOF+LxpnI4DHg==",
                "title": "炉石盒子默认话题",
                "createtime": 1573545865,
                "deleted": 0,
                "hot": 62094,
                "content": "什么年代了还有弃牌术 不知道主流卡组是弑君贼吗",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 3,
                "hot_count": 0,
                "comment_count": 20,
                "topic_type": 1,
                "latest_reply": 1573562941,
                "avatar": "http://ok.166.net/gameyw-lushi/battle_web_avatar_20180106_87744872-f2e0-11e7-84df-525400074783",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573545863144_captjp.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573545863161_vker10.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573545863157_eblla5.jpg\"}]}"
            },
            {
                "id": 1347712,
                "uid": 6559371,
                "liked": 0,
                "nickname": "璇玑",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "f6Px70XURF8H+C/dyrBqJw==",
                "title": "友谊赛交流",
                "createtime": 1573561749,
                "deleted": 0,
                "hot": 59659,
                "content": "友谊赛互换，在线等，你先，直接加好友 芒果味的#5537",
                "topic_id": 46828,
                "share_count": 0,
                "like_count": 0,
                "hot_count": 0,
                "comment_count": 4,
                "topic_type": 1,
                "latest_reply": 1573562387,
                "avatar": "http://ok.166.net/lushi-app/user/2019-11-01/1572563941687_iaujf2.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573561747831_habf2q.jpg\"}]}"
            },
            {
                "id": 1347661,
                "uid": 7960795,
                "liked": 0,
                "nickname": "你好召唤师",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "RsQGJQLHKCztTvvYsNryeg==",
                "title": "炉石盒子默认话题",
                "createtime": 1573554241,
                "deleted": 0,
                "hot": 58137,
                "content": "",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 7,
                "hot_count": 0,
                "comment_count": 5,
                "topic_type": 1,
                "latest_reply": 1573559084,
                "avatar": "http://ok.166.net/lushi-app/user/2019-05-01/1556696690847_hbx16o.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573554239847_unpcde.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573554239868_8ohq6l.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573554239867_18g1ld.jpg\"}]}"
            },
            {
                "id": 1347606,
                "uid": 6694569,
                "liked": 0,
                "nickname": "我只爱吃橘子",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "a2CCwo8I5J09FRBQj7Z09w==",
                "title": "炉石盒子默认话题",
                "createtime": 1573546818,
                "deleted": 0,
                "hot": 54534,
                "content": "45包3橙卡？退游了",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 1,
                "hot_count": 0,
                "comment_count": 25,
                "topic_type": 1,
                "latest_reply": 1573566926,
                "avatar": "http://ok.166.net/lushi-app/user/2019-09-04/1567581095227_hk8cqs.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573546811151_vym52d.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573546811158_zoyvfq.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573546811158_mezdr5.jpg\"}]}"
            },
            {
                "id": 1347552,
                "uid": 8231526,
                "liked": 0,
                "nickname": "沫沫",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "XoJJiQPAqNbd2RFPCBAhdQ==",
                "title": "炉石盒子默认话题",
                "createtime": 1573537336,
                "deleted": 0,
                "hot": 52563,
                "content": "现在还有标准20互投吗/萨满脸",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 4,
                "hot_count": 0,
                "comment_count": 32,
                "topic_type": 1,
                "latest_reply": 1573563499,
                "avatar": "http://ok.166.net/lushi-app/user/2019-10-12/1570842211401_fwtjib.jpg",
                "multi-media": "{\"image\":[]}"
            },
            {
                "id": 1347644,
                "uid": 4176009,
                "liked": 0,
                "nickname": "御坂初琴《炉石瞎想》作者",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "mRLN6vSTGmMklljv8JXagA==",
                "title": "炉石盒子默认话题",
                "createtime": 1573551339,
                "deleted": 0,
                "hot": 52391,
                "content": "刚才思考了一下，先手谢谢后手硬币投这个制度是有问题的。\n因为，一般先手谢谢，则先手会直接结束第一回合。后手如果硬币下怪抢节奏，就会直接丧失第一回合的节奏，连反抗的机会都没有了。\n所以完善的版本应该是：\n1.统一卡背\n2.后手谢谢先手投\n3.准备一套快攻上分卡组\n这样，先手如果是互投玩家，看到后手发谢谢就会直接投而不会下怪。如果先手下怪，说明他不是互投玩家，就可以直接后手反击，把对面打死。这样就能做到：\n遇到互投玩家就互投，遇不到就打死他得到胜场的优秀操作。",
                "topic_id": 32808,
                "share_count": 0,
                "like_count": 1,
                "hot_count": 0,
                "comment_count": 14,
                "topic_type": 1,
                "latest_reply": 1573566700,
                "avatar": "http://ok.166.net/lushi-app/user/2019-11-09/1573256152004_w20hvv.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573551338278_gxhnqe.jpg\"}]}"
            },
            {
                "id": 1347705,
                "uid": 8094825,
                "liked": 0,
                "nickname": "无毒不丈夫",
                "my": false,
                "platform": 1,
                "topicPostDetailId": "pAuaaR4MRJAxBwsxzLS/jA==",
                "title": "友谊赛交流",
                "createtime": 1573560550,
                "deleted": 0,
                "hot": 51961,
                "content": "我还有友谊赛，回换啦，我动态都是友谊赛，你先，id发楼下，在线等你",
                "topic_id": 46828,
                "share_count": 0,
                "like_count": 0,
                "hot_count": 0,
                "comment_count": 3,
                "topic_type": 1,
                "latest_reply": 1573560729,
                "avatar": "http://ok.166.net/lushi-app/user/2019-09-18/1568812030552_1e0ake.jpg",
                "multi-media": "{\"image\":[{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573560548799_iqzrxs.jpg\"},{\"url\":\"http:\\/\\/ok.166.net\\/lushi-app\\/user\\/2019-11-12\\/1573560548800_c7hpof.jpg\"}]}"
            }
        ],
        flag:1
    })
})

//卡住 数据 接口
router.get("/lushi/kazu",(req,res)=>{
    res.json({
        code:200,
        mgs:[
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-02/1572661272339_wj18th_.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/306177.html",
                "stime": "2019-11-02 10:18:55",
                "videoId": "",
                "title": "巨龙降临",
                "type": "专题",
                "content": "",
                "tips": "现在，这段史诗级的故事将迎来结局。是时候……让巨龙登场了。",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "炉石盒子原创",
                "id": 306177,
                "tag": ",359,",
                "timestamp": 1667269080,
                "author": "Box",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/lushi-app/post/2019-11-03/1572758987958_ljla1z_.jpg",
                "time": "2022-11-01 10:18:00",
                "category": "攻略",
                "img2": "http://ok.166.net/lushi-app/post/2019-11-03/1572758987958_ljla1z_.jpg",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-02/1572661272339_wj18th_.jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-06/1573022392383_obmuli_.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/306298.html",
                "stime": "2019-11-06 14:39:53",
                "videoId": "",
                "title": "酒馆战棋",
                "type": "专题",
                "content": "",
                "tips": "购买了“巨龙降临”预购合集或持有暴雪嘉年华虚拟门票的玩家可以抢先体验这个全新的游戏模式！",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "炉石盒子",
                "id": 306298,
                "tag": ",344,",
                "timestamp": 1604644560,
                "author": "Box君",
                "banner": "0",
                "keyWord": "",
                "tags": "最新",
                "tagSort": "最新",
                "banner_img": "http://ok.166.net/lushi-app/post/2019-11-06/1573022392605_ovlrzi_.jpg",
                "time": "2020-11-06 14:36:00",
                "category": "攻略",
                "img2": "http://ok.166.net/lushi-app/post/2019-11-06/1573022392605_ovlrzi_.jpg",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-06/1573022392383_obmuli_.jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-02/1562070657278_igff5a_.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/302809.html",
                "stime": "2019-07-02 20:30:58",
                "videoId": "",
                "title": "奥丹姆奇兵",
                "type": "专题",
                "content": "",
                "tips": "将漂浮的魔法之城达拉然收入囊中之后，至尊盗王拉法姆和臭名昭著的恶徒们启程前往南方的奥丹姆——这片土地上满是隐秘的财宝、灾祸、木乃伊和动乱！",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "炉石盒子原创",
                "id": 302809,
                "tag": ",359,",
                "timestamp": 1562070300,
                "author": "Box",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/lushi-app/post/2019-07-02/1562070657538_ma1oag_.jpg",
                "time": "2019-07-02 20:25:00",
                "category": "攻略",
                "img2": "http://ok.166.net/lushi-app/post/2019-07-02/1562070657538_ma1oag_.jpg",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-02/1562070657278_igff5a_.jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-09-04/1536049763393_rprhr5_.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/293173.html",
                "stime": "2018-09-04 16:29:24",
                "videoId": "",
                "title": "网易大神",
                "type": "专题",
                "content": "",
                "tips": "最专业、最好玩的游戏社区，欢迎关注网易大神炉石区！",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "网易大神",
                "id": 293173,
                "tag": ",359,",
                "timestamp": 1472977560,
                "author": "网易大神",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/lushi-app/post/2018-09-04/1536049763665_eskeqz_.jpg",
                "time": "2016-09-04 16:26:00",
                "category": "攻略",
                "img2": "http://ok.166.net/lushi-app/post/2018-09-04/1536049763665_eskeqz_.jpg",
                "img1": "http://ok.166.net/lushi-app/post/2018-09-04/1536049763393_rprhr5_.jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/gameyw-gbox/2017-07-19/negs_cms/1500475805653_zqxqec..jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/255780.html",
                "stime": "2017-07-19 22:50:06",
                "videoId": "",
                "title": "炉石乱斗大集合",
                "type": "专题",
                "content": "",
                "tips": "每周一卡包，乱斗验非欧",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "网易游戏论坛",
                "id": 255780,
                "tag": ",359,",
                "timestamp": 1468939500,
                "author": "Box",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-23/1508730050241_xhmb1p.jpg",
                "time": "2016-07-19 22:45:00",
                "category": "攻略",
                "img2": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-23/1508730050241_xhmb1p.jpg",
                "img1": "http://ok.166.net/gameyw-gbox/2017-07-19/negs_cms/1500475805653_zqxqec..jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/gameyw-gbox/2017-07-19/negs_cms/1500473336078_2bhfjd..jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/255772.html",
                "stime": "2017-07-19 22:08:56",
                "videoId": "",
                "title": "蓝帖",
                "type": "专题",
                "content": "",
                "tips": "官方公告、设计师爆料汇总",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "网易游戏论坛",
                "id": 255772,
                "tag": ",359,",
                "timestamp": 1468937040,
                "author": "Box",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/lushi-app/post/2018-04-28/1524914715691_ectj3r_.jpg",
                "time": "2016-07-19 22:04:00",
                "category": "攻略",
                "img2": "http://ok.166.net/lushi-app/post/2018-04-28/1524914715691_ectj3r_.jpg",
                "img1": "http://ok.166.net/gameyw-gbox/2017-07-19/negs_cms/1500473336078_2bhfjd..jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-17/1558028124198_fspcws_.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/263385.html",
                "stime": "2017-08-15 13:33:54",
                "videoId": "",
                "title": "冒险模式",
                "type": "专题",
                "content": "",
                "tips": "速通攻略、花絮彩蛋",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "炉石盒子",
                "id": 263385,
                "tag": ",359,",
                "timestamp": 1439649600,
                "author": "Box",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/lushi-app/post/2019-05-17/1558028287851_qmhjfn_.jpg",
                "time": "2015-08-15 22:40:00",
                "category": "攻略",
                "img2": "http://ok.166.net/lushi-app/post/2019-05-17/1558028287851_qmhjfn_.jpg",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-17/1558028124198_fspcws_.jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/gameyw-gbox/2017-07-20/negs_cms/1500536042317_ttcgwk..jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/255831.html",
                "stime": "2017-07-20 15:34:03",
                "videoId": "",
                "title": "福利活动",
                "type": "专题",
                "content": "",
                "tips": "所有炉石盒子的福利活动都在这里",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "网易游戏论坛",
                "id": 255831,
                "tag": ",359,",
                "timestamp": 1437377160,
                "author": "Box",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-23/1508736246030_ksocdx.jpg",
                "time": "2015-07-20 15:26:00",
                "category": "攻略",
                "img2": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-23/1508736246030_ksocdx.jpg",
                "img1": "http://ok.166.net/gameyw-gbox/2017-07-20/negs_cms/1500536042317_ttcgwk..jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-12-09/1512813493243_ddcloj.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/281618.html",
                "stime": "2017-12-09 17:58:13",
                "videoId": "",
                "title": " 萌新入坑指南",
                "type": "专题",
                "tips": "萌新入坑第一手攻略！",
                "content": null,
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "炉石盒子原创",
                "id": 281618,
                "tag": ",359,",
                "timestamp": 1420797300,
                "author": "Box",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-12-10/1512895971245_vikw8l.jpg",
                "time": "2015-01-09 17:55:00",
                "category": "攻略",
                "img2": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-12-10/1512895971245_vikw8l.jpg",
                "img1": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-12-09/1512813493243_ddcloj.jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-25/1508929513029_gdst9t.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/255776.html",
                "stime": "2017-07-19 22:30:34",
                "videoId": "",
                "title": "天天卡牌",
                "type": "专题",
                "content": "",
                "tips": "国内人气炉石视频",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "网易游戏论坛",
                "id": 255776,
                "tag": ",359,",
                "timestamp": 1401114360,
                "author": "天天卡牌",
                "banner": "0",
                "keyWord": "",
                "tags": "专栏",
                "tagSort": "专栏",
                "banner_img": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-23/1508731229093_eesqlu.jpg",
                "time": "2014-05-26 22:26:00",
                "category": "攻略",
                "img2": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-23/1508731229093_eesqlu.jpg",
                "img1": "http://ok.166.net/gameyw-lushi/gameyw-lushi/2017-10-25/1508929513029_gdst9t.jpg"
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-08-08/1533729605444_dmwify_.jpg",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/fetch_news/292049.html",
                "stime": "2018-08-08 20:00:06",
                "videoId": "",
                "title": "主播都在玩",
                "type": "专题",
                "content": "",
                "tips": "“砰砰计划”主播卡组合集！",
                "listStyle": "普通",
                "top": 50,
                "videoUrl": "",
                "from": "炉石盒子原创",
                "id": 292049,
                "tag": ",344,249,",
                "timestamp": 1281268620,
                "author": "时代唐门",
                "banner": "0",
                "keyWord": "",
                "tags": "快讯,最新",
                "tagSort": "快讯,最新",
                "banner_img": "http://ok.166.net/lushi-app/post/2018-08-08/1533729605631_mzpjow_.jpg",
                "time": "2010-08-08 19:57:00",
                "category": "专题",
                "img2": "http://ok.166.net/lushi-app/post/2018-08-08/1533729605631_mzpjow_.jpg",
                "img1": "http://ok.166.net/lushi-app/post/2018-08-08/1533729605444_dmwify_.jpg"
            }
        ],
        flag:1
    })
})

//卡组2 数据 接口
router.get("/lushi/kazu2",(req,res)=>{
    res.json({
        code:200,
        msg:[
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-08/1573151988298_eqh21i_.jpg",
                "author": "炉石徐凤年",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306343.html",
                "stime": "2019-11-08 02:39:48",
                "title": "苏宁狮王争霸S2城市赛冠军卡组合集",
                "tips": "16组搭配助你在KOF2中力压群雄。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 17
                },
                "from": "网易大神",
                "id": 306343,
                "tag": ",344,249,348,",
                "time": "2019-11-08 11:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-08/1573151988298_eqh21i_.jpg",
                "timestamp": 1573183800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-03/1572774384163_boht9b_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306222.html",
                "stime": "2019-11-03 17:46:24",
                "title": "狂野回归最强5张卡，4张是中立只有1张职业卡！",
                "tips": "老生常谈幸听之。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 37
                },
                "from": "炉石盒子原创",
                "id": 306222,
                "tag": ",344,249,348,",
                "time": "2019-11-03 17:45:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-03/1572774384163_boht9b_.jpg",
                "timestamp": 1572774300
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-02/1572684691737_ouulk6_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306188.html",
                "stime": "2019-11-02 16:51:32",
                "title": "结算bug并不影响大神发挥，外服结算高分段卡组分享",
                "tips": "月末结算，大神卡组分享。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 55
                },
                "from": "网易大神",
                "id": 306188,
                "tag": ",344,249,348,",
                "time": "2019-11-02 16:55:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-02/1572684691737_ouulk6_.jpg",
                "timestamp": 1572684900
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-01/1572605599644_xh98hp_.jpg",
                "author": "欧洲鲶鱼",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306080.html",
                "stime": "2019-11-01 18:53:20",
                "title": "欢乐加倍，周五快乐卡组推荐",
                "tips": "周五快乐卡组。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 34
                },
                "from": "炉石盒子原创",
                "id": 306080,
                "tag": ",344,249,348,",
                "time": "2019-11-01 18:45:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-01/1572605599644_xh98hp_.jpg",
                "timestamp": 1572605100
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-01/1572603135348_7qa3ul_.jpg",
                "author": "永恒艾zhen ",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306072.html",
                "stime": "2019-11-01 18:12:16",
                "title": "最前线狂野月报#3.1",
                "tips": "最前线&雾都战队狂野月报#3.1[咔嚓咔嚓]",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 96
                },
                "from": "NGA",
                "id": 306072,
                "tag": ",344,249,348,",
                "time": "2019-11-01 18:06:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-01/1572603135348_7qa3ul_.jpg",
                "timestamp": 1572602760
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-01/1572545775071_j27vk5_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306056.html",
                "stime": "2019-11-01 02:16:15",
                "title": "每周最卡组#06：恶名昭著的铺场萨胜率登顶",
                "tips": "屠龙少年终成恶龙，恶名昭著的铺场萨胜率登顶。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 62
                },
                "from": "网易大神",
                "id": 306056,
                "tag": ",344,249,348,",
                "time": "2019-11-01 10:10:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-01/1572545775071_j27vk5_.jpg",
                "timestamp": 1572574200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-31/1572500017549_laivum_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306043.html",
                "stime": "2019-10-31 13:33:38",
                "title": "冰冻结束一切，吉安娜也玩起了克苏恩体系！",
                "tips": "法师也能机械克苏恩。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 75
                },
                "from": "炉石盒子原创",
                "id": 306043,
                "tag": ",344,249,348,",
                "time": "2019-10-31 18:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-31/1572500017549_laivum_.jpg",
                "timestamp": 1572516000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-30/1572444429810_xr4agd_.jpg",
                "author": "极地光斑",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306032.html",
                "stime": "2019-10-30 22:07:10",
                "title": "老当益壮不负当年风采，文艺复兴宇宙术再现江湖",
                "tips": "新版本狂野60%胜率复古宇宙术攻略。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 29
                },
                "from": "炉石盒子原创",
                "id": 306032,
                "tag": ",344,249,348,",
                "time": "2019-10-31 12:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-30/1572444429810_xr4agd_.jpg",
                "timestamp": 1572494400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-30/1572418582391_e45ajb_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306022.html",
                "stime": "2019-10-30 14:56:22",
                "title": "月影非主流大厨牧强势登顶，卡组迅速在外服传遍！",
                "tips": "登顶卡组，又是牧师？",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 71
                },
                "from": "网易大神",
                "id": 306022,
                "tag": ",344,249,348,",
                "time": "2019-10-30 16:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-30/1572418582391_e45ajb_.jpg",
                "timestamp": 1572424200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-30/1572417987680_xjojsg_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306020.html",
                "stime": "2019-10-30 14:46:28",
                "title": "嘉年华总决赛卡组公布，为国手加油助威",
                "tips": "炉石传说世界总局总决赛拉开帷幕。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 43
                },
                "from": "网易大神",
                "id": 306020,
                "tag": ",344,249,348,",
                "time": "2019-10-30 15:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-30/1572417987680_xjojsg_.jpg",
                "timestamp": 1572418800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-29/1572335874497_ibkfks_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305997.html",
                "stime": "2019-10-29 15:57:55",
                "title": "主播都在玩#221：姜神姐夫拍腮防战",
                "tips": "主播都在玩第221期。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 51
                },
                "from": "网易大神",
                "id": 305997,
                "tag": ",344,249,348,",
                "time": "2019-10-29 18:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-29/1572335874497_ibkfks_.jpg",
                "timestamp": 1572343200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-29/1572335252486_q9ucfg_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305996.html",
                "stime": "2019-10-29 15:47:33",
                "title": "标准被萨满搞烦了？来看看狂野知名主播在玩的卡组吧！",
                "tips": "狂野模式卡组推荐。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 91
                },
                "from": "网易大神",
                "id": 305996,
                "tag": ",344,249,348,",
                "time": "2019-10-29 16:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-29/1572335252486_q9ucfg_.jpg",
                "timestamp": 1572337800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-29/1572334609986_aphqh6_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305995.html",
                "stime": "2019-10-29 15:36:50",
                "title": "130胜率出场率过高，很大概率将进入荣誉室？",
                "tips": "“安装TC130精神扰乱装置。”",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 188
                },
                "from": "炉石盒子原创",
                "id": 305995,
                "tag": ",344,249,348,",
                "time": "2019-10-29 15:29:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-29/1572334609986_aphqh6_.jpg",
                "timestamp": 1572334140
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-28/1572246591945_xsg9zl_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305975.html",
                "stime": "2019-10-28 15:09:52",
                "title": "狂野回归出场率最低的卡牌有哪些？",
                "tips": "使用率并不是很高的那些卡牌。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 50
                },
                "from": "炉石盒子原创",
                "id": 305975,
                "tag": ",344,249,348,",
                "time": "2019-10-28 17:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-28/1572246591945_xsg9zl_.jpg",
                "timestamp": 1572253200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-28/1572244197512_h8zxii_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305972.html",
                "stime": "2019-10-28 14:29:58",
                "title": "女王和130到底有多强？官方推荐的两天非主流卡组还不来看看？",
                "tips": "精神控制对于炉石的干扰。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 36
                },
                "from": "网易大神",
                "id": 305972,
                "tag": ",344,249,348,",
                "time": "2019-10-28 14:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-28/1572244197512_h8zxii_.jpg",
                "timestamp": 1572244200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-27/1572160937961_xltkgd_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305955.html",
                "stime": "2019-10-27 15:22:18",
                "title": "恩佐斯套路合集，版本最强势的嘲讽谁都可以玩！",
                "tips": "“我要吞噬所有的精华。”",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 88
                },
                "from": "炉石盒子原创",
                "id": 305955,
                "tag": ",344,249,348,",
                "time": "2019-10-27 18:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-27/1572160937961_xltkgd_.jpg",
                "timestamp": 1572170400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-27/1572160088016_3zttho_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305954.html",
                "stime": "2019-10-27 15:08:08",
                "title": "萨满称霸的环境中也有清流，这些大神的非主流卡组你值得拥有！",
                "tips": "环境中别样的风景。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 42
                },
                "from": "网易大神",
                "id": 305954,
                "tag": ",344,249,348,",
                "time": "2019-10-27 17:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-27/1572160088016_3zttho_.jpg",
                "timestamp": 1572166800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-26/1572029058681_k6xzls_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305930.html",
                "stime": "2019-10-26 02:44:19",
                "title": "炉石第一卡大帝在这三套牌里表现最好！",
                "tips": "索瑞森大帝的回归表现如何。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 32
                },
                "from": "网易大神",
                "id": 305930,
                "tag": ",344,249,348,",
                "time": "2019-10-26 13:13:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-26/1572029058681_k6xzls_.jpg",
                "timestamp": 1572066780
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-25/1571982278128_xyr67b_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305909.html",
                "stime": "2019-10-25 13:44:38",
                "title": "5招教你轻松吊打“最大毒瘤”萨满！",
                "tips": "找萨满的麻烦，打萨满的软肋。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 138
                },
                "from": "炉石盒子原创",
                "id": 305909,
                "tag": ",344,249,348,",
                "time": "2019-10-25 18:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-25/1571982278128_xyr67b_.jpg",
                "timestamp": 1571997600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-24/1571909381019_d53nel_.jpg",
                "author": "大神丶荒",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305891.html",
                "stime": "2019-10-24 17:29:41",
                "title": "每周最卡组#05：佛祖再临宇宙骑加冕成王",
                "tips": "每周最卡组1024第五期：佛祖再临宇宙骑加冕成王，战吼萨继续遍地开花。",
                "content": "",
                "tags": "快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 60
                },
                "from": "网易大神",
                "id": 305891,
                "tag": ",344,249,348,",
                "time": "2019-10-25 11:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-24/1571909381019_d53nel_.jpg",
                "timestamp": 1571974200
            }
        ],
        flag:1
    })
})

//视频 数据 接口
router.get("/lushi/vedio",(req,res)=>{
    res.json({
        code:200,
        msg:[
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-13/1573625741793_sy2pkt_.jpg",
                "author": "Ben Brode",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306462.html",
                "stime": "2019-11-13 00:16:47",
                "title": "好久不见！Ben Brode发布最新MV",
                "tips": "那个男人他又回来了！",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 13
                },
                "from": "youtube",
                "id": 306462,
                "tag": ",349,344,",
                "time": "2019-11-13 14:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-13/1573625741793_sy2pkt_.jpg",
                "timestamp": 1573624800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-13/1573611894003_ebd0jk_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306471.html",
                "stime": "2019-11-13 10:04:31",
                "title": "哪个英雄是酒馆战棋里面最强的？",
                "tips": "《炉石传说》哪个英雄是酒馆战棋里面最强的？",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 27
                },
                "from": "网络",
                "id": 306471,
                "tag": ",349,344,",
                "time": "2019-11-13 12:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-13/1573611894003_ebd0jk_.jpg",
                "timestamp": 1573617600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-12/1573524528124_i2bptd_.jpg",
                "author": "受害者协会",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306440.html",
                "stime": "2019-11-12 08:24:30",
                "title": "炉石受害者协会#105：没有炎魔解决不了的问题，如果有就多来两发！",
                "tips": "炉石受害者协会#105：没有炎魔解决不了的问题，如果有就多来两发！",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 5
                },
                "from": "B战poi—肥猫丸与HS官方代理",
                "id": 306440,
                "tag": ",344,349,",
                "time": "2019-11-12 12:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-12/1573524528124_i2bptd_.jpg",
                "timestamp": 1573531200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-11/1573449841294_2netj6_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306417.html",
                "stime": "2019-11-11 08:25:47",
                "title": "啦神自走棋的理财思路 剧本都很完美 可惜就是手残",
                "tips": "啦神自走棋的理财思路 剧本都很完美 可惜就是手残",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 50
                },
                "from": "网络",
                "id": 306417,
                "tag": ",344,349,",
                "time": "2019-11-11 15:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-11/1573449841294_2netj6_.jpg",
                "timestamp": 1573455600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-06/1573015648033_5n1sx6_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306285.html",
                "stime": "2019-11-06 10:04:27",
                "title": "新英雄皮肤死亡之翼动画演示",
                "tips": "《炉石传说》新英雄皮肤死亡之翼动画演示（英文）",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 47
                },
                "from": "网络",
                "id": 306285,
                "tag": ",349,344,",
                "time": "2019-11-06 13:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-06/1573015648033_5n1sx6_.jpg",
                "timestamp": 1573016400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-11-05/1572921389529_cbn2gu_.jpg",
                "author": "受害者协会",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/306254.html",
                "stime": "2019-11-05 08:21:51",
                "title": "受害者协会#102：飞刀的特殊隐藏技能！",
                "tips": "受害者协会#102：飞刀的特殊隐藏技能！",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 12
                },
                "from": "B站",
                "id": 306254,
                "tag": ",349,344,",
                "time": "2019-11-05 14:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-11-05/1572921389529_cbn2gu_.jpg",
                "timestamp": 1572933600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-23/1571810445508_7ntpwk_.jpg",
                "author": "暴雪",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305853.html",
                "stime": "2019-10-23 10:03:08",
                "title": "2019年暴雪嘉年华官方宣传片",
                "tips": "2019年暴雪嘉年华官方宣传片",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 36
                },
                "from": "网络",
                "id": 305853,
                "tag": ",349,344,",
                "time": "2019-10-23 14:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-23/1571810445508_7ntpwk_.jpg",
                "timestamp": 1571810400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-22/1571674619008_30pzoi_.jpg",
                "author": "HERO死亡骑士",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305809.html",
                "stime": "2019-10-21 10:03:07",
                "title": "十张最容易被完爆的炉石卡牌",
                "tips": "十张最容易被完爆的炉石卡牌",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 62
                },
                "from": "B站",
                "id": 305809,
                "tag": ",344,349,",
                "time": "2019-10-22 10:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-22/1571674619008_30pzoi_.jpg",
                "timestamp": 1571709600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-21/1571626367095_wg8qwx_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305806.html",
                "stime": "2019-10-21 10:03:06",
                "title": "最佳时刻——舒服级了",
                "tips": "《炉石传说》最佳时刻——舒服级了",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 11
                },
                "from": "网络",
                "id": 305806,
                "tag": ",344,349,",
                "time": "2019-10-21 14:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-21/1571626367095_wg8qwx_.jpg",
                "timestamp": 1571637600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-14/1571056921168_tgzwa7_.jpg",
                "author": "HERO死亡骑士",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305643.html",
                "stime": "2019-10-14 10:03:23",
                "title": "盘点《炉石传说》十大天胡卡组",
                "tips": "盘点《炉石传说》十大天胡卡组",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 83
                },
                "from": "B站",
                "id": 305643,
                "tag": ",344,349,",
                "time": "2019-10-15 11:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-14/1571056921168_tgzwa7_.jpg",
                "timestamp": 1571108400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-09/1570589391099_npbplj_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305541.html",
                "stime": "2019-10-09 10:03:03",
                "title": "最佳时刻——意外斩杀！（30秒开始）",
                "tips": "《炉石传说》最佳时刻——意外斩杀！",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 8
                },
                "from": "网络",
                "id": 305541,
                "tag": ",349,344,",
                "time": "2019-10-09 12:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-09/1570589391099_npbplj_.jpg",
                "timestamp": 1570593600
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-10-01/1569917966956_6dcse6_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305427.html",
                "stime": "2019-10-01 16:19:27",
                "title": "每日欢乐幸运时刻——把你们的元气借给我",
                "tips": "每日欢乐幸运时刻——把你们的元气借给我",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 1
                },
                "from": "网络",
                "id": 305427,
                "tag": ",344,349,",
                "time": "2019-10-02 12:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-10-01/1569917966956_6dcse6_.jpg",
                "timestamp": 1569988800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-30/1569825254310_jg5glo_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305408.html",
                "stime": "2019-09-30 14:34:15",
                "title": "每日欢乐幸运时刻——我只需要一个TC130",
                "tips": "每日欢乐幸运时刻——我只需要一个TC130",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 1
                },
                "from": "网络",
                "id": 305408,
                "tag": ",344,349,",
                "time": "2019-09-30 15:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-30/1569825254310_jg5glo_.jpg",
                "timestamp": 1569826800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-18/1568785152503_pm4d7z_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305155.html",
                "stime": "2019-09-18 10:03:23",
                "title": "每日欢乐幸运时刻——我不能干这么蠢的事",
                "tips": "【奥丹姆奇兵】每日欢乐幸运时刻1266期",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 6
                },
                "from": "网络",
                "id": 305155,
                "tag": ",349,344,",
                "time": "2019-09-18 14:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-18/1568785152503_pm4d7z_.jpg",
                "timestamp": 1568786400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-17/1568694686642_unvhkx_.jpg",
                "author": "HERO死亡骑士",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305119.html",
                "stime": "2019-09-17 10:03:19",
                "title": "那些卡牌的外号及其由来：奥丹姆奇兵",
                "tips": "【炉石传说】那些卡牌的外号及其由来：奥丹姆奇兵",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 19
                },
                "from": "B站",
                "id": 305119,
                "tag": ",344,349,",
                "time": "2019-09-17 14:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-17/1568694686642_unvhkx_.jpg",
                "timestamp": 1568700000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-16/1568609010966_znlwqz_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305092.html",
                "stime": "2019-09-16 10:03:15",
                "title": "欢乐幸运时刻：心火牧就要手速快",
                "tips": "《炉石传说》欢乐幸运时刻：第464集",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 18
                },
                "from": "网络",
                "id": 305092,
                "tag": ",344,349,",
                "time": "2019-09-16 16:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-16/1568609010966_znlwqz_.jpg",
                "timestamp": 1568620800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-11/1568175474401_krjhuq_.jpg",
                "author": "网络",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304989.html",
                "stime": "2019-09-11 09:38:32",
                "title": "每日欢乐幸运时刻——失误集锦",
                "tips": "【奥丹姆奇兵】每日欢乐幸运时刻1259期",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 13
                },
                "from": "网络",
                "id": 304989,
                "tag": ",344,349,",
                "time": "2019-09-11 13:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-11/1568175474401_krjhuq_.jpg",
                "timestamp": 1568178000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-10/1568081512574_sbwbhr_.jpg",
                "author": "天天卡牌 ",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304967.html",
                "stime": "2019-09-10 10:03:10",
                "title": "天天拍片#01：逗鱼时刻是怎么炼成的？",
                "tips": "感谢大家观看我们的全新节目《天天拍片》，有什么建议和意见欢迎留言评论~",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 24
                },
                "from": "B站",
                "id": 304967,
                "tag": ",344,349,",
                "time": "2019-09-10 14:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-10/1568081512574_sbwbhr_.jpg",
                "timestamp": 1568095200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-09/1568001025842_i88liu_.jpg",
                "author": "Daily Hearthstone moments",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304940.html",
                "stime": "2019-09-09 10:03:14",
                "title": "最佳时刻——导演之盒！",
                "tips": "《炉石传说》最佳时刻——导演之盒！",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 15
                },
                "from": "youtube",
                "id": 304940,
                "tag": ",344,349,",
                "time": "2019-09-09 15:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-09/1568001025842_i88liu_.jpg",
                "timestamp": 1568012400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-04/1567575421183_bd3seu_.jpg",
                "author": "poi-肥猫丸与HS官方代理",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304818.html",
                "stime": "2019-09-04 08:16:35",
                "title": "炉石传说COMBO：膀胱癌之战",
                "tips": "炉石传说COMBO：膀胱癌之战",
                "content": "",
                "tags": "视频,最新",
                "tagSet": [
                    "344",
                    "349"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "视频",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 58
                },
                "from": "B站",
                "id": 304818,
                "tag": ",349,344,",
                "time": "2019-09-04 15:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-04/1567575421183_bd3seu_.jpg",
                "timestamp": 1567580400
            }
        ],
        flag:1
    })
})

//娱乐 数据接口
router.get("/lushi/yule",(req,res)=>{
    res.json({
        code:200,
        msg:[
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-06/1567770374123_bper1r_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304895.html",
                "stime": "2019-09-06 19:46:14",
                "title": "炉石鱼塘英雄传最终话—炉石杂感篇",
                "tips": "时如逝水，炉石传说也已经5岁了。",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 69
                },
                "from": "微博",
                "id": 304895,
                "tag": ",344,249,350,",
                "time": "2019-09-07 11:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-06/1567770374123_bper1r_.jpg",
                "timestamp": 1567827000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-08-30/1567164756181_x9edzl_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304745.html",
                "stime": "2019-08-30 19:32:36",
                "title": "炉石鱼塘英雄传 十八话：炎魔之王—拉格纳罗斯篇",
                "tips": "每周炉石鱼塘英雄传lei咯。",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 94
                },
                "from": "微博",
                "id": 304745,
                "tag": ",344,350,",
                "time": "2019-08-30 19:32:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-08-30/1567164756181_x9edzl_.jpg",
                "timestamp": 1567164720
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-08-27/1566899373923_i2c9k8_.jpg",
                "author": "炉石老干妈",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304664.html",
                "stime": "2019-08-27 17:49:34",
                "title": "炉石灵魂周刊：听说聚会君终于女装呢？",
                "tips": "每周又有新的乐子了。",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 34
                },
                "from": "网易大神",
                "id": 304664,
                "tag": ",344,249,350,",
                "time": "2019-08-27 18:45:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-08-27/1566899373923_i2c9k8_.jpg",
                "timestamp": 1566902700
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-31/1564558903472_6ml2id_.jpg",
                "author": "炉石老干妈",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/303818.html",
                "stime": "2019-07-31 15:41:44",
                "title": "奥丹姆奇兵趣味评价（二）",
                "tips": "奥丹姆奇兵趣味评价（二）",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 34
                },
                "from": "网易大神",
                "id": 303818,
                "tag": ",344,350,",
                "time": "2019-07-31 15:30:00",
                "category": "快讯",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-31/1564558903472_6ml2id_.jpg",
                "timestamp": 1564558200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-19/1563535940366_dnhxrg_.jpg",
                "author": "千鹤",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/303320.html",
                "stime": "2019-07-19 19:32:21",
                "title": "炉石新闻乱播#2：咆哮魔居然带盐了肉松？",
                "tips": ".",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 110
                },
                "from": "炉石盒子原创",
                "id": 303320,
                "tag": ",344,249,350,",
                "time": "2019-07-20 10:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-19/1563535940366_dnhxrg_.jpg",
                "timestamp": 1563589800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-19/1563534950294_n0v3lo_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/303317.html",
                "stime": "2019-07-19 19:00:54",
                "title": "炉石鱼塘英雄传#12：王师傅神机妙算《一分卡》篇",
                "tips": "炉石鱼塘英雄传丨第十二话：王师傅神机妙算《一分卡》篇",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 47
                },
                "from": "微博",
                "id": 303317,
                "tag": ",344,249,350,",
                "time": "2019-07-19 19:01:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-19/1563534950294_n0v3lo_.jpg",
                "timestamp": 1563534060
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-13/1563010736249_oeii0k_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/303130.html",
                "stime": "2019-07-13 17:29:37",
                "title": "炉石鱼塘英雄传#11：竞技场领主-啦啦啦篇",
                "tips": "炉石鱼塘英雄传#11：竞技场领主-啦啦啦篇",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 35
                },
                "from": "微博",
                "id": 303130,
                "tag": ",344,249,350,",
                "time": "2019-07-13 17:31:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-13/1563010736249_oeii0k_.jpg",
                "timestamp": 1563010260
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-06/1562388972864_asliz6_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/302907.html",
                "stime": "2019-07-05 19:33:24",
                "title": "炉石鱼塘英雄传丨第十话：粉碎之腿《雪妍》篇",
                "tips": "炉石鱼塘英雄传丨第十话：粉碎之腿《雪妍》篇",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 31
                },
                "from": "微博",
                "id": 302907,
                "tag": ",344,350,249,",
                "time": "2019-07-05 19:35:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-06/1562388972864_asliz6_.jpg",
                "timestamp": 1562326500
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-04/1562234543720_stxez7_.jpg",
                "author": "千鹤",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/302874.html",
                "stime": "2019-07-04 17:55:16",
                "title": "炉石新闻乱播#1：奥拉基到底是什么垃圾？",
                "tips": "炉石新闻乱播#1：奥拉基到底是什么垃圾？",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "大图",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 137
                },
                "from": "炉石盒子原创",
                "id": 302874,
                "tag": ",344,350,",
                "time": "2019-07-04 17:55:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-04/1562234543720_stxez7_.jpg",
                "timestamp": 1562234100
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-06-29/1561786766199_zlobu0_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/302681.html",
                "stime": "2019-06-28 19:17:21",
                "title": "炉石鱼塘英雄传丨第九话：保驾护航《瓦莉拉》篇",
                "tips": "炉石鱼塘英雄传丨第九话：保驾护航《瓦莉拉》篇",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 69
                },
                "from": "微博",
                "id": 302681,
                "tag": ",344,350,249,",
                "time": "2019-06-28 19:20:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-06-29/1561786766199_zlobu0_.jpg",
                "timestamp": 1561720800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-06-24/1561349763745_lfe93c_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/302528.html",
                "stime": "2019-06-24 12:16:04",
                "title": "炉石鱼塘英雄传丨第八话：野菊帝国金将军-涛妹篇​",
                "tips": "炉石鱼塘英雄传丨第八话：野菊帝国金将军-涛妹篇​",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 43
                },
                "from": "微博",
                "id": 302528,
                "tag": ",344,350,",
                "time": "2019-06-24 12:12:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-06-24/1561349763745_lfe93c_.jpg",
                "timestamp": 1561349520
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-06-14/1560510765684_yogfwh_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/302278.html",
                "stime": "2019-06-14 19:12:46",
                "title": "炉石鱼塘英雄传丨第七话：尖沙咀扛把子-Sol君",
                "tips": "炉石鱼塘英雄传丨第七话：尖沙咀扛把子-Sol君",
                "content": "",
                "tags": "娱乐,视频,最新",
                "tagSet": [
                    "344",
                    "347",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 103
                },
                "from": "微博",
                "id": 302278,
                "tag": ",344,350,347,",
                "time": "2019-06-14 19:15:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-06-14/1560510765684_yogfwh_.jpg",
                "timestamp": 1560510900
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-06-09/1560055514579_g5kofj_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/302120.html",
                "stime": "2019-06-09 12:45:15",
                "title": "炉石鱼塘英雄传 | 第六话：干踏马帝-天天卡牌",
                "tips": "炉石鱼塘英雄传 | 第六话：干踏马帝-天天卡牌",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 35
                },
                "from": "微博",
                "id": 302120,
                "tag": ",344,350,",
                "time": "2019-06-09 14:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-06-09/1560055514579_g5kofj_.jpg",
                "timestamp": 1560060000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-06-03/1559553272200_74xabf_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301968.html",
                "stime": "2019-06-03 17:14:32",
                "title": "炉石鱼塘英雄传 | 第五话：人民教师-异灵术",
                "tips": "炉石鱼塘英雄传 | 第五话：人民教师-异灵术",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 111
                },
                "from": "微博",
                "id": 301968,
                "tag": ",344,350,",
                "time": "2019-06-03 17:05:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-06-03/1559553272200_74xabf_.jpg",
                "timestamp": 1559552700
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-31/1559275462998_jmjxdl_1559275462831_aw3s3x.jpg",
                "author": "MorganaCosplay",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301894.html",
                "stime": "2019-05-31 12:04:23",
                "title": "国外玩家COS欣赏：高特效的虚空之影瓦莉拉",
                "tips": "国外玩家COS赏：高特效虚空之影瓦莉拉",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 59
                },
                "from": "Twitter",
                "id": 301894,
                "tag": ",344,249,350,",
                "time": "2019-05-31 15:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-31/1559275462998_jmjxdl_1559275462831_aw3s3x.jpg",
                "timestamp": 1559286000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-30/1559194088301_rnuyki_.jpg",
                "author": "唯一大神天天卡牌",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301868.html",
                "stime": "2019-05-30 13:28:09",
                "title": "战队联赛故事汇#4：爱队鱼塘冒奶，究竟何人所为？",
                "tips": "战队联赛故事汇#4：爱队鱼塘冒奶，究竟何人所为？",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 8
                },
                "from": "网易大神",
                "id": 301868,
                "tag": ",344,249,350,",
                "time": "2019-05-30 14:30:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-30/1559194088301_rnuyki_.jpg",
                "timestamp": 1559197800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-24/1558693392149_t9jjag_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301737.html",
                "stime": "2019-05-24 18:23:12",
                "title": "炉石鱼塘英雄传 | 第四话：神抽狗协会会长《安德罗妮》篇",
                "tips": "炉石鱼塘英雄传 | 第四话：神抽狗协会会长《安德罗妮》篇",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 53
                },
                "from": "微博",
                "id": 301737,
                "tag": ",344,350,",
                "time": "2019-05-24 18:59:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-24/1558693392149_t9jjag_.jpg",
                "timestamp": 1558695540
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-23/1558592331587_mmpwh7_.jpg",
                "author": "易竞技",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301698.html",
                "stime": "2019-05-23 14:18:52",
                "title": "联赛吐槽烩：儒雅驴鸽！天选爱队！周郎真乃神",
                "tips": "联赛吐槽烩：儒雅驴鸽！天选爱队！周郎真乃神",
                "content": "",
                "tags": "娱乐,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 12
                },
                "from": "网易大神",
                "id": 301698,
                "tag": ",344,249,350,",
                "time": "2019-05-23 16:45:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-23/1558592331587_mmpwh7_.jpg",
                "timestamp": 1558601100
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-21/1558413771458_0y2fjx_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301616.html",
                "stime": "2019-05-21 12:42:52",
                "title": "炉石鱼塘英雄传 | 第三话：叠甲帮主《陈二狗》篇",
                "tips": "炉石鱼塘英雄传 | 第三话：专精叠甲的狗贼",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 41
                },
                "from": "微博",
                "id": 301616,
                "tag": ",344,350,",
                "time": "2019-05-21 12:39:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-21/1558413771458_0y2fjx_.jpg",
                "timestamp": 1558413540
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-10/1557481679572_rqcqqw_.jpg",
                "author": "郭策唯利是图",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301308.html",
                "stime": "2019-05-10 17:48:00",
                "title": "炉石鱼塘英雄传 | 第二话：尝精阁主-方丈杰尼",
                "tips": "炉石鱼塘英雄传 | 第二话：尝精阁主-方丈杰尼",
                "content": "",
                "tags": "娱乐,最新",
                "tagSet": [
                    "344",
                    "350"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "娱乐",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 64
                },
                "from": "微博",
                "id": 301308,
                "tag": ",344,350,",
                "time": "2019-05-10 18:50:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-10/1557481679572_rqcqqw_.jpg",
                "timestamp": 1557485400
            }
        ],
        flag:1
    })
})

//赛事 数据 接口
router.get("/lushi/saishi",(req,res)=>{
    res.json({
        code:200,
        msg:[
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-27/1569575356478_pggp7q_.jpg",
                "author": "网易大神",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305363.html",
                "stime": "2019-09-27 17:09:17",
                "title": "推广：“大神杯”梦迹沙河2挑战赛火热来袭 瓜分20000奖金",
                "tips": "第一届“大神杯”火热来袭！由大神魔兽争霸兴趣圈携手斗鱼直播平台共同举办的“大神杯”《梦迹沙河2》挑战赛，将为每一位热爱《梦迹沙河2》的玩家提供一个展现自己的舞台，参与更有机会瓜分高达20000元奖金！",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 12
                },
                "from": "网易大神",
                "id": 305363,
                "tag": ",344,351,",
                "time": "2019-09-27 17:10:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-27/1569575356478_pggp7q_.jpg",
                "timestamp": 1569575400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-09-27/1569568438567_ytglvb_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/305360.html",
                "stime": "2019-09-27 15:13:59",
                "title": "实力赛夏季总决赛：10月2~3日重庆西漫，一起见证MINI车主诞生",
                "tips": "一起体验赛事的狂欢吧！",
                "content": "",
                "tags": "赛事,快讯",
                "tagSet": [
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 2
                },
                "from": "炉石传说",
                "id": 305360,
                "tag": ",249,351,",
                "time": "2019-09-27 17:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-09-27/1569568438567_ytglvb_.jpg",
                "timestamp": 1569574800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-08-08/1565256437840_1pokup_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/304142.html",
                "stime": "2019-08-08 16:08:27",
                "title": "巾帼不让须眉，见证炉石电竞的闪亮新星",
                "tips": "巾帼不让须眉 见证炉石电竞的闪亮新星",
                "content": "",
                "tags": "赛事,快讯",
                "tagSet": [
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 5
                },
                "from": "炉石传说",
                "id": 304142,
                "tag": ",249,351,",
                "time": "2019-08-09 09:00:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-08-08/1565256437840_1pokup_.jpg",
                "timestamp": 1565312400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-07-17/1563366000665_krj5tt_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/303253.html",
                "stime": "2019-07-17 20:20:01",
                "title": "KOF赛制下，实力赛高性价比卡组指南",
                "tips": "KOF赛制下，实力赛高性价比卡组指南",
                "content": "",
                "tags": "赛事,快讯,卡组,最新",
                "tagSet": [
                    "344",
                    "249",
                    "348",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯",
                    "卡组",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 55
                },
                "from": "炉石传说",
                "id": 303253,
                "tag": ",351,344,249,348,",
                "time": "2019-07-17 20:12:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-07-17/1563366000665_krj5tt_.jpg",
                "timestamp": 1563365520
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-30/1559186441890_hvnltl_.jpg",
                "author": "网易NeXT电竞",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301862.html",
                "stime": "2019-05-30 11:20:42",
                "title": "5.30 电竞热潮燃爆魔都！网易电竞NeX春季赛线下总决赛盛大开启",
                "tips": "5.30 电竞热潮燃爆魔都！网易电竞NeX春季赛线下总决赛盛大开启",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 8
                },
                "from": "网易NeXT电竞",
                "id": 301862,
                "tag": ",344,351,",
                "time": "2019-05-30 11:18:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-30/1559186441890_hvnltl_.jpg",
                "timestamp": 1559186280
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-14/1557800670796_k8bu03_.jpg",
                "author": "网易电竞NeXT",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301388.html",
                "stime": "2019-05-14 10:24:31",
                "title": "NeXT春季赛线下总决赛门票火热发售中",
                "tips": "NeXT春季赛线下总决赛门票今日发售 上海欢乐谷邀你共度电竞嘉年华",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "大图",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 17
                },
                "from": "网易电竞NeXT",
                "id": 301388,
                "tag": ",344,351,",
                "time": "2019-05-24 16:00:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-14/1557800670796_k8bu03_.jpg",
                "timestamp": 1558684800
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-05-09/1557370790827_guurbm_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/301254.html",
                "stime": "2019-05-09 10:59:51",
                "title": "黄金战队联赛 5月10日厦门站上演",
                "tips": "黄金战队联赛 5月10日厦门站上演",
                "content": "",
                "tags": "赛事,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 6
                },
                "from": "炉石官网",
                "id": 301254,
                "tag": ",344,249,351,",
                "time": "2019-05-09 10:58:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-05-09/1557370790827_guurbm_.jpg",
                "timestamp": 1557370680
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-04-17/1555481069064_11t4yq_1555481069053_rpqagp.jpg",
                "author": "官网",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/300639.html",
                "stime": "2019-04-17 14:04:29",
                "title": "黄金战队联赛5月来袭 六大看点不容错过",
                "tips": "黄金战队联赛5月来袭 六大看点不容错过",
                "content": "",
                "tags": "赛事,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 17
                },
                "from": "官网",
                "id": 300639,
                "tag": ",249,344,351,",
                "time": "2019-04-17 15:30:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2019-04-17/1555481069064_11t4yq_1555481069053_rpqagp.jpg",
                "timestamp": 1555486200
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-04-08/1554691870920_e7wgib_.jpg",
                "author": "网易电竞NeXT",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/300310.html",
                "stime": "2019-04-08 10:47:49",
                "title": "网易电竞NeXT春季赛今日开赛 16款游戏参赛创新高",
                "tips": "网易电竞NeXT春季赛今日开赛 16款游戏参赛创新高",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 19
                },
                "from": "网易电竞NeXT",
                "id": 300310,
                "tag": ",344,351,",
                "time": "2019-04-08 10:45:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-04-08/1554691870920_e7wgib_.jpg",
                "timestamp": 1554691500
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-03-26/1553582480569_ljqwmc_.jpg",
                "author": "Box君",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/299686.html",
                "stime": "2019-03-25 21:28:55",
                "title": "炉石盒子巨龙年线上赛，每周疯狂送卡包！",
                "tips": "炉石传说盒子巨龙年线上赛，每周疯狂送卡包！",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "大图",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 79
                },
                "from": "炉石盒子",
                "id": 299686,
                "tag": ",344,351,",
                "time": "2019-03-26 15:40:00",
                "category": "新闻",
                "img1": "http://ok.166.net/lushi-app/post/2019-03-26/1553582480569_ljqwmc_.jpg",
                "timestamp": 1553586000
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-03-22/1553234853205_zau7b2_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/299593.html",
                "stime": "2019-03-22 14:07:33",
                "title": "黄金公开赛青岛站观赛指南 3月23日10:30开战",
                "tips": "黄金公开赛青岛站观赛指南 3月23日10:30开战",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 20
                },
                "from": "官方",
                "id": 299593,
                "tag": ",344,351,",
                "time": "2019-03-22 14:06:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-03-22/1553234853205_zau7b2_.jpg",
                "timestamp": 1553234760
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-02-25/1551077089175_dnmwpw_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/298755.html",
                "stime": "2019-02-25 14:44:49",
                "title": "世界锦标赛冬季赛专题上线3月1日00:30打响",
                "tips": "世界锦标赛冬季赛专题上线3月1日00:30打响",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 21
                },
                "from": "官方",
                "id": 298755,
                "tag": ",344,351,",
                "time": "2019-02-25 14:43:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-02-25/1551077089175_dnmwpw_.jpg",
                "timestamp": 1551076980
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-02-22/1550808208933_x0ngzd_1550808208929_pf2i0b.jpg",
                "author": "炉石传说",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/298672.html",
                "stime": "2019-02-22 12:03:29",
                "title": "炉石电竞计划前瞻：国服独有赛事公布",
                "tips": "炉石电竞计划前瞻：国服独有赛事公布",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 21
                },
                "from": "官方",
                "id": 298672,
                "tag": ",344,351,",
                "time": "2019-02-22 11:25:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-02-22/1550808208933_x0ngzd_1550808208929_pf2i0b.jpg",
                "timestamp": 1550805900
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2019-01-02/1546393821815_qxocug_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/297329.html",
                "stime": "2019-01-02 09:50:22",
                "title": "第四届精英实力赛落幕 内蒙古锤石传说夺冠",
                "tips": "第四届精英实力赛落幕 内蒙古锤石传说夺冠",
                "content": "",
                "tags": "赛事,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 22
                },
                "from": "炉石官网",
                "id": 297329,
                "tag": ",344,249,351,",
                "time": "2019-01-02 09:48:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2019-01-02/1546393821815_qxocug_.jpg",
                "timestamp": 1546393680
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-12-24/1545617340013_zq3nto_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/297112.html",
                "stime": "2018-12-24 10:09:01",
                "title": "黄金公开赛五周年圆满落幕，XiaoT夺冠",
                "tips": "黄金公开赛五周年圆满落幕",
                "content": "",
                "tags": "赛事,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 33
                },
                "from": "炉石官网",
                "id": 297112,
                "tag": ",344,249,351,",
                "time": "2018-12-24 10:06:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2018-12-24/1545617340013_zq3nto_.jpg",
                "timestamp": 1545617160
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-12-13/1544702801348_dtftur_.jpg",
                "author": "炉边聚会",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/296780.html",
                "stime": "2018-12-13 20:06:41",
                "title": "2018ESS全球总决赛世界炉石高手汇聚联盟电竞天津馆",
                "tips": "2018ESS全球总决赛世界炉石高手汇聚联盟电竞天津馆",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 23
                },
                "from": "炉边聚会",
                "id": 296780,
                "tag": ",344,351,",
                "time": "2018-12-13 20:05:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2018-12-13/1544702801348_dtftur_.jpg",
                "timestamp": 1544702700
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-12-11/1544508779933_v6aupn_.jpg",
                "author": "炉边聚会",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/296688.html",
                "stime": "2018-12-11 14:13:00",
                "title": "网易电竞NeXT冬季赛炉石线上赛卡组&选手巡礼",
                "tips": "网易电竞NEXT冬季赛炉石线上赛卡组&选手巡礼",
                "content": "",
                "tags": "赛事,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 17
                },
                "from": "网易大神",
                "id": 296688,
                "tag": ",344,249,351,",
                "time": "2018-12-11 16:20:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2018-12-11/1544508779933_v6aupn_.jpg",
                "timestamp": 1544516400
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-12-11/1544508536032_axsufo_.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/296687.html",
                "stime": "2018-12-11 14:08:56",
                "title": "黄金公开赛三亚站公开组分组名单公布",
                "tips": "黄金公开赛三亚站公开组分组名单公布",
                "content": "",
                "tags": "赛事,快讯,最新",
                "tagSet": [
                    "344",
                    "249",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "快讯",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 23
                },
                "from": "炉石官网",
                "id": 296687,
                "tag": ",344,249,351,",
                "time": "2018-12-11 14:05:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2018-12-11/1544508536032_axsufo_.jpg",
                "timestamp": 1544508300
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-12-11/1544504343821_vt8pkw_.jpg",
                "author": "联盟电竞",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/296685.html",
                "stime": "2018-12-11 12:59:04",
                "title": "2018Esport Superstars炉石全国总决赛四强选手出炉",
                "tips": "2018Esport Superstars炉石全国总决赛四强选手出炉",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 17
                },
                "from": "联盟电竞",
                "id": 296685,
                "tag": ",344,351,",
                "time": "2018-12-11 12:57:00",
                "category": "攻略",
                "img1": "http://ok.166.net/lushi-app/post/2018-12-11/1544504343821_vt8pkw_.jpg",
                "timestamp": 1544504220
            },
            {
                "game": "6063",
                "img": "http://ok.166.net/lushi-app/post/2018-11-29/1543471527621_5jkicn_1543471527617_gtbw89.jpg",
                "author": "官方",
                "link": "http://lushi-app.gameyw.netease.com/xiaomei/news/296253.html",
                "stime": "2018-11-29 14:05:28",
                "title": "2018黄金总决赛暨黄金年度盛典即将到来",
                "tips": "2018黄金总决赛暨黄金年度盛典即将到来",
                "content": "",
                "tags": "赛事,最新",
                "tagSet": [
                    "344",
                    "351"
                ],
                "listStyle": "普通",
                "tagSortSet": [
                    "赛事",
                    "最新"
                ],
                "banner_img": "",
                "sns": {
                    "likeCount": 0,
                    "isFavorite": false,
                    "commentCount": 16
                },
                "from": "官方",
                "id": 296253,
                "tag": ",344,351,",
                "time": "2018-11-29 14:40:00",
                "category": "",
                "img1": "http://ok.166.net/lushi-app/post/2018-11-29/1543471527621_5jkicn_1543471527617_gtbw89.jpg",
                "timestamp": 1543473600
            }
        ],
        flag:1
    })
})

//mine 页面获取 个人信息 接口
router.get("/lushi/getMine",(req,res)=>{
    var phone =req.session.phone*1
    console.log(phone);

    Lushiusername.findOne({
        phone
    }).then(result=>{
        res.json({
            code:200,
            flag:1,
            result
        })
    })
})

//vuex 登录成功 请求 个人数据接口
router.get("/lushi/getStuInfo",(req,res)=>{
    console.log("登录成功 请求 个人数据接口")
    var phone =req.session.phone*1
    console.log(phone);

    Lushiusername.findOne({
        phone
    }).then(result=>{
        res.json({
            code:200,
            flag:1,
            result
        })
    })
    // res.json({
    //     code:100
    // })
})


//搜索查表 kazus  表 接口
router.get("/lushi/searchkazu",(req,res)=>{
    var query  =req.query;
    console.log(555554555)
    const key =query.key
    console.log(key)
    Kazus.find({
        tips:new RegExp(key)
    }).then(result=>{
        console.log(result)
        res.json({
            code:200,
            msg:result
        })
    })
})

// 上上传头像  
var multer = require("multer");
var storage = multer.diskStorage({   // 操作硬盘 
    destination: function (req, file, cb) {
      cb(null, './public/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'lushitouxiang'+file.originalname); // 123412123231221wh19092.jpg
    }
});

// 创建上传对象   
var upload = multer({ storage: storage }).any();

router.post("/uploadpic",upload,(req,res)=>{
    console.log(req.files)
    console.log("头像上传成功")
    var path = req.files[0].path;
    Lushiusername.updateOne({
        phone:req.session.phone*1
    },{
        $set:{
            pic:path
        }
    }).then(result=>{
        res.json({
            code:200,
            msg:"头像上传成功",
            pic:path,
            result
        })

    })
})

// 请求数据库头像 接口
router.get("/lushi/getAvatar",(req,res)=>{
    console.log(456546547)
    console.log(req.session.phone*1)
    console.log(999888)
    Lushiusername.findOne({
        phone:req.session.phone*1
    }).then((result)=>{
        if(result){
            res.json({
                code:200,
                flag:1,
                msg:"获取头像成功",
                result
            })
        }else{
            res.json({
                code:200,
                flag:0,
                msg:"获取头像失败"
            })
        }
    })
})

//Lushidingyues 用户订阅接口
router.get("/lushi/dingyue",(req,res)=>{
    const query =req.query;
    console.log(query)
    Lushidingyues.insertMany({
        phon:req.session.phone*1,
        img:query.img,
        title:query.title,
        tips:query.tips,
    }).then(result=>{
        res.json({
            code:200,
            result
        })
    })
})

//修改个人信息   修改nickname 接口
router.get("/lushi/changenickname",(req,res)=>{
    const query =req.query;
    console.log(query)
    console.log(query.nickname)
    Lushiusername.updateMany({
        phone:req.session.phone*1
    },{
        $set:{
            nickname:query.nickname
        }
    }).then(result=>{
        res.json({
            code:200,
            mgs:"修改昵称成功",
            result
        })
    })
})

//修改个人信息   修改性别 接口
router.get("/lushi/changeSex",(req,res)=>{
    const query =req.query;
    console.log(query)
    console.log(query.sex)
    Lushiusername.updateMany({
        phone:req.session.phone*1
    },{
        $set:{
            sex:query.sex
        }
    }).then(result=>{
        res.json({
            code:200,
            mgs:"修改性别成功",
            result
        })
    })
});

//修改个人信息   修改生日 接口
router.get("/lushi/changebirthday",(req,res)=>{
    const query =req.query;
    console.log(query)
    console.log(query.birthday)
    Lushiusername.updateMany({
        phone:req.session.phone*1
    },{
        $set:{
            birthday:query.birthday
        }
    }).then(result=>{
        res.json({
            code:200,
            mgs:"修改生日成功",
            result
        })
    })
});

//修改个人信息   修改个性签名接口
router.get("/lushi/changeSign",(req,res)=>{
    const query =req.query;
    console.log(query)
    console.log(query.sign)
    Lushiusername.updateMany({
        phone:req.session.phone*1
    },{
        $set:{
            sign:query.sign
        }
    }).then(result=>{
        res.json({
            code:200,
            mgs:"修改生日成功",
            result
        })
    })
});


//newsone 详情页 接口
router.get("/lushi/newsOneDel",(req,res)=>{
    const query =req.query;
    console.log(query)
    newsonecommit.find({
        id:query.id*1
    }).then(result=>{
        res.json({
            code:200,
            msg:result
        })
    })
})



module.exports =router