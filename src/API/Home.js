import axios from 'axios';
import { Alert } from 'react-native';
import { AccountAction } from '../../redux/Actions/AccountAction';
import { API_General } from './API_General';
const API = API_General+'/OrderShipper';
export const CustomerAPI = (setUser) => {
    axios({
        method : 'get',
        url : API+'/get',
    }).then(res=>{
        setUser(res.data);
        console.log(res.data)
    })
}
export const CheckExitsOrderAPI = (id_Account,navigation, item, id_Shipper, state, dispatch) => {
    axios({
        method : 'post',
        url : API+'/getOrder2',
        data : {
            id_Account : id_Account,
        }
    }).then(res=>res.data)
    .then(res=>{
        if(res == ''){
            console.log(res);
            Alert.alert('Cảnh báo','Đơn hàng này đã được shipper nhận')
        } else {
            GetOrderAPI(id_Account,navigation, item, id_Shipper, state)
            dispatch(AccountAction(id_Shipper.id_Account,
                id_Shipper.fullName, id_Shipper.phone, id_Shipper.email, true,
                id_Shipper.currentLatitude, id_Shipper.currentLongtitude))
        }
    })
    .catch(err=>console.log(err))
}
export const GetOrderAPI = (id_Account,navigation, item, id_Shipper, state) => {
    axios({
        method : 'post',
        url : API+'/getOrder',
        data : {
            id_Account : id_Account,
        }
    }).then(res=>res.data)
    .then(res=>{
        ChangeStateAPI(res,id_Shipper,item,navigation, state)
    }).catch(err=>console.log(err))
}
const ChangeStateAPI = (payment,id_Shipper,item,navigation, state)=>{
    axios({
        method : 'post',
        url : API+'/changeStateReceive',
        data : {
            _id : payment._id,
        }
    }).then(res=>res.data)
    .then(stateReceive=>{
        InsertHistoryAPI(payment, id_Shipper,item,navigation,state)
    })
    .catch(err=>console.log(err))
}
export const InsertHistoryAPI = (res, id_Shipper,item,navigation,state) =>{
    axios({
        method : 'post',
        url : API+'/receiveOrder',
        data : {
            id_Payment : res._id,
            id_Shipper : id_Shipper.id_Account,
        }
    }).then(res=>res.data)
    .then(insert=>{
        changeStateShipperAPI(id_Shipper, state)
        navigation.navigate('Order', {res,item});
    })
    .catch(err=>console.log(err))
}
export const changeStateShipperAPI = (id_Shipper, state) => {
    axios({
        method : 'post',
        url : API+'/changeStateShipper',
        data : {
            _id : id_Shipper.id_Account,
            state : state, //true or false (true đang có đơn hàng, false đang rảnh)
        }
    }).then(res=>res.data)
    .then(res=>{
        console.log(res)
    })
    .catch(err=>console.log(err))
}

export const CheckOrderAPI = (id_Shipper, navigation) => {
    axios({
        method : 'post',
        url : API+'/checkOrder',
        data : {
            id_Shipper : id_Shipper,
        }
    }).then(res=>res.data)
    .then(res=>{
        console.log(res)
        GetCardAPI(res, navigation)
    })
    .catch(err=>console.log(err))
}
    
const GetCardAPI = (res, navigation)=>{
        axios({
            method : 'post',
            url : API+'/getCart',
            data : {
                _id : res.id_Cart,
            }
        }).then(res=>res.data)
        .then(cart=>{
            GetUserAPI(cart.id_Account,res,navigation)
        }).catch(err=>console.log(err))
    }
const GetUserAPI = (id_Account,res,navigation)=>{
    axios({
        method : 'post',
        url : API+'/getUser',
        data : {
            _id : id_Account,
        }
    }).then(res=>res.data)
    .then(item=>{
        navigation.navigate('Order', {res,item});
    }).catch(err=>console.log(err))
}
// Lấy id tài khoản sau đó map trong giỏ hàng
// tìm hết tất cả giỏ hàng của tài khoản đó 
// sau đó tìm trong db payment xem cart đó đang có trạng thái đang giao
