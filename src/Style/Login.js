import {
    StyleSheet,
} from 'react-native';
import { Gray, GreenLight, Red, White, Yellow, YellowFresh } from './Colors';
import { font1, font2, font3, font4, font5, font6 } from './Fonts';
export const styles = StyleSheet.create({
    container : {
        width  :'100%',
        height : '100%',
        backgroundColor : GreenLight,
    },
    containerImage : {
        width : '100%',
        height : '30%',
        alignItems : 'center',
        justifyContent : 'center',
    },
    image : {
        width : '90%',
        height : '90%',
    },
    containerLogin : {
        width : '100%',
        height : '50%',
        backgroundColor : GreenLight,
        alignItems : 'center',
        justifyContent : 'center',
    },
    containerInput : {
        height : '100%',
        width : '100%',
        justifyContent : 'center',
        padding : 30,
    },
    button : {
        width : '100%',
        height : '25%',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : Yellow,
    },
    textButton :{
        fontSize : 26,
        fontFamily : font5,
        color : White,
    }

})