import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../Style/Home";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckExitsOrderAPI, CheckOrderAPI, CustomerAPI, GetOrderAPI, InsertHistoryAPI } from "../API/Home";
import FastImage from "react-native-fast-image";
import { Black } from "../Style/Colors";
import {Card, FAB} from 'react-native-paper';
import GetLocation from "react-native-get-location";
import axios from "axios";
import { AccountAction } from "../../redux/Actions/AccountAction";
const windowWidth = Dimensions.get('window').width;


const ButtonOrder = ({item, navigation,onHandlerReload}) => {
    const Account = useSelector(state=>state.Login)
    const dispatch = useDispatch();
    const onHandlerReceiveOrder = () => {
        if(Account.state == true) {
            Alert.alert('Cảnh báo','Bạn đang có đơn hàng, vui lòng đăng nhập lại để lấy thông tin đơn hàng',[
                {
                    text : 'OK',
                    onPress : ()=>{
                        navigation.goBack();
                    }
                }
            ])
        } else {
            onHandlerReload();
            CheckExitsOrderAPI(item._id, navigation, item,Account, true, dispatch)
            
        }
    }
    return(
        <TouchableOpacity style={styles.button} onPress={onHandlerReceiveOrder}>
            <Text style={styles.textButton}>Nhận đơn</Text>
        </TouchableOpacity>
    )
}
const renderUser = (item,index, setLatitue, setLongitue,navigation,onHandlerReload) => {
    console.log(item);
    const onPress = () => {
        setLatitue(item.latitude);
        setLongitue(item.longtitude);
    }
    
    return(
        <Card style={styles.containerInfo} key={index} mode='contained' onPress={onPress} onLongPress={onPress}>
            <View style={styles.containerHeader}>
                <Text style={styles.textHeader}>Thông tin đơn hàng</Text>
            </View>
            <View style={styles.containerBody}>
                <View style={styles.containerLogo}>
                    <Image source={require('../image/logoship.png')}
                        style={styles.image}
                        resizeMode='center'/>
                </View>
                <View style={styles.containerInformation}>
                    <Text style={styles.textLogo}>DEV FOOD DELIVERY</Text>
                    <Text style={styles.textName} numberOfLines={1}>Khách hàng: 
                        <Text style={styles.textDetailName}> {item.fullname}</Text>
                    </Text>
                    <Text style={styles.textName}>Số điện thoại: 
                        <Text style={styles.textDetailName}> {item.phone}</Text>
                    </Text>
                    <Text style={styles.textName} numberOfLines={1}>Địa chỉ: 
                        <Text style={styles.textDetailName}> {item.latitude}</Text>
                        <Text style={styles.textDetailName}> {item.longtitude}</Text>
                    </Text>
                    <View style={styles.containerButton}>
                        <ButtonOrder item={item} navigation={navigation} onHandlerReload={onHandlerReload}/>
                    </View>
                </View>
            </View>
        </Card>
    )
}
const Home = ({navigation}) => {
    const [user,setUser] = useState([]);
    const [index, setIndex] = useState();
    const [latitude, setLatitude] = useState(10.75810);
    const [longitue, setLongitue] = useState(106.6983);
    const Account = useSelector(state=>state.Login)
    const mapRef = useRef();
    const changeRegion = (location1, location2) => {
        const latitude = location1;
        const longitude = location2;
        // this.setState({ latitude, longitude });
        mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        })
    }
    // const handlerOnScroll = (event) => {
    //     console.log('Current Screen: ',Math.ceil(parseInt(event.nativeEvent.contentOffset.x/windowWidth*1.5)));
    //     setIndex(Math.ceil(parseInt(event.nativeEvent.contentOffset.x/windowWidth*1.5)));
    // }
    const onHandlerNavigatePosition = () => {
        setLatitude(Account.currentLatitude);
        setLongitue(Account.currentLongtitude);
    }
    const onHandlerReload =()=>{
        CustomerAPI(setUser);
    }
    const CheckOrder = () => {
        CheckOrderAPI(Account.id_Account,navigation)
    }
    useEffect(()=>{
        CustomerAPI(setUser);
        CheckOrder();
        console.log(Account)
    },[])
    useEffect(()=>{
        changeRegion(Number(latitude), Number(longitue));
    },[latitude])
    const getAddress = () => {
        // mapRef.current.addressForCoordinate(e.nativeEvent.coordinate)
        // .then((address) => {
        //   console.log('address', address); 
        // }).catch((err) => {
        //   console.log('err', err); 
        // })
        axios({
            method : 'get',
            url : 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=10.8236&longitude=106.6958&localityLanguage=vn'
        }).then(res=>console.log(res.data.localityInfo.administrative))
      }
    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={{
                    latitude: Account.currentLatitude,
                    longitude: Account.currentLongtitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }} 
                onPress={getAddress}
            >
                
                {
                    user.map((item, index)=>{
                        return(
                            <Marker key={index} 
                                coordinate={{
                                    latitude : Number(item.latitude),
                                    longitude : Number(item.longtitude)
                                }}
                                title={item.fullname}
                                onPress={()=>{}}>
                                    <Icon2 name="map-marker-star" size={32} color='#f75d83'/>
                            </Marker>
                        )
                    })
                }
                <Marker
                    coordinate={{
                        latitude : Account.currentLatitude,
                        longitude : Account.currentLongtitude
                    }}>
                        <Icon name="location-arrow" size={24} color='#f68319'/>
                </Marker>
                
            </MapView>
            <FAB style={styles.fab} icon='map-marker-account'color="#00ff"
                onPress={onHandlerNavigatePosition}/>
            <FAB style={[styles.fab,{top : 75}]} icon='reload'color="#00ff"
                onPress={onHandlerReload}/>
            <View style={styles.containerListInfo}>
                <FlatList data={user}
                        renderItem={({item})=>renderUser(item,index, setLatitude, setLongitue, navigation,onHandlerReload)}
                        keyExtractor={(item,index)=>index}
                        horizontal={true}/>
            </View>
        </View>
    )
}
export default Home;