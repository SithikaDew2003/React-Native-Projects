import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParmList } from "../../App";
import { useNavigation } from "@react-navigation/native";


type ContactScreenProps = NativeStackNavigationProp<RootParmList, "ContactScreen">
export function ContactScreen() {
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryItem | null>(null);
    const navigation = useNavigation<ContactScreenProps>();
    return (
        <SafeAreaView className="bg-red-100 flex-1 items-center">
            <StatusBar hidden={true} />
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? "padding" : "height"}>
                <View className="p-5 items-center">
                    <View>
                        <Image source={require("../../assets/logo.png")} className="w-40 h-40" />
                    </View>
                    <View >
                        <Text className="text-slate-600 font-bold">We use your contacts to help you find friends </Text>
                    </View>

                    <View className="mt-5 w-full ">
                        <Pressable className="w-full mt-8 border-b-4 border-b-green-600 rounded-md h-16 justify-center items-center flex-row"
                            onPress={() => {
                                setShow(true);
                            }}
                        >
                            <Text className="text-center font-bold">Select Country<AntDesign name="caret-down" size={18} color="black" /></Text>

                        </Pressable>

                        <CountryPicker style={{
                            modal: {
                                height: 400,
                                width: 300,
                                alignSelf: "center",
                                marginBottom: 20
                            }
                        }}
                            show={show}
                            lang={'en'}
                            pickerButtonOnPress={(item) => {
                                setCountryCode(item);
                                setShow(false);
                            }}


                        />

                        <View className="mt-5 bg-red-100 flex flex-row justify-center">
                            <View className="bg-slate-50">
                                <TextInput inputMode="tel" className="h-14 font-bold text-lg border-y-4 border-y-green-600 w-50 pe-1" placeholder="+94" />
                            </View>
                            <TextInput inputMode="tel" cursorColor={"green"}  className="h-14 font-bold text-lg border-y-4 border-y-green-600 w-80 ps-1 ml-3" placeholder="777777777" />
                        </View>
                    </View>

                    <View className="mt-5">
                        <Pressable onPress={()=>{navigation.navigate("AvatarScreen")}} className="justify-center items-center bg-green-600 w-full h-14 rounded-full">
                            <Text className="text-xl font-bold text-slate-100">Next</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}