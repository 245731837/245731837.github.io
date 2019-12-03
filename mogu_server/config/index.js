
const utf8 = require('utf8');
const axios = require('axios');
const config = require('./config.js');

/**
 * [getUrl description]
 * @param  {[type]} param [替换模板变量内容]
 * @param  {[type]} to    [短信接收手机号]
 * @return {[type]}       [promise]
 */
var sendCode = function(param, mobile) {
    
    const url = 'https://open.ucpaas.com/ol/sms/sendsms';

    return axios({
        method: 'post',
        url: url,
        data: {
            
                sid: config.sid, 
                token: config.token, 
                appid: config.appid, 
                templateid: config.templateid, 
                param: param,   //验证码
                mobile: mobile,     //手机号
                uid: config.uid 
            
        },
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        }
    })
}

module.exports.sendCode = sendCode
