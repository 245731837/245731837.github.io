import React , {Component} from "react";
import "./index.scss"
import {observer } from "mobx-react"

import HomeData from "../../mobx/homeData"


@observer
class Home5 extends Component {

    componentDidMount(){
        HomeData.getHome5List()
        console.log(HomeData,"3333333")
    }
    render(){
        return (
            <div className="home1">
                {
                    HomeData.home5List.map((item,index)=>{
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

export default Home5