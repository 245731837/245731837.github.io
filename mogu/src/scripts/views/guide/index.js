import React, { Component } from "react";
import "./index.scss"
import { history } from "~/history.js"
// import Header from "../../components/header"

import { Button, WhiteSpace, WingBlank, Carousel } from "antd-mobile"

var timer = null;
export default class Guide extends Component {
    constructor() {
        super();
        this.state = {
            imgList: [
                "https://wx4.sinaimg.cn/mw690/6ffff2e2gy1g8rv5mc78wj20rk1e5e81.jpg",
                "https://wx1.sinaimg.cn/mw690/6ffff2e2ly1g8o3zagptfj20rk1e51kx.jpg",
                "https://wx3.sinaimg.cn/mw690/6ffff2e2ly1g94ao7um3qj20u01hckju.jpg"
            ],
            count: 3,
            txt: "跳过 3s"
        }
    }
    toHome(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            window.event.cancelBubble = true;
        }
        clearInterval(timer)
        history.push("/main")
    };
    startCount() {
        timer = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count,
                    txt: `跳过 ${this.state.count}s`
                })
                console.log(11111)           
            } 
            if(this.state.count < 0){
                this.setState({
                    count: 3,
                })
                clearInterval(timer)
                console.log(22222)
            }
            
        }, 1000);
    }

  
    render() {
        return (
            <div className="guide">
                <Carousel
                    autoplay={false}
                    infinite={false}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => index == 2?this.startCount():""}
                >
                    {this.state.imgList.map((item, index) => {
                        return (
                            <a
                                key={index}
                                style={{ display: 'inline-block', width: '100%', height: "100vh" }}
                            >
                                <img
                                    src={item}
                                    alt=""
                                    style={{ width: '100%', height: "100vh", verticalAlign: 'top' }}

                                />
                                {index == 2 && <button className="g_btn" onClick={this.toHome} > {this.state.txt}</button>}
                                {/* {index == 2 && <span onClick={this.startCount()}></span>} */}
                            </a>
                        )
                    })}
                </Carousel>



            </div>
        )
    }
    componentWillUnmount(){
        clearInterval(timer);
        timer = null;
    }
    
}