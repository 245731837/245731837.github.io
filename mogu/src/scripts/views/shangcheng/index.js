import React , {Component} from "react";
import "./index.scss"
import Foot from "../../components/foot"
import Head from "../../components/head"
import { history } from "~/history.js";

import HomeData from "../../mobx/homeData"
import { observer } from "mobx-react"

import {Button} from "antd-mobile"

@observer
 class Shangcheng extends Component {

    componentDidMount(){
        HomeData.getShangChengnav1()
        HomeData.getShangChengnav2()
        
        //获取商品数据
        HomeData.getGoodsList()

    };
    toDetails(iid){
        console.log(iid);
        history.push(`/details/${iid}`)
    }

    render(){
        return (
            <div className="shangcheng">
                <Head></Head>
                <div className="nav1">
                    {
                        HomeData.shangchengnav1&&HomeData.shangchengnav1.map((k,i)=>{
                            return(
                                <a href={k.link} key={i}>
                                    <img src={k.backgroundImage} alt=""  />

                                </a>
                            )
                        })
                    }
                </div>
                {/* --------nav2 */}
                <div className="nav2">
                    {
                        HomeData.shangchengnav2&&HomeData.shangchengnav2.map((k,i)=>{
                            return(
                                <a href={k.link} key={i}>
                                    <img src={k.image} alt=""  />
                                    <p> {k.title} </p>
                                </a>
                            )
                        })
                    }
                </div>
                {/* ------商品详情展示 */}
                    <h4> —— 猜你喜欢 —— </h4>
                <div className="goods">

                    {
                        HomeData.goodsList&&HomeData.goodsList.map((k,i)=>{
                            return (
                                <div className="goodsList" key={i} >
                                    <img src={k.img} alt=""/>
                                    <p> {k.title} </p>
                                    <div className="price">
                                        <b>￥{k.price} </b>
                                        <span> {k.sale}k❤ </span>
                                    </div>
                                    <Button onClick={ ()=>{this.toDetails(k.iid)} } >点击购买</Button>
                                </div>
                            )
                        })
                    }

                </div>



                <Foot></Foot>
            </div>
        )
    }
}

export default Shangcheng