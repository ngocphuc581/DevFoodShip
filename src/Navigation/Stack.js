import React from "react";
import {

} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Provider} from 'react-redux'
import Login from "../View/Login";
import BottomTab from "./BottomTab";
import {store} from '../../redux/Store/Store'
import Order from "../View/Order";
const stack = createNativeStackNavigator();
const Stack = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <stack.Navigator screenOptions={{headerShown : false}}>
                    <stack.Screen name="Login"
                                component={Login}/>
                    <stack.Screen name="TabHome"
                                component={BottomTab}/>
                    <stack.Screen name='Order'
                                component={Order}/>
                </stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
export default Stack;