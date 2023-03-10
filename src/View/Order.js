import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Linking,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ChangeStateAPI, GetCartAPI, GetFoodAPI } from "../API/Order";
import { GreenLight, orange, White, Yellow, YellowFresh } from "../Style/Colors";
import { styles } from "../Style/Order";
import SwipeButton from 'rn-swipe-button';
import arrow from '../image/arrow.png'
import { changeStateShipperAPI } from "../API/Home";
import { useDispatch, useSelector } from "react-redux";
import { AccountAction } from "../../redux/Actions/AccountAction";
//thay đổi order status trước khi vào detail đơn hàng
const Header = ({navigation, payment}) => {
    console.log(payment);
    const onHandlerBack = () =>{
        if(payment.order_Status =='Đã nhận đơn' || payment.order_Status =='Đang giao'){
            Alert.alert('Cảnh báo','Vui lòng hoàn thành đơn hàng',[
                {
                    text : 'OK',
                }
            ])
        } else{
            navigation.goBack();
        }
    }
    return(
        <View style={styles.containerHeader}>
            
            <TouchableOpacity onPress={onHandlerBack}>
                <Icon name="arrow-down-circle-sharp" size={32} color={YellowFresh}/>
            </TouchableOpacity>
            <Text style={styles.textHeader}>Đơn hàng hiện tại</Text>
        </View>
    )
}
const RenderFood = ({item}) => {
    const [food, setFood] = useState();
    const [img, setImg] = useState();
    useEffect(()=>{
        GetFoodAPI(item.id_Food, setFood, setImg);
    },[])
    return(
        <View style={styles.containerImage}>
            <Image source={{uri : img}}
                style={styles.image}/>
            <Text style={styles.textName}>{food}</Text>
        </View>
    )
}
const renderCart = (item) => {
    return(
        <View style={styles.containerItem}>
            <RenderFood item={item}/>
            <Text style={styles.textItem}>x{item.quantity}</Text>
            <Text style={styles.textItem}>{item.price}.000 VNĐ</Text>
        </View>
    )
}
const Body = ({Cart, info, navigation}) => {
    const [cart, setCart] = useState([]);
    const [state, setState] = useState('Đang giao');
    const Account = useSelector(state=>state.Login);
    const dispatch = useDispatch();
    const openGps = () => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
        var url = scheme + `${info.latitude}, ${info.longtitude}`
        openExternalApp(url)
    }
    const openExternalApp = (url) => {
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Alert.alert(
              'ERROR',
              'Unable to open: ' + url,
              [
                {text: 'OK'},
              ]
            );
          }
        });
    }
    const onHandlerChangeState = () => {
        if(state=='Đang giao'){
            ChangeStateAPI(Cart._id, 'Đang giao')
            setState('Hoàn tất');
        } else if(state=='Hoàn tất'){
            ChangeStateAPI(Cart._id, 'Hoàn tất');
            changeStateShipperAPI(Account, false);
            dispatch(AccountAction(Account.id_Account,
                Account.fullName, Account.phone, Account.email, false,
                Account.currentLatitude, Account.currentLongtitude))
            navigation.goBack();
        }
    }
    useEffect(()=>{
        GetCartAPI(Cart.id_Cart, setCart)
    },[])
    return(
        
        <View style={styles.containerBody}>
            <View style={styles.containerUser}>
                <View style={styles.containerTitleUser}>
                    <Text style={styles.textTitle}>Thông tin khách hàng :</Text>
                </View>
                <View style={styles.containerInfoUser}>
                    <Text style={styles.textContent}>Họ và tên:</Text>
                    <Text style={styles.textUser}>{info.fullname}</Text>
                </View>
                <View style={styles.containerInfoUser}>
                    <Text style={styles.textContent}>Số điện thoại:</Text>
                    <Text style={styles.textUser}>{info.phone}</Text>
                </View>
                <View style={styles.containerInfoUser}>
                    <Text style={styles.textContent}>Địa chỉ:</Text>
                    <Text style={styles.textUser}>{info.address}</Text>
                </View>
                <View style={styles.containerMap}>
                    <TouchableOpacity style={styles.buttonMap} onPress={openGps}>
                        <Text style={styles.textButton}>Hướng dẫn đường đi</Text>
                        <Icon name="map" size={28} color={orange}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerCart}>
                <View style={[styles.containerTitleUser,{paddingLeft : 10}]}>
                    <Text style={styles.textTitle}>Thông tin thức ăn :</Text>
                </View>
                <View style={styles.containerFood}>
                    <FlatList data={cart}
                            renderItem={({item})=>renderCart(item)}
                            keyExtractor={(item,index)=>index}/>
                </View>
                <View style={styles.containerTotal}>
                    <Text style={styles.textTotal}>Tổng tiền thu</Text>
                    {
                        Cart.payment_Method == 'Cash' ?
                        <Text style={styles.textTotal}>{Cart.total}.000 VNĐ</Text>
                        : <Text style={styles.textTotal}>0.000 VNĐ</Text>
                    }
                </View>
            </View>
            <View style={styles.containerSwipe}>
                <SwipeButton 
                    swipeSuccessThreshold={70}
                    title={state}
                    onSwipeSuccess={onHandlerChangeState}
                    railFillBackgroundColor={orange}
                    railBackgroundColor={orange}
                    railBorderColor={orange}
                    railFillBorderColor={orange}
                    thumbIconBorderColor={White}
                    thumbIconBackgroundColor={YellowFresh}
                    disabled={false}
                    shouldResetAfterSuccess={true}
                    thumbIconImageSource={arrow}
                    />
            </View>
        </View>
    )
}
const Order = ({route, navigation}) => {
    const {res,item} = route.params;
    return(
        <View style={styles.container}>
            <Header navigation={navigation} payment={res}/>
            <Body Cart={res} info={item} navigation={navigation}/>
        </View>
    )
}
export default Order;