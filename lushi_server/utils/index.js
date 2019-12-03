const crypto = require("crypto");   // Node 自带API 

// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = "wuhan1909";   // 123456789  1w2u3h4a5n61798099

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 

// 自定义中间件 判断是否登录
// a.  请求头 没有 token   详情查看 佐佐木 my-server /utiles/index。js
// b.  前端 发送 的请求头的 token 与 存储 在后台 的token 不一样  
// c.  请求头 有 token    后端 存储 token 已经消失 
//登录和注册 不需要判断
exports.checkToken =function (req,res,next){
    console.log("path========>",req.path)
    if(req.path =="/vue/lushi/getMine"){
        var clientToken =req.headers.token; //前端的token在 axios里面存到headers 里面  45行 
        var serverToken =req.session.token;
        console.log(clientToken)
        console.log("serverToken:",serverToken)
        if(clientToken){
            if(serverToken){
                if(clientToken==serverToken){
    
                    next()
                }else{
                    res.json({
                        code:10000,
                        msg:"token不匹配，请重新登录"
                    })
                }
            }else{
                res.json({
                    code:10000,
                    msg:"登录已过期请重新登录"
                })
            }
        }else{
            res.json({
                code:10000,
                msg:"还未登录请登录111111"
            })
        }
        
    }else{
        console.log("进来了")
        next()
    }
}