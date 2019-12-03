import {observable,action} from "mobx";
import {axios} from "~/axios"

class HomeData{
    @observable bannerList =[]  //banner 图数据
    @observable.deep userPhone =""  //banner 图数据
    @observable.deep home1List =[]  //home1 数据
    @observable.deep home3List =[]  //home3 数据
    @observable.deep home4List =[]  //home4 数据
    @observable.deep home5List =[]  //home5 数据

    @observable.deep zhibo1List =[]  //直播1 数据
    
    @observable.deep shangchengnav1 =[]  //商城nav1 数据
    @observable.deep shangchengnav2 =[]  //商城nav1 数据
    @observable.deep goodsList =[]  //商城nav1 数据


    //请求异步数据
    @action getPhone =()=>{
        axios.post("/react/homeGetPhone").then(res=>{
            this.userPhone =res.data.phone
        })
    }
    
    //请求异步数据
    @action getHome1List =()=>{
        if(this.home1List.length<=0){
            axios.post("/react/home1Data").then(res=>{
                this.home1List =res.data.home1List
            })

        }
    }

    //请求异步数据
    @action getHome3List =()=>{
        axios.post("/react/home3Data").then(res=>{
            console.log("getHome3List",res)
            this.home3List =res.data.home3List
        })
    }

    //请求异步数据
    @action getHome4List =()=>{
        if(this.home4List.length<=0){
            axios.post("/react/home4Data").then(res=>{
                console.log(res)
                this.home4List =res.data.home4List
            })

        }
    }
    //请求异步数据
    @action getHome5List =()=>{
        if(this.home5List.length<=0){
            axios.post("/react/home5Data").then(res=>{
                console.log(res)
                this.home5List =res.data.home5List
            })

        }
    }


    //请求异步 直播01 数据
    @action getZhiBo1List =()=>{
        if(this.zhibo1List.length<=0){
            axios.post("/react/zhibo1").then(res=>{
                console.log(res)
                this.zhibo1List =res.data.zhibo1List
                console.log(res.data.zhibo1List)
            })

        }
    }


    //请求异步 商城01 数据
    @action getShangChengnav1 =()=>{
        if(this.shangchengnav1.length<=0){
            axios.post("/react/shangchengnav1").then(res=>{
                // console.log(res)
                this.shangchengnav1 =res.data.shangchengnav1
                // console.log(res.data.shangchengnav1)
            })
        }
    }

    //请求异步 商城02 数据
    @action getShangChengnav2 =()=>{
        if(this.shangchengnav2.length<=0){
            axios.post("/react/shangchengnav2").then(res=>{
                // console.log(res)
                this.shangchengnav2 =res.data.shangchengnav2
                // console.log(res.data.shangchengnav2)
            })

        }
    }

    //请求异步 商城的商品  数据
    @action getGoodsList =()=>{
        if(this.goodsList.length<=0){
            axios.post("/react/getGoods").then(res=>{
                console.log(res)
                this.goodsList =res.data.result
                console.log(this.goodsList)
            })

        }
    }

    
}

export default new HomeData;