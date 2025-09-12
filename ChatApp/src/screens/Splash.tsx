import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css"
import Circle from "../components/CircleShape";
export default function SplashScreen() {
    return (
        <SafeAreaView className="flex-1">
            <StatusBar hidden={true} />
            <View className="flex-1 items-center justify-center bg-white">
                <Image className="w-40 h-40" source={require('../../assets/logo.png')} />
                <View style={styles.bottomContainer}>
                    <Text style={styles.companyName}>Powered By: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                    <Text style={styles.appVersion}>Version: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
                    <Circle width={200} height={200} borderRadius={200} fillColor="#475569" bottom={680} left={-60}/>
                    <Circle width={100} height={100} borderRadius={50} fillColor="#475569" top={-680} left={-65}/>
                    
                </View>
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
   
    
    bottomContainer: {
        position: "absolute",
        bottom: 20,
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
    }
});