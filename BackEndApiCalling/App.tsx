import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getDataById } from './api/UserApi';
import axios from 'axios';
import React, { useEffect } from 'react';
const URL = "https://9b9157650699.ngrok-free.app";

const api = axios.create({
  baseURL:URL
});
export default function App() {

  const [getSocket,setSocket] = React.useState<WebSocket|null>(null);

  useEffect(()=>{

    //http= ws
    //https = wss://
    const socket = new WebSocket("wss://9b9157650699.ngrok-free.app/BackendApi/user");

    socket.onopen=()=>{
      console.log("connection established");
    };


    socket.onmessage=(event)=>{
        console.log("recieved"+event.data);
    };

    socket.onerror=(error)=>{
        console.log("Websocket error:"+ error);
    };

    socket.onclose=()=>{
        console.log("connection closed");
    };


    setSocket(socket);

    return socket.close();
    
  },[]);



  return (
    <View style={styles.container}>
      <Button title='getData' onPress={async()=>{
         if (getSocket) {
           getSocket.send("getUserData");
         }
      }}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});
