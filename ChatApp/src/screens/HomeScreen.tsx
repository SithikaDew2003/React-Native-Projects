import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RootParmList } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useChatList } from "../socket/UseChatList";
import { FormatChatTime } from "../util/DateFormatter";
import { Chat } from "../socket/chat";

type HomeScreenProps = NativeStackNavigationProp<RootParmList, "HomeScreen">;
export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenProps>();
    const [search, setSearch] = useState("");
    const chatList = useChatList();
    const [isModalVisible, setModalVisible] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "ChatApp",
            headerTitleStyle: { fontWeight: "bold" },
            headerRight: () => (
                <View className="flex-row space-x-4">
                    <TouchableOpacity>
                        <Ionicons name="camera" size={26} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="ml-10"
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name="ellipsis-vertical" size={26} color="black" />
                    </TouchableOpacity>

                    <Modal
                        visible={isModalVisible}
                        animationType="fade"
                        onRequestClose={() => setModalVisible(false)}//modal close press outside
                        transparent={true}
                    >
                        <Pressable className="flex-1 bg-transparent" onPress={()=>{setModalVisible(false)}}>
                            <Pressable onPress={(e)=>{
                                e.stopPropagation();//prevent modal close inside of the modal
                            }}>

                                {/* Root modal */}
                                <View className=" justify-end items-end  p-5">
                                    {/* Content View */}
                                    <View className="bg-white rounded-md w-72 p-3"
                                    style={{
                                        shadowColor:"#000",
                                        shadowOffset:{
                                            width:0,
                                            height:2
                                        },

                                        shadowOpacity:0.25,
                                        shadowRadius:3.84,
                                        elevation:5
                                    }}
                                    >
                                        <TouchableOpacity className="h-12 my-2 justify-center items-start border-b-2 border-b-gray-100">
                                            <Text className="font-bold text-lg">My Profile</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="h-12 my-2 justify-center items-start border-b-2 border-b-gray-100">
                                            <Text className="font-bold text-lg">Settings</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                    
                                </View>

                            </Pressable>

                        </Pressable>
                    </Modal>
                </View>
            ),
        });
    }, [navigation,isModalVisible]);

    const filteredChats = [...chatList]
        .filter((chat) => {
            return (
                chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
                chat.lastMessage.toLowerCase().includes(search.toLowerCase())
            );
        })
        .sort(
            (a, b) =>
                new Date(b.lastTimeStamp).getTime() -
                new Date(a.lastTimeStamp).getTime()
        );

    const renderItem = ({ item }: { item: Chat }) => (
        <TouchableOpacity
            className="flex-row items-center py-2 px-3 bg-gray-100 my-1"
            onPress={() =>
                navigation.navigate("SingleChatScreen", {
                    chatId: item.friendId,
                    friendName: item.friendName,
                    lastSeenTime: FormatChatTime(item.lastTimeStamp),
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.friendName.replace(
                            " ",
                            "+"
                        )}&background=random`,
                })
            }
        >
            <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">
                {item.profileImage ? (
                    <Image
                        source={{ uri: item.profileImage }}
                        className="w-12 h-12 rounded-full"
                    />
                ) : (
                    <Image
                        source={{
                            uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(
                                " ",
                                "+"
                            )}&background=random`,
                        }}
                        className="w-12 h-12 rounded-full"
                    />
                )}
            </TouchableOpacity>
            <View className="flex-1">
                <View className="justify-between flex-row items-center">
                    <Text
                        className="font-bold text-xl"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.friendName}
                    </Text>
                    <Text className="font-semibold text-xs">
                        {FormatChatTime(item.lastTimeStamp)}
                    </Text>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text
                        className="text-gray-500 flex-1 text-base"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View className="bg-green-500 rounded-full px-2 py-2 ms-2">
                            <Text className="text-slate-50 text-xs font-bold">
                                {item.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView
            className="flex-1 bg-white "
            edges={["right", "bottom", "left"]}
        >
            <View className="justify-center items-center flex-row  mx-2 bg-gray-200 rounded-full px-3 h-14 mt-3">
                <Ionicons name="search" size={20} color="gray" />
                <TextInput
                    placeholder="Search"
                    className="flex-1 text-lg font-bold ps-2"
                    value={search}
                    onChangeText={(text) => {
                        setSearch(text);
                    }}
                />
            </View>
            <View className="mt-1">
                <FlatList
                    data={filteredChats}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />
            </View>

            <View className="absolute bg-green-500 bottom-24 right-10 h-20 w-20 rounded-3xl">
                <TouchableOpacity className="h-20 w-20 rounded-3xl justify-center items-center">
                    <Ionicons
                        onPress={() => navigation.navigate("NewChatScreen")}
                        name="chatbox-ellipses"
                        size={26}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
