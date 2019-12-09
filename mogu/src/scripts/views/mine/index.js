import React , {Component} from "react";
import "./index.scss"
import Foot from "../../components/foot"

import {observer } from "mobx-react"
import HomeData from "../../mobx/homeData"

import {Button} from "antd-mobile"
import {axios} from "~/axios"

@observer
class Mine extends Component {

    componentDidMount(){
        HomeData.getUserPhone()
    }


    render(){
        return (
            <div className="mine">
                <div className="top">
                    <img src="#" alt="" className="img1" />
                    <img src="https://s10.mogucdn.com/mlcdn/c45406/191010_2il1l3i91gkd5c461j93e5ehfcgi5_1404x216.png" alt="" className="img2" />
                    <p> {HomeData.userPhone} </p>        
                </div>
                {/* ------ */}
                <div className="nav">
                    <ul>
                        <li>
                            <i className="iconfont icon-zhuye" ></i>
                            <p>个人主页</p>
                        </li>
                        <li>
                            <i className="iconfont icon-xiaoxi1" ></i>
                            <p>消息</p>
                        </li>
                        <li>
                            <i className="iconfont icon-buoumaotubiao45" ></i>
                            <p>收藏</p>
                        </li>
                        <li>
                            <i className="iconfont icon-guanzhu" ></i>
                            <p>关注</p>
                        </li>
                        <li>
                            <i className="iconfont icon-jiaoyinzujifangke" ></i>
                            <p>足迹</p>
                        </li>
                    </ul>
                </div>

                {/* car */}
                <div className="car">
                    <p>购物车 >>> </p>
                    <p>共 件商品 </p>
                    <img src="https://s10.mogucdn.com/mlcdn/c45406/190815_3637hh8ac09e50j7f07i7eealck4i_513x360.png" alt=""/>

                </div>

                {/*  dingdan  */}
                <div className="dingdan">
                    <div className="dingdan1">
                        <h2>
                            我的订单
                        </h2>
                        <p>
                            全部>
                        </p>
                    </div>
                    <div className="dingdan2">
                        <ul>
                            <li>
                                <i className="iconfont icon-jieqian" ></i>
                                <p>待付款</p>
                            </li>
                            <li>
                                <i className="iconfont icon-daifahuo" ></i>
                                <p>代发货</p>
                            </li>
                            <li>
                                <i className="iconfont icon-daishouhuo" ></i>
                                <p>待收货</p>
                            </li>
                            <li>
                                <i className="iconfont icon-pingjia" ></i>
                                <p>评价</p>
                            </li>
                            <li>
                                <i className="iconfont icon-tuikuan" ></i>
                                <p>退款售后</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <Button style={{backgroundColor:"#ff5777",color:"#fff",marginTop:"0.4rem"}}>退出登录</Button>
                {/* ----------- */}
                <Foot></Foot>
            </div>
        )
    }
}


export default Mine