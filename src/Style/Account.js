import {
    StyleSheet,
} from 'react-native';
import { Black, Gray, GreenDark, GreenLight, Red, White, Yellow, YellowFresh } from './Colors';
import { font1, font2, font3, font4, font5 } from './Fonts';
export const styles= StyleSheet.create({
    container: {
        width : '100%',
        height : '100%',
        backgroundColor : GreenLight,
    },
    containerHeader : {
        width : '100%',
        height : '10%',
        justifyContent : 'center',
        alignItems : 'center',
    },
    textHeader : {
        fontSize : 28,
        color : Yellow,
        letterSpacing : 1,
        fontFamily : font5,
    },
    containerBody : {
        width : '100%',
        height : '85%',
        backgroundColor : '#eee',
    },
    containerImage : {
        width : '100%',
        height : '20%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#eee',
    },
    image : {
        borderWidth : 3,
        width : 100,
        height : 100,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 50,
        backgroundColor : GreenLight,
        borderColor : YellowFresh,
        shadowColor: YellowFresh,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    containerInformation : {
        width : '100%',
        height : '35%',
        borderTopLeftRadius : 45,
        borderTopRightRadius : 45,
        backgroundColor : White,
        padding : 15,
        borderBottomWidth : 1,
        borderColor : Gray,
    },
    containerTitle : {
        width : '100%',
        height : '35%',
        justifyContent : 'center',
        // backgroundColor : Red,
    },
    textTitle : {
        fontFamily : font3,
        color : Black,
        fontSize : 22,
        textDecorationLine : 'underline',
    },
    containerInfo : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    textInfo : {
        fontSize : 18,
        color : Gray,
        fontFamily : font4

    },
    textName : {
        color : Black,
        fontSize : 18,
        fontFamily : font4
    },
    containerButton :{
        width : '100%',
        height : 35,
        justifyContent : 'center',
        borderWidth : 1,
        borderColor : GreenDark,
        marginTop : 10,
    },
    button : {
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%',
        height : '100%'
    },
    containerHistory : {
        width : '100%',
        height : '50%',
        paddingLeft : 15,
        paddingRight : 15,
        backgroundColor : White,
    },
    containerTitleHistory : {
        width : '100%',
        height : '25%',
        // backgroundColor : Red,
        justifyContent : 'center',
    },
    containerList : {
        width : '100%',
        height : '75%',
        // borderWidth : 1,
    },
    containerDetail:{
        width : '100%',
        height : 120,
        flexDirection : 'row',
        // borderWidth : 1,
        padding : 10
    },
    logo : {
        width : '30%',
        height : '100%',
    },
    containerTextDetail : {
        paddingLeft : 15,
        paddingRight : 15,
        justifyContent : 'center',
    },
    textDetail : {
        width : '85%',
        color : Gray,
    }
})