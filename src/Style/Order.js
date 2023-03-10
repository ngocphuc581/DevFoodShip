import {
    StyleSheet,
    Dimensions
} from 'react-native';
import { Black, Gray, orange, Red, Yellow, YellowFresh } from './Colors';
import { font1, font2, font3, font4 } from './Fonts';
export const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
    },
    containerHeader : {
        width : '100%',
        height : '7%',
        backgroundColor : orange,
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
        paddingLeft : 15,
        paddingRight : 15,
    },
    textHeader : {
        fontSize : 22,
        color : YellowFresh,
        fontFamily : font3,
    },
    containerBody : {
        width : '100%',
        height : '93%',
    },
    containerUser : {
        width : '100%',
        height : '30%',
    },
    containerTitleUser : {
        width : '100%',
        height : 40,
        justifyContent : 'center',
        paddingLeft : 15,
    },
    textTitle : {
        fontSize : 20,
        fontFamily : font4,
        textDecorationLine : 'underline',
        color : Black,
    },
    containerInfoUser : {
        width : '100%',
        height : 30,
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingLeft : 15,
        paddingRight : 15,
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderColor : Gray,
    },
    textContent : {
        fontSize : 16,
        color : Gray,
    },
    textUser : {
        fontSize : 18,
        color: Black,
    },
    containerMap :{
        width : '100%',
        height : 50,
        justifyContent : 'center',
        alignItems : 'flex-end',
        borderWidth : 1,
        borderColor : orange,
        marginTop : 5,
    },
    buttonMap : {
        height : 50,
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',
    },
    textButton : {
        fontSize : 20,
        fontFamily : font3,
        color : orange,
    },
    containerCart : {
        width : '100%',
        height : '60%',
        padding : 5
    },
    containerFood : {
        width : '100%',
        height : '80%',
        padding : 15,
        borderWidth : 1,
        borderColor : Gray
    },
    containerItem : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    image : {
        width : 80,
        height : 80,
    },
    textName : {
        width : '60%',
        color : Black,
        fontSize : 15,
        paddingLeft : 10,
    },
    containerImage : {
        width : '50%',
        flexDirection : 'row',
        alignItems : 'center',
    },
    textItem : {
        color : Black,
        fontSize : 15,
    },
    containerTotal : {
        width : '100%',
        height : '10%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingLeft : 10,
        paddingRight : 10,
    },
    textTotal : {
        fontSize : 18,
        color : Black,
        fontWeight : 'bold',
    },
    containerSwipe : {
        width : '100%',
        height : '9%',
        // borderWidth : 1,
    }
})