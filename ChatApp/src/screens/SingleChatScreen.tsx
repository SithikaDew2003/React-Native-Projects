import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootParmList } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { FormatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/useSendChat";

type SingleChatScreenProps = NativeStackScreenProps<RootParmList, "SingleChatScreen">


type Message = {
    id: number;
    text: string;
    sender: "me" | "friend";
    time: string;
    status: "sent" | "DELIVERED" | "READ";
};


export default function SingleChatScreen({
    route,
    navigation,
}: SingleChatScreenProps) {

    const { chatId, friendName, lastSeenTime, profileImage } = route.params;
    const singleChat = useSingleChat(chatId); //chatId==friendId
    const messages = singleChat.messages;
    const friend = singleChat.friend;
    const sendMessage = useSendChat();


    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackVisible: true,

            title: "",
            headerLeft: () => (
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity className="items-center justify-center border-gray-300 rounded-full h-14 w-14 border-1">

                        <Image
                            source={{ uri: profileImage }}
                            className="w-12 h-12 rounded-full"
                        />

                    </TouchableOpacity>
                    <View className="space-y-2">
                        <Text className="font-bold text-2xl">{friendName}</Text>
                        <Text className="italic text-xs font-bold text-gray-500">
                            {friend?.status === "ONLINE" ? "Online" : friend?.updatedAt ? `Last seen ${FormatChatTime(friend?.updatedAt)}` : ''}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity>
                    <Ionicons name="chatbox-ellipses" size={24} color="black" />
                </TouchableOpacity>),
        })
    }, [navigation, friend]);



    const renderItem = ({ item }: { item: Chat }) => {
        const isMe = item.from.id !== chatId;
        return (


            <View className={`my-1 px-3 py-2  max-w-[75%] ${isMe ? "bg-green-500 self-end rounded-bl-xl rounded-tl-xl rounded-br-xl" : "bg-gray-500 self-start rounded-br-xl rounded-tl-xl rounded-tr-xl"}`}>
                <Text className={`text-white text-base ${isMe ? "text-right" : "text-left"}`}>{item.message}</Text>
                <View className="flex-row justify-end items-center mt-1">
                    <Text className={`text-white italic text-xs me-2`}>{FormatChatTime(item.createdAt)}</Text>
                    {isMe && (<Ionicons name={item.status === "READ" ? "checkmark-done-outline" : item.status === "DELIVERED" ? "checkmark-done-outline" : "checkmark"} size={16} color={item.status === "READ" ? "blue" : "gray"} />)}
                </View>
            </View>
        );
    };

    const handleSendChat = () => {
        if (!input.trim()) {
            return;
        }

        sendMessage(chatId, input);
        setInput("");
    }

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["right", "bottom", "left"]}>
            <StatusBar hidden />
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"} keyboardVerticalOffset={100}>
                <FlatList data={messages} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 60 }} className=" px-3 flex-1" inverted
                    keyExtractor={(_, index) => index.toString()} />
                <View className="flex-row  ps-2  bg-white items-end justify-end">
                    <TextInput value={input} onChangeText={(text) => setInput(text)}
                        multiline
                        placeholder="Type message"
                        className="flex-1 min-h-14 max-h-32 px-3 py2 bg-gray-200 rounded-3xl text-base"
                    />

                    <TouchableOpacity onPress={handleSendChat} className="bg-green-600 w-14 h-14 items-center justify-center rounded-full">
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}