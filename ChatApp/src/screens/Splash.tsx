import {Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"
import Circle from "../components/CircleShape";
import { use, useEffect, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export default function SplashScreen() {

   const opacity = useSharedValue(0);

   useEffect(() => {
       opacity.value = withTiming(1,{duration:3000})
   },[]);

   const animationStyle = useAnimatedStyle(()=>{
    return{opacity:opacity.value}
   });
    return (
        <SafeAreaView className="flex-1">
            
            <View className="flex-1 items-center justify-center bg-white">
                <Animated.View style={animationStyle}>
                    <Image className="w-40 h-40" source={require('../../assets/logo.png')} />
                </Animated.View>
                    


                
                <View style={styles.bottomContainer}>
                    <Animated.View style={animationStyle} >
                        <Text style={styles.companyName}>Powered By: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                        <Text style={styles.appVersion}>Version: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
                    </Animated.View>
                    
                    <Circle width={200} height={200} borderRadius={200}  bottom={680} left={-60} className="bg-gray-400"/>
                    <Circle width={100} height={100} borderRadius={50}  top={-680} left={-65} className="bg-gray-400"/>
                    <StatusBar hidden={true} />
                </View>
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
   
    
    bottomContainer: {
        position: "absolute",
        bottom: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    companyName: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#475569",

    },
    appVersion: {
        fontSize: 12,
        fontWeight: "normal",
         color: "#475569",
         textAlign: "center"
    }
});