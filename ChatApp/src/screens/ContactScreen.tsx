import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParmList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";


type ContactScreenProps = NativeStackNavigationProp<RootParmList, "ContactScreen">
export function ContactScreen() {

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");//default country code
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const navigation = useNavigation<ContactScreenProps>();
    const { userData, setUserData } = useUserRegistration();

    const [callingCode, setCallingCode] = useState("+94");
    const [phoneNo, setPhoneNo] = useState("");
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

                        <View className="border-b-2 border-b-green-600 justify-center items-center h-14 my-3 flex-row">
                            <CountryPicker
                                countryCode={countryCode}
                                withFilter
                                withFlag
                                withCountryNameButton
                                withCallingCode
                                visible={show}
                                onClose={() => { setShow(false) }}
                                onSelect={(c) => {
                                    setCountryCode(c.cca2);
                                    setCountry(c);
                                    setShow(false);
                                }}
                            />
                            <AntDesign name="caret-down" size={18} color="black" />
                        </View>




                        <View className="mt-5 bg-red-100 flex flex-row justify-center">
                            <View className="bg-slate-50">
                                <TextInput inputMode="tel" className="h-14 font-bold text-lg border-y-4 border-y-green-600 w-50 pe-1" placeholder="+94" value={country ? `+${country.callingCode}`
                                    : callingCode} editable={false} onChangeText={(text) => {
                                        setCallingCode(text);
                                    }} />
                            </View>
                            <TextInput value={phoneNo} onChangeText={(text) => {
                                setPhoneNo(text);
                            }} inputMode="tel" cursorColor={"green"} className="h-14 font-bold text-lg border-y-4 border-y-green-600 w-80 ps-1 ml-3" placeholder="777777777" />
                        </View>
                    </View>

                    <View className="mt-5">
                        <Pressable onPress={() => {

                            const validCountryCode = validateCountryCode(callingCode);
                            const validPhoneNo = validatePhoneNo(phoneNo);

                            if (validCountryCode) {
                                Alert.alert("Warning", validCountryCode);
                            } else if (validPhoneNo) {
                                Alert.alert("Warning", validPhoneNo);
                            } else {



                                setUserData((previous) => ({
                                    ...previous,
                                    countryCode: country ? `+${country.callingCode}`
                                        : callingCode,
                                    contactN0: phoneNo,
                                }));

                                navigation.navigate("AvatarScreen")

                            }
                        }} className="justify-center items-center bg-green-600 w-96 h-14 rounded-md">
                            <Text className="text-xl font-bold text-slate-100">Next</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}