import React , {Component} from "react";
import "./index.scss";
import {Icon,WingBlank, WhiteSpace,List,InputItem,Button} from "antd-mobile";
import { history } from "~/history.js";
import { axios } from "~/axios.js";

var timer = null;
var cReg =/^[0-9]{4}$/
var pReg = /^1(3|5|6|7|8|9)[0-9]{9}$/
export default class Login extends Component {
    constructor(){
        super()
        this.state={
            pFlag: true,
            cFlag: true,
            count: 10,
            txt: "发送验证码"

        }
    };
    checkPhone = (val) => {
        console.log(val)
        if (pReg.test(val)) {
            this.setState({
                pFlag: false
            })
        } else {
            this.setState({
                pFlag: true
            })
        }
    };
    checkCode=(code)=>{
        console.log(this.phone.state.value)
        if( (pReg.test(this.phone.state.value)&&cReg.test(code)) ){
            this.setState({
                cFlag:false
            })
        }else{
            console.log(231)
            this.setState({
                cFlag:true
            }) 
        }

    };
    //发送验证码
    sendCode=()=>{
        const phone =this.phone.state.value
        axios.post("react/sendCode",{phone}).then(res=>{
            console.log(res)
        });
        this.timeCount();
    }

    timeCount() {
        this.setState({
            count: --this.state.count,
            txt: `倒计时${this.state.count}`,
            pFlag:true
        })
        timer=setInterval(() => {
            if(this.state.count > 0){
                this.setState({
                    count: --this.state.count,
                    txt: `倒计时${this.state.count}`,
                    pFlag:true
                })
            }else{
                clearInterval(timer)
                this.setState({
                    count: 10,
                    txt: `发送验证码`,
                    pFlag:false
                })
            }
        }, 1000);

    };
    //登录
    tologin =()=>{
        console.log(this.phone.state.value)
        console.log(this.code.state.value)
        const phone =this.phone.state.value
        const code =this.code.state.value
        axios.post("/react/checkCode",{phone,code}).then(res=>{
            console.log(res)
            if(!!res.data.type){
                sessionStorage.token =res.data.token
                history.push("/main")
            }else{
                sessionStorage.token =""
            }
        })
    };
    //跳转主页
    toHome =()=>{
        history.push("/main")
    };

    render(){
        var {
            pFlag,
            cFlag,
            txt
        } = this.state
        return (
            <div className="login">
                <WingBlank>
                    <WhiteSpace/>
                    <header>
                        <Icon type="left" onClick={this.toHome} />
                        <Icon type="ellipsis" className="ellipsis" />  
                    </header>
                </WingBlank>
                <WhiteSpace />
                <WingBlank>
                <h2> 手机登录</h2>
                </WingBlank>
                <WhiteSpace />
                <WingBlank>
                    <List>
                        <InputItem
                            type="number"
                            placeholder="请输入手机号"
                            clear
                            ref={el => this.phone = el}
                            onChange={this.checkPhone}
                        >手机号</InputItem>
                    </List>
                    <WhiteSpace />
                    <List>
                        <InputItem
                            type="number"
                            placeholder="请输入验证码"
                            clear
                            ref={el => this.code = el}
                            onChange={this.checkCode}
                        >验证码</InputItem>
                        <Button
                            type="warning"
                            inline
                            id="code-btn"
                            disabled={pFlag}
                            onClick={this.sendCode}
                        >{txt}</Button>
                    </List>

                    <WhiteSpace />
                    <Button
                        id="login-btn"
                        type="primary"
                        disabled={cFlag}
                        onClick ={ () =>{this.tologin()} }
                    >点击登录</Button>
                </WingBlank>

                
            </div>
        )
    }
}



// axios({
//     url: "https://webservice.juanpi.com/api/getGoods?page=1&zy_ids=p8_c4_l4&app_name=zhe&catname=tab_hpdp&flag=tab_hpdp",
//     method: "GET",
//     headers: {
//         "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
//     }
// }).then(res => {
//     console.log(res)
// })