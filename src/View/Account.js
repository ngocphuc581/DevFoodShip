import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { styles } from "../Style/Account";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Black, GreenDark, Yellow, YellowFresh } from "../Style/Colors";
import { useSelector } from "react-redux";
import { GetHistoryShipperAPI } from "../API/Account";
const Header = () => {
    return (
        <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Thông tin cá nhân</Text>
        </View>
    )
}
const renderHistory = (item) => {
    return(
        <View style={styles.containerDetail}>
            <Image style={styles.logo}
                source={require('../image/logoship.png')}/>
            <View style={styles.containerTextDetail}>
                <Text style={styles.textDetail} numberOfLines={1}>Mã đơn hàng:<Text style={{color:Black}}> {item._id}</Text></Text>
                <Text style={styles.textDetail} numberOfLines={1}>Trạng thái đơn hàng:<Text style={{color:Black}}> {item.order_Status}</Text></Text>
                {
                    item.payment_Method =='Cash' ?
                    <Text style={styles.textDetail} numberOfLines={1}>Tổng tiền thu:<Text style={{color:Black}}> {item.total}.000 VNĐ</Text></Text>
                    : <Text style={styles.textDetail} numberOfLines={1}>Tổng tiền thu:<Text style={{color:Black}}> 0.000 VNĐ</Text></Text>
                }
                <Text style={[styles.textDetail,{color:Black}]} numberOfLines={1}>{item.createdAt.slice(0,10)} {item.createdAt.slice(11,19)}</Text>
            </View>
        </View>
    )
}
const Body = ({navigation}) => {
    const Account = useSelector(state=>state.Login)
    const [history, setHistory] = useState([]);
    const onHandlerLogout = () => {
        navigation.navigate('Login');
    }
    useEffect(()=>{
        GetHistoryShipperAPI(Account.id_Account, setHistory)
    },[])
    return(
        <View style={styles.containerBody}>
            <View style={styles.containerImage}>
                <View style={styles.image}>
                    <Icon name="user-secret" size={60} style={{marginLeft : 4}} color={Yellow}/>
                </View>
            </View>
            <View style={styles.containerInformation}>
                <View style={styles.containerTitle}>
                    <Text style={styles.textTitle}>Thông tin cá nhân :</Text>
                </View>
                <View style={styles.containerInfo}>
                    <Text style={styles.textInfo}>Họ và tên:</Text>
                    <Text style={styles.textName}>{Account.fullName}</Text>
                </View>
                <View style={styles.containerInfo}>
                    <Text style={styles.textInfo}>Số điện thoại:</Text>
                    <Text style={styles.textName}>{Account.phone}</Text>
                </View>
                <View style={styles.containerInfo}>
                    <Text style={styles.textInfo}>Trạng thái</Text>
                    {
                        Account.state == true ?
                        <Text style={styles.textName}>Đang có đơn hàng</Text>
                        : <Text style={styles.textName}>Không có đơn hàng</Text>
                    }
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={onHandlerLogout}>
                        <Text style={[styles.textName,{color : GreenDark}]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerHistory}>
                <View style={{width : '100%', height : '100%'}}>
                    <View style={styles.containerTitleHistory}>
                        <Text style={styles.textTitle}>Lịch sử đơn hàng đã giao :</Text>
                    </View>
                    <View style={styles.containerList}>
                        {/*Đây là item từng sản phẩm trong list*/}
                         
                        <FlatList data={history}
                                keyExtractor={(item,index)=>index}
                                renderItem={({item})=>renderHistory(item)}/>
                    </View>
                </View>
            </View>
        </View>
    )
}
const Account = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Header />
            <Body navigation={navigation}/>
        </View>
    )
}
export default Account;