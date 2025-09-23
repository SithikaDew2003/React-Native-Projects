import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { RootParmList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AlertNotificationRoot } from "react-native-alert-notification";
import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { useNavigation } from "@react-navigation/native";

type SignUpScreenProps = NativeStackNavigationProp<RootParmList, "SignUpScreen">;
export function SignUpScreen() {
    const { applied } = useTheme();
    const logo = applied === "dark" ? require("../../assets/logo-dark.png") : require("../../assets/logo.png");
    const navigation = useNavigation<SignUpScreenProps>();
    return (
        <AlertNotificationRoot>
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "padding" : "height"} className="flex-1 justify-center items-center dark:bg-black">
                <SafeAreaView className=" p-5 justify-center items-center">
                    <StatusBar hidden={true} />
                    <Image source={logo} className="w-40 h-36" />
                    <View className="w-full justify-start items-start">
                        <Text className="text-slate-500 dark:text-slate-100 font-bold">Create your account and start the conversation TODAY</Text>
                    </View>

                    <View className="w-full mt-10">
                        <TextInput className="w-80 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-2 my-2 text-slate-500 dark:text-slate-100" placeholder="First Name" />
                        <TextInput className="w-80 h-12 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-2 my-2 text-slate-500 dark:text-slate-100" placeholder="last Name" />
                    </View>


                </SafeAreaView>
                <View className="w-full absolute bottom-36 left-56">
                    <Pressable className="w-32 mt-8 bg-green-500 dark:bg-slate-100 border border-slate-300 dark:border-slate-600 rounded-md p-2 my-2" onPress={()=>{
                        navigation.navigate("ContactScreen");
                    }}>
                        <Text className="text-center  text-slate-100 dark:text-green-500 font-bold">Next</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </AlertNotificationRoot>
    )
}