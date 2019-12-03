import React, {Component} from "react";
import {Switch,Route,Redirect } from "react-router-dom";

//引入懒加载
import Lazyload from "~/lazyload"

const Main =Lazyload(()=>import("./main"))

const Guide =Lazyload(()=>import("./guide"))
// const Search =Lazyload(()=>import("./search"))
const Login =Lazyload(()=>import("./login"))
// const Scan =Lazyload(()=>import("./scan"))
// const Photo =Lazyload(()=>import("./photo"))


 class ViewsIndex extends Component {
    render(){
        return (
            <Switch>
                <Route path="/" exact render= {() =>(<Redirect to="/guide" />) } />
                <Route path="/main" component={ Main } />
                <Route path="/guide" component={ Guide } />
                <Route path="/login" component={ Login } />
                {/* <Route path="/search" component={ Search } />
                <Route path="/scan" component={ Scan } />
                <Route path="/photo" component={ Photo } /> */}
                <Route render={()=>(<Redirect to="/main/home"/>)}/>
            </Switch>
          
        )
    }
} 

export default ViewsIndex