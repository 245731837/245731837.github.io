import React , {Component} from "react";
import "./index.scss";
import Foot from "../../components/foot"

import { Button, WhiteSpace,Tabs } from "antd-mobile"

import ZhiBo1 from "../../components/zhibo1"

export default class Zhibo extends Component {
    constructor(){
        super();
        this.state={
            tabs : [
                { title: '热门' },
                { title: '关注' },
                { title: '穿搭' },
                { title: '美妆' },
              ]
        }
    }
    render(){
        return (
            <div className="zhibo">
                {/* 选项卡内容 */}
                <div className="select">
                    <WhiteSpace />
                    <Tabs tabs={this.state.tabs} initialPage={0}  swipeable useOnPan animated 
                        tabBarUnderlineStyle={{border:"1px solid deeppink"}} tabBarInactiveTextColor="#000" tabBarActiveTextColor="deeppink">
                        
                        <ZhiBo1></ZhiBo1>
                            
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            暂无关注
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            后面内容都差不多
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            美妆也差不多
                        </div>
                        </Tabs>
                    <WhiteSpace />
                    </div>
                    {/* ================== */}
                <Foot></Foot>
            </div>
        )
    }
}