import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "./src/screens/ChatScreen";
import StatusScreen from "./src/screens/StatusScreen";
import CallsScreen from "./src/screens/CallsScreen";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();
export default function HomeTabs(){
    return(
        <Tabs.Navigator screenOptions={({route})=>({
            tabBarIcon:({focused,color,size})=>{
                let iconName="chatbubbles";
                if (route.name==="Chats")iconName="chatbubbles";
                else if (route.name==="Status")iconName="time";
                else if (route.name==="Calls")iconName="call";
                return <Ionicons name={iconName as any} size={size} color={color} />
            },

            tabBarLabelStyle:{fontSize:12,fontWeight:"800"},
            tabBarActiveTintColor:"#22c55e",
            tabBarInactiveTintColor:"#9ca3af",
            tabBarStyle:{
                height:80,
                backgroundColor:"#fff",
                paddingBottom:10
            }
        })}>
        <Tabs.Screen name="Chats" component={ChatScreen} options={{headerShown:false}}/>
        <Tabs.Screen name="Status" component={StatusScreen} options={{headerShown:false}}/>
        <Tabs.Screen name="Calls" component={CallsScreen} options={{headerShown:false}}/>
    </Tabs.Navigator>
    );

}