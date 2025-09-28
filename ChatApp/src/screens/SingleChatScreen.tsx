import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootParmList } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type SingleChatScreenProps = NativeStackScreenProps<RootParmList,"SingleChatScreen">

type Message={
    id:number;
    text:string;
    sender:"me"|"friend";
    time:string;
    status:"sent"|"delivered"|"read";
};


export default function SingleChatScreen({
    route,
    navigation,
}:SingleChatScreenProps) {
   
const {chatId,friendName,lastSeenTime,profileImage}=route.params;
 

 const[message,setMessage]=useState<Message[]>([
    {id:1,text:"Hi",sender:"me",time:"9.46 p.m",status:"read"},
    {id:2,text:"Hi,Kohomd",sender:"friend",time:"9.47 p.m",status:"read"},
    {id:3,text:"Mokad karanne",sender:"me",time:"9.48 p.m",status:"read"},
    {id:4,text:"Mukuth na",sender:"friend",time:"9.49 p.m",status:"read"},
    {id:5,text:"Hariiii",sender:"me",time:"10.00 p.m",status:"sent"},
   
 ]);

 const[input,setInput]=useState("");

  useLayoutEffect(()=>{
            navigation.setOptions({
                title:"",
                headerLeft: () => (
                <View className="flex-row items-center gap-2">
                    <Image source={require("../../assets/avatar/avatar_1.png")}
                    className="h-14 w-14 rounded-full"/>
                    <View className="space-y-2">
                        <Text className="font-bold text-2xl">{friendName}</Text>
                        <Text className="italic text-xs font-bold text-gray-500">Last Seen {lastSeenTime}</Text>
                    </View>
                </View>
                ),
                headerRight: () =>( 
                <TouchableOpacity>
                    <Ionicons name = "chatbox-ellipses" size={24} color="black"/>
                </TouchableOpacity>),
            })
        }, [navigation]);



 const renderItem =({item}:{item:Message})=>{
    const isMe= item.sender ==="me";
    return(


        <View className={`my-1 px-3 py-2  max-w-[75%] ${isMe?"bg-green-500 self-end rounded-bl-xl rounded-tl-xl rounded-br-xl":"bg-gray-500 self-start rounded-br-xl rounded-tl-xl rounded-tr-xl"}`}>
            <Text className={`text-white text-base ${isMe?"text-right":"text-left"}`}>{item.text}</Text>
            <View className="flex-row justify-end items-center mt-1">
                <Text className={`text-white italic text-xs me-2`}>{item.time}</Text>
                {isMe&&(<Ionicons name={item.status==="read"?"checkmark-done-outline":item.status==="delivered"?"checkmark-done-outline":"checkmark"} size={16} color={item.status==="read"?"blue":"gray"} />)}
            </View>
        </View>
    );
 };

    const sendMessage=()=>{
        if (input.trim()) {
            const newMsg:Message={
                id:Date.now(),
                text:input,
                sender:"me",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' ,hour12: true }),
                status:"sent",
            };

            setMessage([newMsg, ...message]);
            setInput("");
        }

        return !input.trim();
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["right","bottom","left"]}>
            <StatusBar hidden/>
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS==="android"?"padding":"height"} keyboardVerticalOffset={100}>
                <FlatList data={message} renderItem={renderItem} contentContainerStyle={{paddingBottom:60}} className=" px-3 flex-1" inverted keyExtractor={(item)=>item.id.toString()}/>
                <View className="flex-row  ps-2  bg-white items-end justify-end">
                    <TextInput value={input} onChangeText={(text)=>setInput(text)}
                        multiline
                        placeholder="Type message"
                        className="flex-1 min-h-14 max-h-32 px-3 py2 bg-gray-200 rounded-3xl text-base"
                    />

                    <TouchableOpacity   onPress={sendMessage} className="bg-green-600 w-14 h-14 items-center justify-center rounded-full">
                        <Ionicons name="send" size={24} color="white"/>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}