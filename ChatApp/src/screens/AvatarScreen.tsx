import { ActivityIndicator, ActivityIndicatorBase, Alert, FlatList, Image, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker"
import { useState } from "react";
import { useUserRegistration } from "../components/UserContext";
import { validateprofileImage } from "../util/Validation";
import { createNewAccount } from "../api/UserService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParmList } from "../../App";
import { useNavigation } from "@react-navigation/native";


type AvatarScreenProps = NativeStackNavigationProp<RootParmList, "AvatarScreen">;
export function AvatarScreen() {

    const navigation = useNavigation<AvatarScreenProps>();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const { userData, setUserData } = useUserRegistration();
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUserData((previous) => ({
                ...previous,
                profileImage: result.assets[0].uri,
            }));
        }
    }


    const avatars = [
        require("../../assets/avatar/avatar_1.png"),
        require("../../assets/avatar/avatar_2.png"),
        require("../../assets/avatar/avatar_3.png"),
        require("../../assets/avatar/avatar_4.png"),
        require("../../assets/avatar/avatar_5.png"),
        require("../../assets/avatar/avatar_6.png"),

    ];


    return (
        <SafeAreaView className="bg-white flex-1 ">
            <StatusBar hidden={true} />

            <View className="flex-1 items-center">
                <View>
                    <Image
                        source={require("../../assets/logo.png")}
                        className="w-40 h-40"
                    />
                </View>

                <View className="items-center">
                    <Text className="text-slate-600 font-bold text-lg">Choose a profileimage or an avatar</Text>
                    <View className="items-center mt-2 h-72">
                        <Pressable className="h-[120] w-[120] rounded-full bg-gray-100 justify-center items-center border-2 border-gray-400 border-dashed" onPress={pickImage}>
                            {image ? (
                                <Image source={{ uri: image }} className="h-[120] w-[120] rounded-full" />
                            ) : (
                                <View className="items-center">
                                    <Text className="font-bold text-xl text-slate-500">+</Text>
                                    <Text className="font-bold text-xl text-slate-500">Add Image</Text>
                                </View>
                            )}
                        </Pressable>


                        <Text className="text-lg my-2 text-slate-700 font-bold">Or select an avatar</Text>
                        <FlatList
                            data={avatars}
                            horizontal      //horizontal widihata harawaganna
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    setImage(Image.resolveAssetSource(item).uri);
                                    setUserData((previous) => ({
                                        ...previous,
                                        profileImage: Image.resolveAssetSource(item).uri,
                                    }));
                                }}>
                                    <Image source={item} className="h-20 w-20 mx-2 border-2 border-gray-200 rounded-full" />
                                </TouchableOpacity>
                            )}

                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>

                <View className=" mt-5 w-full px-5">
                    <Pressable disabled={loading?true:false} className="h-14 bg-green-500 justify-center items-center rounded-full" onPress={async () => {

                        const validProfile = validateprofileImage(
                            userData.profileImage
                                ? { uri: userData.profileImage, type: "", fileSize: 0 } : null
                        );

                        if (validProfile) {
                            Alert.alert("Warning", "Please select profile image or avatar");
                        } else {
                           

                            try {
                                 setLoading(true);
                                const response = await createNewAccount(userData);
                                if (response.status) {
                                    navigation.replace("HomeScreen");
                                } else {
                                   Alert.alert("Error",response.message);
                                }
                            } catch (error) {
                                console.log(error);
                            }finally{
                                setLoading(false);
                            }


                        }


                    }}>
                        {
                            loading ? (<ActivityIndicator size={'large'} color={'green'} />) : (


                                <Text className="font-bold text-lg text-slate-50">Create Account</Text>)}
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}