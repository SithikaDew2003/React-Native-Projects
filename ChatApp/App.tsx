
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from './src/screens/SplashScreen';
import SignInScreen from "./src/screens/SignInScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";

import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { ContactScreen } from "./src/screens/ContactScreen";
import { AvatarScreen } from "./src/screens/AvatarScreen";
import { UserRegistrationProvider } from "./src/components/UserContext";
import HomeTabs from "./HomeTabs";

import SingleChatScreen from "./src/screens/SingleChatScreen";
import { WebSocketProvider } from "./src/socket/WebSocketProvider";



export type RootParmList = {
  SplashScreen: undefined,
  SignInScreen: undefined,
  SignUpScreen: undefined,
  ContactScreen: undefined,
  AvatarScreen: undefined,
  HomeScreen: undefined,
  SettingsScreen: undefined,
  ProfileScreen: undefined,
  SingleChatScreen:{
    chatId:number;
    friendName:string;
    lastSeenTime:string;
    profileImage:string
  }

}
const Stack = createNativeStackNavigator<RootParmList>();
export let USER_ID =1;//can use async storage
export default function App() {
  
  return (
    <WebSocketProvider userId={USER_ID}>
      <ThemeProvider>
      <UserRegistrationProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ animation: "flip" }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} />
            <Stack.Screen name="SignInScreen" component={SignInScreen}options={{headerShown:false}} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ContactScreen" component={ContactScreen} options={{headerShown:false}}/>
            <Stack.Screen name="AvatarScreen" component={AvatarScreen} options={{headerShown:false}}/>
            <Stack.Screen name="HomeScreen" component={HomeTabs} options={{headerShown:false}}/>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
            <Stack.Screen name="SingleChatScreen" component={SingleChatScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </UserRegistrationProvider>
    </ThemeProvider>
    </WebSocketProvider>
    
    
  );
}

