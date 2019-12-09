import React , {Component} from "react";
import {Switch,Route,Redirect} from "react-router-dom"

import Lazyload from "~/lazyload";

// import Cart from "../cart"
// import Classify from "../classify"
// import Home from "../home"
// import Mine from "../mine"
// import Footer from "../../components/footer"
// import Header from "../../components/header"
// const Cart =Lazyload(()=>import("../cart"))
// const Classify =Lazyload(()=>import("../classify"))
const Home =Lazyload(()=>import("../home"))
const Mine =Lazyload(()=>import("../mine"))
const Zhibo =Lazyload(()=>import("../zhibo"))
const Shangcheng =Lazyload(()=>import("../shangcheng"))
// const Details =Lazyload(()=>import("../details"))

 class Main extends Component {
    render(){
        return (
            <div>
                {/* <Header></Header> */}
                <Switch>
                    <Route path ="/main/" exact render = { () => (<Redirect to="/main/home"/>) }  />  
                    {/* <Route path ="/main/cart" component={Cart} />   */}
                    {/* <Route path ="/main/classify" component={Classify} />   */}
                    <Route path ="/main/home" component={Home} />  
                    <Route path ="/main/mine" component={Mine} />  
                    <Route path ="/main/zhibo" component={Zhibo} />  
                    {/* <Route path ="/main/details/:iid" component={Details}/>   */}
                    <Route path ="/main/shangcheng" component={Shangcheng} />  
                    <Route render = { () => (<Redirect to="/main/home"/>) } />
                </Switch>
                {/* <Footer
                history ={this.props.history}
                location ={this.props.location}
                ></Footer> */}
            </div>
        )
    }
}

export default Main