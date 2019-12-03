import React, { Component } from "react";

import { SearchBar,WhiteSpace ,TabBar} from "antd-mobile"

import { history } from "~/history"

import "./index.scss"

class Head extends Component {
    constructor() {
        super();
        this.state = {
            footList: [
                { txt: "首页", path: "/main/home", name: "home", icon: "icon-zhuye" },
                { txt: "直播", path: "/main/zhibo", name: "zhibo", icon: "icon-kefu" },
                { txt: "商城", path: "/main/shangcheng", name: "shangcheng", icon: "icon-ziyuan" },
                { txt: "我的", path: "/main/mine", name: "mine", icon: "icon-guanzhu" }
            ],
            selectedTab: "home"
        }
    };
    componentDidMount() {
        const nowName = history.location.pathname.split("/main/")[1]
        this.setState({
            selectedTab: nowName
        })
    }
    render() {
        return (
            <div className="foot">
                   <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    tabBarPosition="bottom"
                >
                    {
                        this.state.footList.map((item, index) => {
                            return (
                                <TabBar.Item
                                    title={item.txt}
                                    key={index}
                                    icon={<div style={{
                                        width: '26px',
                                        height: '26px',
                                        fontSize: "20px"
                                    }}
                                        className={"iconfont " + item.icon}
                                    />
                                    }
                                    selectedIcon={<div style={{
                                        width: '26px',
                                        height: '26px',
                                        fontSize: "20px"
                                    }}
                                        className={"iconfont " + item.icon}
                                    />
                                    }
                                    selected={this.state.selectedTab === item.name}
                                    badge={item.name == "cart" ? 6 : ""}
                                    onPress={() => {
                                        this.setState({
                                            selectedTab: item.name,
                                        });
                                        history.push(item.path)
                                    }}
                                >

                                </TabBar.Item>
                            )
                        })
                    }
                </TabBar>         

            </div>
        )
    }
}

export default Head