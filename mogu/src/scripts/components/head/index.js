import React, { Component } from "react";

import { SearchBar,WhiteSpace } from "antd-mobile"

import { history } from "~/history"

import "./index.scss"

class Head extends Component {

    goSearch(){
        history.push("/search")
    }


    render() {
        return (
            <div className="head">
                <WhiteSpace />
                <div className="top">
                    <i className="iconfont icon-daohangfenlei" style={{ fontSize: '22px' }} ></i>
                    <SearchBar placeholder="开始种草吧~" ref={ref => this.autoFocusInst = ref} style={ {width:"88%"} } onFocus={ this.goSearch }  />
                    <i className="iconfont icon-xiaoxi1" key="0" style={{ fontSize: '22px' }} ></i>

                </div>

            </div>
        )
    }
}

export default Head