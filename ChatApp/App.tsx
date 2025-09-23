
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from './src/screens/SplashScreen';
import SignInScreen from "./src/screens/SignInScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import { ContactScreen } from "./src/screens/ContactScreen";
import { AvatarScreen } from "./src/screens/AvatarScreen";



export type RootParmList = {
  SplashScreen: undefined,
  SignInScreen: undefined,
  SignUpScreen: undefined,
  ContactScreen: undefined,
  AvatarScreen: undefined,
  HomeScreen: undefined,
  SettingsScreen: undefined,
  ProfileScreen: undefined,

}
const Stack = createNativeStackNavigator<RootParmList>();
export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false, animation: "flip" }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="ContactScreen" component={ContactScreen} />
          <Stack.Screen name="AvatarScreen" component={AvatarScreen}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

