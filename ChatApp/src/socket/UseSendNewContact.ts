import { useEffect, useState } from "react";
import { User, WSResponse } from "./chat";
import { useWebSocket } from "./WebSocketProvider";
import { Alert } from "react-native";

export function useSendNewContact() {
    const { sendMessage,socket } = useWebSocket();
    const[responseText, setResponseText] = useState("");
    const sendNewContact =(user:User)=>{
        sendMessage({type:"save_new_contact",user});
    };

    useEffect(()=>{
        if (!socket) {
            return;
        }

        const onMessage = (event: MessageEvent) => {
            const response:WSResponse = JSON.parse(event.data);
            if (response.type === "new_contact_response_text") {
                console.log(response.payload);
                setResponseText(response.payload);

                if (response.payload.responseStatus) {
                    Alert.alert("Success",response.payload.message);
                }else{
                    Alert.alert("Warning",response.payload.message);
                }
            }
            };

            socket.addEventListener("message",onMessage);

            return ()=>{
                socket.removeEventListener("message",onMessage);
            };
        
    },[socket]);
    return {sendNewContact:sendNewContact,responseText:responseText};
}