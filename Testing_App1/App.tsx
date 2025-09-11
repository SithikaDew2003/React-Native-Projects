import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {

  const[getText,setText] = React.useState("");


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.loginBody}>
        <Text style={styles.loginTitle}>Login</Text>
        <TextInput onChangeText={setText} value={getText} style={styles.loginInput} placeholder="Type Here" />

       


       {/* Pressable */}
        <Pressable onPress={async ()=>{

          const text = getText;
          Alert.alert(text);





        }} style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Login2</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loginBody: {
    flex: 1,
    marginTop: 40,
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  loginInput: {
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    width: 350,
    alignSelf: "center",
    borderColor: "rgba(158, 172, 172, 1)",
    marginTop:40
  },

  loginBtn:{
    height:40,
    width:350,
    backgroundColor:"rgba(51, 227, 32, 1)",
    borderRadius:10,
    alignSelf:"center",
    marginTop:20
  },
  loginBtnText:{
    color:"white",
    fontSize:15,
    textAlign:"center"
  }
});
