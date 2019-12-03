// 路由懒加载 

import React from 'react';
import Loadable from 'react-loadable';

//通用的过场组件 组件加载之前的动画 
const loadingComponent =()=>{
    return (
        <div>loading</div>
    ) 
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = loadingComponent)=>{
    return Loadable({
        loader,   // 需要懒加载的组件 
        loading
    });
}