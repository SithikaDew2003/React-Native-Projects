import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootParmList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";

type NewChatsScreenProp = NativeStackNavigationProp<RootParmList, "NewChatScreen">

export default function NewChatsScreen() {
    const navigation = useNavigation<NewChatsScreenProp>();
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
                        <Text className="text-lg font-bold">Select Contact</Text>
                        <Text className="text-sm font-bold">10 Contact</Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <View>

                </View>
            ),
        });
    }, [navigation]);

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            firstName: "Malindu",
            lastName: "Piushan",
            countryCode: "+94",
            contactNo: "763060956",
            createdAt: "2025-10-01 10:16 AM",
            updatedAt: "2025-10-01 10:16 AM",
            status: "ACTIVE",
            profileImage: "https://19b0393ad090.ngrok-free.app/ChatApp/profile-images/4/profile1.png",
        },
        {
            id: 1,
            firstName: "Sahan",
            lastName: "Perera",
            countryCode: "+94",
            contactNo: "763060956",
            createdAt: "2025-10-01 10:16 AM",
            updatedAt: "2025-10-01 10:16 AM",
            status: "NOT_IN_LIST",
            profileImage: "",
        },
    ]);
    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate("SingleChatScreen", { chatId: item.id, friendName: `${item.firstName} ${item.lastName}`, lastSeenTime: item.updatedAt, profileImage: item.profileImage ? item.profileImage : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random` })
        }} className="flex-row items-center justify-start px-3 py-2 gap-x-3 mt-1 bg-gray-50 ">
            <View>
                <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">
                    {item.profileImage ? (
                        <Image
                            source={{ uri: item.profileImage }}
                            className="w-12 h-12 rounded-full"
                        />
                    ) : (
                         <Image
                            source={{
                                 uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`
                                }}
                            className="w-12 h-12 rounded-full"
                        />

                    )}
                </TouchableOpacity>

            </View>
            <View className="flex-col gap-y-1">
                <Text className="font-bold text-xl">{item.firstName} {item.lastName}</Text>
                <Text className="text-md italic">{item.status === "ACTIVE" ? "Already in friendList" : "Not in friendList"}</Text>
            </View>

        </TouchableOpacity>
    );

    const filteredUsers = [...users].filter((user) => {

        return (
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(search.toLowerCase())) ||
            user.contactNo.includes(search)
    }).sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
    );
    return (
        <SafeAreaView
            className="flex-1 bg-white"
            edges={["right", "bottom", "left"]}
        >
            <StatusBar hidden={false} translucent={true} />
            <View className="flex-1">
                <View className="flex-row items-center px-3 mx-2 mt-3 border-2 border-gray-300 rounded-full h-14">
                    <Ionicons name="search" size={20} color={"gray"} />
                    <TextInput
                        className="flex-1 text-lg font-bold ps-2"
                        placeholder="Search"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
                <View className="px-2 py-2 my-2 border-b-2 border-b-green-500">
                    <TouchableOpacity className="flex-row items-center justify-center gap-x-3 h-14">
                        <View className="items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                            <Feather name="user-plus" size={24} color="black" />
                        </View>
                        <Text className="text-lg font-bold">New Contact</Text>
                    </TouchableOpacity>
                </View>
                <View className="mt-2">
                    <FlatList
                        data={filteredUsers}
                        renderItem={renderItem}
                        keyExtractor={(_, index) => index.toString()} />
                </View>
            </View>

        </SafeAreaView>
    );
}