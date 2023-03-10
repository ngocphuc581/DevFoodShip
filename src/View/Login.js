import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { LoginAPI } from "../API/Login";
import { GreenDark,Yellow } from "../Style/Colors";
import { styles } from "../Style/Login";
import GetLocation from "react-native-get-location";
const Header = () => {
    return(
        <View style={styles.containerImage}>
            <Image source={require('../image/logoship.png')}
                style={styles.image}
                resizeMode='contain'/>
        </View>
    )
}
const Body = ({navigation}) => {
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [currentLatitude, setCurrentLatitude]= useState();
    const [currentLongitude, setCurrentLongitude] = useState();
    const dispatch = useDispatch();
    const onHandlerLogin = () => {
        LoginAPI(phone, password, dispatch, navigation, currentLatitude, currentLongitude);
    }
    const onHandlerCurrentPosition = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            // timeout: 15000,
        })
        .then(location => {
            console.log(location);
            setCurrentLatitude(location.latitude);
            setCurrentLongitude(location.longitude);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    }
    useEffect(()=>{
        onHandlerCurrentPosition();
    },[])
    return (
            <View style={styles.containerLogin}>
                <View style={styles.containerInput}>
                    <TextInput mode="flat"
                            label='Số điện thoại' 
                            style={{marginBottom : 8}}
                            theme={{colors : {primary :'#ffc800'}}}
                            keyboardType='number-pad'
                            value={phone}
                            onChangeText={text=>setPhone(text)}/>
                    <TextInput mode="flat"
                            label='Mật khẩu'
                            style={{marginBottom : 50}}
                            secureTextEntry={true}
                            theme={{colors : {primary :'#ffc800'}}}
                            value={password}
                            onChangeText={text=>setPassword(text)}/>
                    <TouchableOpacity style={styles.button} onPress={onHandlerLogin}>
                        <Text style={styles.textButton}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}
const Login = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <Header />
            <Body navigation={navigation}/>
        </View>
    )
}
export default Login;