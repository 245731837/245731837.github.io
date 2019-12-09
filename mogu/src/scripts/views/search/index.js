import React , {Component} from "react";
import "./index.scss"

import { SearchBar,WhiteSpace,Tag ,Button} from "antd-mobile"

import HomeData from "../../mobx/homeData"
import { observer } from "mobx-react"

import {history} from "~/history"

@observer
class Search extends Component {

    toback=()=>{
        history.push("/main/shangcheng")
    }

    componentDidMount(){

    };

    toSearch=(e)=>{
        // console.log(e.target.value)
        console.log(e)
        HomeData.getSearch(e)
    }

    toCancel=(e)=>{
        HomeData.getCancel()
    }


    render(){
        
        return (
            <div className="search"  >
                {/*  头部 */}
                <div className="head">
                <WhiteSpace />
                <div className="top">
                    <i className="iconfont icon-jiaoyinzujifangke" style={{ fontSize: '22px' }} onClick={this.toback} ></i>
                    <SearchBar 
                    placeholder="开始种草吧~" 
                    ref={ref => this.autoFocusInst = ref} 
                    style={ {width:"88%"} }  
                    onSubmit={ (e)=>{this.toSearch(e)} }
                    onCancel={ (e)=>{this.toCancel(e)} }
                     />
                    <i className="iconfont icon-xiaoxi1" key="0" style={{ fontSize: '22px' }} ></i>
                </div>
                </div>
                {/* ------ */}
                {HomeData.searchFlag&&<div className="hot">
                    <h2> <i className="iconfont icon-buoumaotubiao45"></i>  热门搜索 </h2>
                    <div className="hotTag">
                        <Tag className="tagp"  selected>毛衣</Tag>
                        <Tag className="tagp"  >毛呢短裤</Tag>
                        <Tag className="tagp"  selected>小脚牛仔裤</Tag>
                        <Tag className="tagp"  >腰带短裙</Tag>
                        <Tag className="tagp"  selected  >打底裙</Tag>
                        <Tag className="tagp">加绒牛仔裤</Tag>
                        <Tag className="tagp"  >丝绒短裤</Tag>
                        <Tag className="tagp"  >网纱蕾丝</Tag>
                        <Tag className="tagp"  >针织连衣裙</Tag>
                        <Tag className="tagp"  selected>卫衣</Tag>
                    </div>
                    
                    </div>}

                {/*  搜索后显示的内容 */}
                {
                   !HomeData.searchFlag&&<div className="didSearch" >
                       {
                           HomeData.searchList&&HomeData.searchList.map((k,i)=>{
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
                }
              

             

                
            </div>
        )
    }
}


export default Search