import React , {Component} from "react";
import "./index.scss"
import {axios} from "~/axios"
import {observer } from "mobx-react"

import HomeData from "../../mobx/homeData"


@observer
class Mine extends Component {
    

    componentDidMount(){
        HomeData.getHome1List()
    }
    render(){
        return (
            <div className="home1">
                {
                    HomeData.home1List.map((item,index)=>{
                        return(
                            <a href={item.modelData.link} className="wrap" key={index}>
                                <img src={item.modelData.cover} alt=""/>
                                <p>{item.modelData.desc}</p>
                            </a>

                        )
                    })
                }
            </div>
        )
    }
}

export default Mine