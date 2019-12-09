import {observable,action,computed} from "mobx";
import {axios} from "~/axios"

class Cart {
    @observable.deep gList=[];    //购物商品数据
    // @observable.deep total=0;       //商品总价
    // @observable.deep carNum=0;      //购物车商品数量
    // @observable.deep checkNum=0;      //选中商品数量
    // @observable.deep quan=false;      //全选

    // @observable.deep searchFlag=true;      //全选

    //用计算属性代替上面 因为要计算
    @computed get carNum(){
        var num=0;
        this.gList.forEach(item=>{
            num+=item.count*1;
        })
        return num
    }

    //选中商品数量
    @computed get checkNum(){
        var num=0;
        this.gList.forEach(item=>{
            if(item.checked){
                num+=item.count;
            }
        })
        return num
    }

    //商品总价
    @computed get total(){
        var num=0;
        this.gList.forEach(item=>{
            if(item.checked){
                num+=item.price * item.count;
            }
        })
        return num.toFixed(2)
    }

    //计算全选
    @computed get quan(){
        var flag =true;
        this.gList.forEach(item=>{
            if(!item.checked){
                flag=false
            }
        })
        return flag
    }
    //当主动改变时 要用set
    // set quan(newval){   //前听圈
    //     console.log(newval);
    //     this.gList =this.gList.map((item)=>{
    //         item.checked=newval
    //         return item
    //     })
    // }




    //请求异步数据
    @action GetUserCar =()=>{
        axios.post("react/getUserCar").then(res => {
            console.log(res.data.result)
            this.gList =res.data.result
            console.log(this.gList)
        })
    }

    // 改变单选反选
    @action changeCheckOne=(checked,iid)=>{
        axios.post("/react/changechecked",{
            checked,iid
        }).then(res=>{
            this.gList =this.gList.map((item)=>{
                if(item.iid==iid){
                    item.checked=checked
                }
                return item
            })

        })
    }

    //全选
    @action changeQuan=(checked)=>{
        axios.post("/react/changechecked",{
            checked,
            iid:"-1"
        }).then(res=>{
            this.gList =this.gList.map((item)=>{
                item.checked =checked
                return item
            })
        })

    }

    //购物车加加
    @action goodsAdd=(iid)=>{
        axios.post("/react/changecount",{
            flag:true,
            iid,
            count:"-1"
        }).then(res=>{

            this.gList=this.gList.map((item,index)=>{
                if(item.iid==iid){
                    item.count++
                }
                return item
            })

        })
    }
    //购物车减减
    @action goodsDesc=(iid)=>{
        axios.post("/react/changecount",{
            flag:false,
            iid,
            count:"-1"
        }).then(res=>{
            this.gList=this.gList.map((item,index)=>{
                if(item.iid==iid){
                    item.count--
                }
                return item
            })

        })
    }
    //购物车手动输入数量
    @action changeGoodsNum=(iid,count)=>{
        axios.post("/react/changecount",{
            iid,
            count
        }).then(res=>{
            this.gList=this.gList.map((item,index)=>{
                if(item.iid==iid){
                    item.count=count
                }
                return item
            })

        })
    }

     //删除选中
    @action del=()=>{
        axios.post("/react/delSelect").then(res=>{
            this.gList=this.gList.filter((item)=>{
                return !item.checked
            })

        })
    }



}

export default new Cart