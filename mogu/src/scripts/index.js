
import React ,{Component} from "react";
 import {HashRouter} from "react-router-dom"
 import ViewsIndex from "./views"
 

 export class MainRouter extends Component{
     render(){
         return(
            <HashRouter
            >

                <ViewsIndex></ViewsIndex>
            </HashRouter>
         )
     }
 }