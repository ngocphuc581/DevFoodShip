import {
    StyleSheet,
    Dimensions,
} from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import { Black, Gray, GreenDark, GreenLight, Red, White, Yellow, YellowFresh } from './Colors';
import { font1, font2, font3, font4, font5 } from '../Style/Fonts'
export const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
    },
    map : {
        width : '100%',
        height : '100%',
        
    },
    containerListInfo : {
        width : '100%',
        height : '40%',
        position : 'absolute',
        bottom : 0,
    },
    containerInfo : {
        width : windowWidth,
        height : 250,
        alignItems : 'center',
        padding :15,
        paddingLeft : 0,
        backgroundColor : 'transparent',
        
    },
    containerHeader : {
        backgroundColor : GreenLight,
        width : '100%',
        height : '30%',
        alignItems : 'center',
        justifyContent : 'center',
        shadowColor: GreenLight,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
        borderWidth : 2,
        borderColor : GreenLight,
    },
    textHeader : {
        fontSize : 22,
        color : Yellow,
        textDecorationLine : 'underline',
        letterSpacing : 2,
    },
    containerBody : {
        width : '100%',
        height : '80%',
        flexDirection : 'row',
        borderWidth : 5,
        borderColor : GreenLight,
        backgroundColor : '#eee'
    },
    containerLogo : {
        width : '35%',
        alignItems : 'center',
        justifyContent : 'center',
    },
    image : {
        width : 100,
        height : 100,
    },
    containerInformation :{
        padding : 10,
        height : '65%',
    },
    textLogo : {
        fontSize : 18,
        color : Red,
        backgroundColor : GreenDark,
        width : 225,
        textAlign : 'center',
        marginBottom : 4,
    },
    textName : {
        fontSize : 18,
        fontFamily : font2,
        letterSpacing : 1,
        width : 225,
        color : Gray,
    },
    textDetailName : {
        color:Black,
        fontSize : 20,
    },
    containerButton :{
        width : '100%',
        height : '50%',
        marginTop : 5,
    },
    button : {
        backgroundColor : Yellow,
        width : '100%',
        height : '100%',
        alignItems : 'center',
        justifyContent : 'center',
    },
    textButton : {
        fontSize : 20,
        fontFamily : font5,
        color : White,
        letterSpacing : 0.5,
    },
    fab : {
        width : 50,
        height : 50,
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        top : 15,
        right : 15,
    }
})