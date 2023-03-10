import axios from "axios";

const { API_General } = require("./API_General");

const API = API_General+'/OrderShipper';
export const GetCartAPI =(id_Cart, setCart) => {
    axios({
        method : 'post',
        url : API+'/getCart',
        data : {
            _id : id_Cart,
        }
    }).then(res=>res.data)
    .then(res=>{
        // console.log(res.detail_Cart);
        setCart(res.detail_Cart);
    }).catch(err=>console.log(err))
}
export const GetFoodAPI = (id_Food, setFood, setImg) => {
    axios({
        method : 'post',
        url : API+'/getFood',
        data : {
            _id : id_Food,
        }
    }).then(res=>res.data)
    .then(res=>{
        setFood(res.name);
        setImg(res.img);
        // console.log(res);
    }).catch(err=>console.log(err))
}
export const ChangeStateAPI = (_id, order_Status)=>{
    axios({
        method : 'post',
        url : API+'/changeState',
        data : {
            _id : _id,
            order_Status: order_Status,
        }
    }).then(res=>res.data)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}