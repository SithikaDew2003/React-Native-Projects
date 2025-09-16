
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {SplashScreen} from './src/screens/SplashScreen';
import SignInScreen from "./src/screens/SignInScreen";
import {SignUpScreen} from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";



export type RootParmList = {
  SplashScreen: undefined,
  SignInScreen: undefined,
  SignUpScreen: undefined,
  HomeScreen: undefined,
  SettingsScreen: undefined,
  ProfileScreen: undefined
}
const Stack = createNativeStackNavigator<RootParmList>();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false,animation:"flip" }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

