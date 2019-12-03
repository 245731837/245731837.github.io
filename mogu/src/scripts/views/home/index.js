import React , {Component} from "react";
import "./index.scss"
import { history } from "~/history.js";
import { axios } from "~/axios.js";
import {observer } from "mobx-react"
import HomeData from "../../mobx/homeData"
import Head from "../../components/head/index"
import Foot from "../../components/foot"

import Home1 from "../../components/home1"
import Home2 from "../../components/home2"
import Home3 from "../../components/home3"
import Home4 from "../../components/home4"
import Home5 from "../../components/home5"

import { Button, WhiteSpace, WingBlank, Carousel,Tabs,Badge } from "antd-mobile"


@observer
class Home extends Component {
    constructor(){
        super();
        this.state={
            bannerList:[
                "https://s11.mogucdn.com/mlcdn/c45406/191129_6k4a3lgcl4lf7293cli4l9ck2307i_1125x390.jpg_999x999.v1c0.81.webp",
                "https://s17.mogucdn.com/mlcdn/c45406/191129_1bdabfkl92allah78e0gccb7h8k20_1125x390.jpg_999x999.v1c0.81.webp",
                "https://s18.mogucdn.com/mlcdn/c45406/191128_6j252h330gagg6fiehf4hfabl9a6c_1125x390.jpg_999x999.v1c0.81.webp"
            ],
            xianshi:[
                "https://s5.mogucdn.com/mlcdn/1689c6/190902_31j1j3e7fdack0bakil37g3ib8cfe_210x280.png",
                "https://s10.mogucdn.com/mlcdn/c45406/191113_6bd38897gk07kf9hh4eg75ef06217_248x248.jpg",
                "https://s10.mogucdn.com/mlcdn/c45406/190822_1848je8ael2lh4g3k0k9h6f9b14l7_248x248.gif",
                "https://s10.mogucdn.com/mlcdn/c45406/190910_4d1chca388fkh30jdb0ih1b558hee_248x248.png"
            ],
            newsList:[
                "https://s10.mogucdn.com/mlcdn/c45406/191025_5289fkljd9d0g8i3752e1425h5k5j_150x150.gif_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_10ba435l8ffa822hh22l1467c75d9_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_341k4a24f2g43k2f831a3308lfb3e_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_251e01b9hi91bc6ej7fa47a2j475c_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_0a6lbac2gb52fib775b9df1eac03c_135x135.jpg_640x640.v1cAC.40.webp",

                "https://s10.mogucdn.com/mlcdn/c45406/191021_686fch2babajk5hg13f82abg9974b_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_2dl3l8cc09l682j5j4hl3hce2k8de_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/190627_453h1450k9j52k5fl1l1d33c40j5a_150x150.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_1398c6c3c8cg3g5e69a1d8kk4693f_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_7bk0111hd1j1j06d5043ai5bfddj9_135x135.jpg_640x640.v1cAC.40.webp",

                "https://s10.mogucdn.com/mlcdn/c45406/191021_0843i45f95jdjd0ga12ica2hhh19g_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191023_1h5gbb8ld8j45hd79fb19k23g97if_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_24l35fe6d4ahj8a4hlhfbfe6325d5_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_49d8ahhd396k6ccjg88119abdkkid_135x135.jpg_640x640.v1cAC.40.webp",
                "https://s10.mogucdn.com/mlcdn/c45406/191021_824j74bke6a76i0h4714acachf0fh_135x135.jpg_640x640.v1cAC.40.webp"

            ],
            tabs : [
                { title: '发现' },
                { title: '关注' },
                { title: '遮肉显瘦' },
                { title: '温柔风' },
                { title: '遮小粗腿' },
                { title: '韩系' },
                { title: '遮小肚腩' },
                { title: '发型' },
                { title: '显长腿' },
                { title: '梨型身材' },
              ]
        }
    }
    componentDidMount(){
        // HomeData.getHome3List()
        // console.log("Home3Home3",HomeData.home3List)
    }
    render(){
        const {
            bannerList,
            userPhone
            
        } =HomeData
        return (
            <div className="home">
                {/* 头部 */}
                <Head></Head>
                {/* banner图区··········· */}
                <div className="banner">
                    <Carousel
                        autoplay={false}
                        infinite={false}
                        autoplay={true}
                        infinite={true}
                        className="clear"
                    >
                        {this.state.bannerList&&this.state.bannerList.map((item, index) => {
                            return (
                                <a
                                    key={index}
                                    style={{ display: 'block', width: '100%', height: "3rem" }}
                                >
                                    <img
                                        src={item}
                                        alt=""
                                        style={{ width: '100%', height: "3rem", verticalAlign: 'top' }}

                                    />
                                </a>
                            )
                        })}
                    </Carousel>
                    {/* ---------- */}
                    </div>
                    <div className="newsList">
                        {
                            this.state.newsList&&this.state.newsList.map((item,index)=>{
                                return (
                                    <div className="newsList01" key={index}>
                                        <img src={item} />

                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* 选项卡内容 */}
                    <div className="select">
                    <WhiteSpace />
                        <Tabs tabs={this.state.tabs} initialPage={0}  swipeable useOnPan animated 
                        tabBarUnderlineStyle={{border:"1px solid deeppink"}} tabBarInactiveTextColor="#000" tabBarActiveTextColor="deeppink">
                        <Home1></Home1>
                        <Home2></Home2>
                        <Home3></Home3>
                        <Home4></Home4>
                        <Home5></Home5>
                            
                        
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            写不完拉
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
                            写不完拉
                        </div>
                        </Tabs>
                    <WhiteSpace />
                    </div>
                        {/* foot */}
                        <Foot></Foot>
                        {/* =--------- */}
                
            </div>
        )
    }
}

export default Home