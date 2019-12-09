import React, { Component } from "react";
import "./index.scss"
import { history } from "~/history.js";
import HomeData from "../../mobx/homeData"
import { observer } from "mobx-react"
import { Modal, List, Button, WhiteSpace, WingBlank, Tag,Toast } from "antd-mobile"
import {axios} from "~/axios"

@observer
class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal2: false,
          modal1: false,
          goodColor:"",
          goodSize:"",
          iid:"",
          goodNum:1,
          colorList:[
                "粉色",
                "炫彩",
                "库兰",
                "多金",
                "酷黑",
                "海天蓝",
          ],
          sizeList:[
                "S",
                "M",
                "L",
                "XL",
                "XXL"
          ]
          

        };
      }

    componentDidMount() {
        const iid = history.location.pathname.split("/details/")[1]
        this.setState({
            iid
        })
        console.log(iid)
        if(iid){
            HomeData.GetGoodsDetails({ iid })
        }
        console.log(HomeData.goodsDetails)
    };
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
    onClose = key => () => {
        console.log(32)
    this.setState({
        [key]: false,
    });
    }

    changeColor=(i)=>{
        console.log(i)
        
    }

    changeNum=(e)=>{
        console.log(e.target.value)
        this.setState({
            goodNum:e.target.value
        })
    }

    numAdd=()=>{
        this.setState({
            goodNum:++this.state.goodNum
        })
    }
    
    numDesc=()=>{
        if(this.state.goodNum>1){
            this.setState({
                goodNum:--this.state.goodNum
            })
        }
    }
    //v添加购物车
    payGoods=()=>{
        console.log(30)
        this.setState({
            modal1:false
        })
        this.showToast()
    }
    
    // 前往结算
    sentGoods=()=>{
        this.setState({
            modal2:false
        })
        history.push("/car")
    };

    showToast() {
        Toast.info('添加购物车成功', 1);
        axios.post("/react/addToShopCar",{
            iid:this.state.iid,
            count:this.state.goodNum,
            img:HomeData.goodsDetails.img,
            title:HomeData.goodsDetails.title,
            price:HomeData.goodsDetails.price,
        }).then(res=>{
            console.log(res)
        })
    }
      

    render() {
        return (
            <div className="details">

                <div className="goodsImg">
                    { HomeData.goodsDetails.img&&<img src={HomeData.goodsDetails.img} alt="" /> }
                    <div className="price">
                        {HomeData.goodsDetails.price&&<b>￥{HomeData.goodsDetails.price} </b>}
                        <p>
                            {HomeData.goodsDetails.orgPrice&&<span> {HomeData.goodsDetails.orgPrice} `` </span>}
                            <em> 快抢价格 </em>
                        </p>
                        {HomeData.goodsDetails.props&&<div className="tab">
                            {HomeData.goodsDetails.props}
                        </div>}
                    </div>
                </div>
                {/* ---显示快枪 */}
                <div className="buy">
                    <img src="https://s10.mogucdn.com/mlcdn/c45406/190911_3helgk2lj16fd6chj4k30h5jf84fa_228x64.png" alt="" />
                    <h6> {HomeData.goodsDetails.title} </h6>
                    <div className="where clear">
                        <span>免邮费</span>
                        <em>广州广东</em>
                    </div>
                    <img src="https://s10.mogucdn.com/mlcdn/c45406/190911_2bei5geia424hj2a3352ide25hbd0_1500x152.png" alt="" className="time" />
                </div>

                {/* 底部加入购物车 */}
                <footer>
                    <div className="f1">
                        <div className="f1_01">
                            <i className="iconfont icon-ziyuan"></i>
                            <h3>店铺</h3>
                        </div>
                        <div className="f1_01">
                            <i className="iconfont icon-xiaoxi1"></i>
                            <h3>客服</h3>
                        </div>
                        <div className="f1_01">
                            <i className="iconfont icon-buoumaotubiao45"></i>
                            <h3>收藏</h3>
                        </div>

                    </div>
                    <div className="f2">
                        <Button className="fb"  onClick={this.showModal('modal1')}>加入购物车</Button>
                        <Button className="fb fb2"  onClick={this.showModal('modal2')} >立即购买</Button>
                    </div>
                </footer>

                {/* 点击购买弹窗 */}
                <div className="tan">
                    <WingBlank>
                        <WhiteSpace />
                        <Modal
                            popup
                            visible={this.state.modal2}
                            onClose={this.onClose('modal2')}
                            animationType="slide-up"
                        >
                            <div id="size"  style={ {height:"4.8rem",textAlign:"left"} }>
                                颜色
                                <div style={ {display:"flex",justifyContent:"space-around",margin:"0.3rem 0"} }>
                                    {this.state.colorList.map((k,i)=>{
                                        return(
                                        <Tag key={i} onChange={ ()=>{this.changeColor(i)}  } selected={this.state.colorFlag}  > {k} </Tag>
                                        )
                                    })}
                                </div>
                                尺码
                                <div style={ {display:"flex",margin:"0.3rem 0"} }>
                                    {this.state.sizeList.map((k,i)=>{
                                        return(
                                        <Tag key={i} onChange={ ()=>{this.changeColor(i)}  } selected={this.state.colorFlag}  > {k} </Tag>
                                        )
                                    })}
                                </div>
                                添加商品请点击加入购物车哦😊
                                {/* <div>
                                    <button onClick={ this.numDesc }  >-</button>
                                    <input type="number" name="points" min="1" max="100" value={this.state.goodNum} onChange={ (e)=>{this.changeNum(e)} } disabled style={{textAlign:"center"}}    />
                                    <button onClick={ this.numAdd}>+</button>
                                </div> */}
                                <Button style={{background:"linear-gradient(90deg,#ff5777,#ff468f)",marginTop:"0.3rem",color:"#fff"}} onClick={this.sentGoods} >确定</Button>
                                

                            </div>
                        </Modal>
                    </WingBlank>
                    <WingBlank>
                        <WhiteSpace />
                        <Modal
                            popup
                            visible={this.state.modal1}
                            onClose={this.onClose('modal1')}
                            animationType="slide-up"
                        >
                            <div id="size"  style={ {height:"5.3rem",textAlign:"left"} }>
                                颜色
                                <div style={ {display:"flex",justifyContent:"space-around",margin:"0.3rem 0"} }>
                                    {this.state.colorList.map((k,i)=>{
                                        return(
                                        <Tag key={i} onChange={ ()=>{this.changeColor(i)}  } selected={this.state.colorFlag}  > {k} </Tag>
                                        )
                                    })}
                                </div>
                                尺码
                                <div style={ {display:"flex",margin:"0.3rem 0"} }>
                                    {this.state.sizeList.map((k,i)=>{
                                        return(
                                        <Tag key={i} onChange={ ()=>{this.changeColor(i)}  } selected={this.state.colorFlag}  > {k} </Tag>
                                        )
                                    })}
                                </div>
                                数量
                                <div>
                                    <button onClick={ this.numDesc }  >-</button>
                                    <input type="number" name="points" min="1" max="100" value={this.state.goodNum} onChange={ (e)=>{this.changeNum(e)} } disabled style={{textAlign:"center"}}    />
                                    <button onClick={ this.numAdd}>+</button>
                                </div>
                                <Button style={{background:"linear-gradient(90deg,#ff5777,#ff468f)",marginTop:"0.3rem",color:"#fff"}} onClick={this.payGoods} >确定</Button>
                                

                            </div>
                        </Modal>
                    </WingBlank>
                </div>


                {/* --------- */}
            </div>
        )
    }
}

export default Details