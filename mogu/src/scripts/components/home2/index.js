import React , {Component} from "react";
import "./index.scss"
import {axios} from "~/axios"
import {observer } from "mobx-react"
import {Button} from "antd-mobile"

import HomeData from "../../mobx/homeData"


@observer
class Mine extends Component {
    

    componentDidMount(){
        HomeData.getHome1List()
    }
    render(){
        return (
            <div className="home2">
                <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2471593242,3642602060&fm=26&gp=0.jpg" alt=""/>
               <p>你还没有关注任何人</p>
               <Button inline style={{backgroundColor:"#ff5777",color:"#fff",marginTop:"0.3rem"}}>去精选看看</Button>

            </div>
        )
    }
}

export default Mine