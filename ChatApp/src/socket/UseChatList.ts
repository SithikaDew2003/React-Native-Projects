import { useEffect, useState } from "react";
import { Chat, WSResponse } from "./chat";
import { useWebSocket } from "./WebSocketProvider";


export function useChatList():Chat[]{
    const{socket,sendMessage}=useWebSocket();

    const[chatList,setChatList]=useState<Chat[]>([]);

    useEffect(()=>{
        if (!socket){
            return;
        }

        sendMessage({type:"get_chat_list"});
        const onMessage=(event:MessageEvent)=>{
           let response:WSResponse=JSON.parse(event.data);
           console.log(response.payload);

           if (response.type === "friend_list") {
                setChatList(response.payload);
           }
            
            // const data:WSResponse=JSON.parse(event.data);
            // if (data.type==="friend_list"){
            //     console.log(data.data);
            //     setChatList(data.data);
            // }
        };

        socket.addEventListener("message",onMessage);
        return()=>{
            socket.removeEventListener("message",onMessage);
        };
    },[socket]);

    return chatList;
}