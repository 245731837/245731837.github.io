const ZhenzismsClient = require('./zhenzisms')

var client = new ZhenzismsClient('sms_developer.zhenzikj.com', '103574', 'ac228b6c-652c-4d41-9177-ffc2f3205f73');

function send(tel,code){
    return client.send(`您的验证码是${code}`,tel)
}

module.exports = {
    send
}