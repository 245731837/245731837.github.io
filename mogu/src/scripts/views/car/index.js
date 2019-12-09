import React, { Component } from "react";
import "./index.scss"
import { history } from "~/history.js";
import { axios } from "~/axios"
import { Button ,Checkbox} from "antd-mobile"

import CarData from "../../mobx/car"
import { observer } from "mobx-react"

import { SearchBar, WhiteSpace } from "antd-mobile"

@observer
class Car extends Component {
    constructor() {
        super();
        this.state = {
            goodNum: 1,
            // gList: []
        }
    }
    componentDidMount() {
        // axios.post("react/getUserCar").then(res => {
        //     console.log(res.data.result)
        //     this.setState({
        //         gList: res.data.result
        //     })
        //     console.log(this.state.gList)
        // })
       
            CarData.GetUserCar()
            console.log(CarData)
        
    }

    toBack = () => {
        history.push("/main/shangcheng")
    }

    numAdd = (i,count) => {
        console.log(i)
        CarData.goodsAdd(i)
    }

    numDesc = (i,count) => {
        if(count>1){
            CarData.goodsDesc(i)
        }
    };

    checkOne=(e)=>{
        var checked = e.target.checked;
        var iid = e.target.iid;
        console.log(e.target)
        console.log(iid);
        CarData.changeCheckOne(checked,iid);
    }

    checkAll=(e)=>{
        console.log(e.target.checked);
        // CarData.quan = e.target.checked;
        CarData.changeQuan(e.target.checked)
    }

    changeNum=(e,iid)=>{
        console.log(e.target.value)
        var count =e.target.value;
        if(count>1&&count<=100){
            CarData.changeGoodsNum(iid,count)

        }
    }
    //删除选中
    del=()=>{
        CarData.del()
        console.log(111)
    }


    render() {
        const {
            gList,
            quan,
            total,
            checkNum,
            carNum
        } = CarData
        return (
            <div className="car">
                <div className="head">
                    <WhiteSpace />
                    <div className="top">
                        <i className="iconfont icon-jiaoyinzujifangke" style={{ fontSize: '22px' }} onClick={this.toBack} ></i>
                        <h2> 购物车({carNum}) </h2>
                        <i className="iconfont icon-xiaoxi1" key="0" style={{ fontSize: '22px' }} ></i>

                    </div>
                </div>

                {/* --- */}

                {
                    gList.map((k, i) => {
                        return (
                            <div className="goodList" key={i}>
                                <div className="title">
                                    <Checkbox 
                                    className="input"
                                    onChange={this.checkOne}
                                    iid={k.iid}
                                    checked={k.checked}
                                    ></Checkbox>
                                    <h5> 蘑菇街 </h5>
                                </div>
                                <div className="gd">
                                    <input type="checkbox" name="g2" style={ {opacity:0} } />
                                    <img src={k.img} alt="" />
                                    <div className="gd1">
                                        <p> {k.title} </p>
                                        <h3>颜色</h3>
                                        <h2>￥{k.price}</h2>
                                        <div className="gd_inp">
                                            <button onClick={()=>{this.numDesc(k.iid,k.count)} }  >-</button>
                                            <input type="number" name="points" min="1" max="100" value={k.count} onChange={(e) => { this.changeNum(e,k.iid) }} style={{ textAlign: "center" }}  />
                                            <button onClick={()=>{this.numAdd(k.iid,k.count)}}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

                {/* 底部 结算 */}

                <footer>
                    <div className="quan">
                        <span>全选</span>
                        <Checkbox className="quanB"  checked={quan} onChange={this.checkAll} ></Checkbox>
                    </div>
                    <p>
                    总价: <span>￥{total}</span>
                    </p>
                    <h5 onClick={ this.del } >删除选中</h5>
                    <Button inline>提交订单</Button>
                    <h6>
                        共计 <i>{checkNum}</i> 件商品
                    </h6>
                </footer>


                {/* ----------- */}
            </div>
        )
    }
}

export default Car