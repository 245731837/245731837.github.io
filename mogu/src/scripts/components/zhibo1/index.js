import React, { Component } from "react";
import "./index.scss"
import { axios } from "~/axios"
import { observer } from "mobx-react"

import HomeData from "../../mobx/homeData"


@observer
class ZhiBo1 extends Component {


    componentDidMount() {
        HomeData.getZhiBo1List()
        console.log(HomeData.zhibo1List)
    }
    render() {
        return (
            <div className="ZhiBo1">
                {
                    HomeData.zhibo1List&&HomeData.zhibo1List.map((item, index) => {
                        return (
                            <div key={index} className="wrap">
                                <h2> {item.userName} </h2>
                                <img src={item.bgImg} className="img1" alt="" />
                                <img src={item.avatar} className="img2" alt="" />
                                <div className="wrap01">
                                    <h3> {item.intro} </h3>
                                    <div className="wi">
                                        {item.shopCarts.goods.map((k,i)=>{
                                            return(
                                                <img src={k.cover} alt="" key={i} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ZhiBo1