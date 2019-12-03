
// vue 配置文件 修改必须重启 
module.exports = {
    publicPath:"",
    devServer:{
        host:"0.0.0.0",
        port:9800,
        open:true,  // 自动打开浏览器
        proxy:{    //  代理    不能axios 基路径共存 
            "/vue": {   // 请求路径 输入 /vue 会拼接成target代表的地址  不能和axios 基路径共存
                target:"http://localhost:2020",
                changeOrigin: true,
            },
            //下面两个都是老师的服务器接口
            "/vue2": {
                target:"http://192.168.50.27:2020",
                changeOrigin: true,
            },
            "/avatar": {
                target:"http://192.168.50.27:2020",
                changeOrigin: true,
            },
        }  
    }
}