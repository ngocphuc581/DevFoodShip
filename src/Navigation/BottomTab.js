import React from "react";
import { View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from "../View/Home";
import Account from "../View/Account";
import { GreenDark, GreenLight, orange, White, Yellow, YellowFresh } from "../Style/Colors";
const tab = createBottomTabNavigator();
const BottomTab = () => {
    return(
        <tab.Navigator screenOptions={{
            headerShown : false,
            tabBarShowLabel : false,
        }}>
            <tab.Screen name="Home"
                        component={Home}
                        options={{
                            tabBarLabelStyle :{fontSize : 17},
                            tabBarLabel : 'Trang chủ',
                            tabBarActiveBackgroundColor : orange,
                            tabBarActiveTintColor : YellowFresh,
                            tabBarInactiveBackgroundColor : orange,
                            tabBarInactiveTintColor : White,
                            tabBarIcon : ({focused, color, size})=>(
                                <View>
                                    {
                                        focused ? <Icon name="map-legend" size={33} color={Yellow}/>
                                        : <Icon name="map-legend" size={20} color={orange}/>
                                    }
                                </View>
                            )
                        }}/>
            <tab.Screen name="Account"
                        component={Account}
                        options={{
                            tabBarActiveBackgroundColor : GreenLight,
                            tabBarInactiveBackgroundColor : GreenLight,
                            tabBarActiveTintColor : Yellow,
                            tabBarInactiveTintColor : White,
                            tabBarIcon : ({focused, color, size})=>(
                                <View>
                                    {
                                        focused ? <Icon name="account-cowboy-hat" size={33} color={orange}/>
                                        : <Icon name="account-cowboy-hat" size={20} color={Yellow}/>
                                    }
                                </View>
                            )}
                        }/>
            
        </tab.Navigator>
    )
}
export default BottomTab;