import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootParmList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNo } from "../util/Validation";
import { useSendNewContact } from "../socket/UseSendNewContact";


type NewContactScreenProps = NativeStackNavigationProp<RootParmList, "NewContactScreen">;

export default function NewContactScreen() {

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");//default country code
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [callingCode, setCallingCode] = useState("+94");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[phoneNo, setPhoneNo] = useState("");
    const newContact = useSendNewContact();
    const sendNewContact = newContact.sendNewContact;
    const responseText = newContact.responseText;


    const sendData=()=>{
        sendNewContact({
            id:0,
            firstName:firstName,
            lastName:lastName,
            countryCode:callingCode,
            contactNo:phoneNo,
            createdAt:"",
            updatedAt:"",
            status:""
        });

        setFirstName("");
        setLastName("");
        setCallingCode("+94");
        setPhoneNo("");
    };

    const navigation = useNavigation<NewContactScreenProps>();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="flex-row items-center gap-x-2">
                    <TouchableOpacity
                        className="items-center justify-center"
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <View className="flex-col">
                        <Text className="text-lg font-bold">New Contact</Text>

                    </View>
                </View>
            ),
            headerRight: () => (
                <View>

                </View>
            ),
        });
    }, [navigation]);
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 px-5">
                <View className="items-center">
                    <View className="flex-row items-center gap-x-2 h-12 w-80 bg-white rounded-lg mt-8 px-3">
                        <Feather name="user" size={24} color="gray" />
                        <TextInput placeholder="First Name" value={firstName} onChangeText={(text)=>setFirstName(text)} className="h-14 rounded-lg p-2 my-2 w-60 max-w-60" />
                    </View>


                    <View className="flex-row items-center gap-x-2 h-12 w-80 bg-white rounded-lg mt-8 px-3">
                        <Feather name="user" size={24} color="gray" />
                        <TextInput placeholder="Last Name" value={lastName} onChangeText={(text)=>setLastName(text)} className="h-14 rounded-lg p-2 my-2 w-60 max-w-60" />
                    </View>


                    <View className="border-b-2 border-b-sky-900 justify-center items-center h-14 my-3 flex-row mt-8">
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


                    <View className="flex-row items-center gap-x-2 h-12 w-80 bg-white rounded-lg mt-8 px-3">
                        <Feather name="phone" size={24} color="gray" />
                        <View className="justify-center items-center h-14 px-2">
                                <TextInput inputMode="tel" className="h-14 font-bold text-lg border-y-4 border-y-sky-800 w-50 max-w-50 pe-1" placeholder="+94" value={country ? `+${country.callingCode}`
                                    : callingCode} editable={false} onChangeText={(text) => {
                                        setCallingCode(text);
                                    }} />
                        </View>
                        <TextInput placeholder="Phone" keyboardType="phone-pad" value={phoneNo} onChangeText={(text)=>setPhoneNo(text)} className="h-14 rounded-lg p-2 my-2" />
                    </View>

                    <View className="mt-10">
                        <Pressable onPress={()=>{
                            const firstNameValid = validateFirstName(firstName);
                            const lastNameValid = validateLastName(lastName);
                            const countryCodeValid = validateCountryCode(callingCode);
                            const phoneNoValid = validatePhoneNo(phoneNo);

                            if (firstNameValid) {
                                Alert.alert("Warning", firstNameValid);
                            }else if (lastNameValid) {
                                Alert.alert("Warning", lastNameValid);
                            }else if (countryCodeValid) {
                                Alert.alert("Warning", countryCodeValid);
                            }else if (phoneNoValid) {
                                Alert.alert("Warning", phoneNoValid);
                            }else{
                                sendData();

                            }
                        }} 
                        className="bg-green-600 h-14 items-center justify-center rounded-full w-80">
                            <Text className="text-lg font-bold text-slate-100">Save Contact</Text>
                        </Pressable>
                    </View>


                    
                </View>
            </View>
        </SafeAreaView>
    )
}