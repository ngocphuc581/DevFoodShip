import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { API_General } from './API_General';
import {AccountAction} from '../../redux/Actions/AccountAction';
const API =API_General+'/Account_Shipper';
export const LoginAPI = (phone, password, dispatch, navigation, latitude, longtitude) => {
    axios({
        method : 'post',
        url :API+'/get',
        data : {
            phone : phone,
            password : password,
        }
    }).then(res=>res.data)
    .then(data=>{
        if(data == null){
            ToastAndroid.show('Sai tài khoản hoặc mật khẩu',ToastAndroid.SHORT);
        } else {
            updateAccountAPI(data._id,latitude, longtitude, dispatch, navigation)
        }
    })
    .catch(err=>console.log(err))
}
const updateAccountAPI = (_id, latitude, longtitude, dispatch, navigation) => {
    axios({
        method : 'post',
        url : API+'/updatePosition',
        data : {
            _id : _id,
            currentLatitude : latitude,
            currentLongtitude : longtitude,
        }
    }).then(res=>res.data)
    .then(data=>{
        dispatch(AccountAction(data._id, data.fullName,
            data.phone, data.email,data.state, latitude, longtitude))
        navigation.navigate('TabHome');
    })
}