import { View,StyleSheet, Text, TextInput, Pressable, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Login() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.loginBody}>
                <Text style={styles.loginTitle}>Login</Text>
                <Image style={styles.loginIcon} source={require("./assets/favicon.png")}/>
                <TextInput style={styles.emailInput} placeholder="Email"></TextInput>
                <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry></TextInput>
                <Pressable style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>

                
            </View>
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
   loginBody:{
       flex: 1,
       backgroundColor:"white"
   },
   safeArea:{
     flex: 1,
     backgroundColor:"white"  
   },

   loginTitle:{
       fontSize: 40,
       fontWeight: "bold",
       textAlign: "center",
       marginTop: 50
       
   },

   loginIcon: {
       width: 100,
       height: 100,
       alignSelf: "center",
       marginTop: 50
   },

   emailInput: {
       height: 40,
       marginTop: 50,
       borderWidth: 1,
       padding: 10,
       width: 320,
       alignSelf: "center",
       borderRadius: 10
   },
   passwordInput:{
       height: 40,
       marginTop: 20,
       borderWidth: 1,
       padding: 10,
       width: 320,
       alignSelf: "center",
       borderRadius: 10
   },

   loginButton:{
       height: 50,
       marginTop: 40,
      
       padding: 10,
       width: 320,
       alignSelf: "center",
       borderRadius: 10,
       backgroundColor: "#2196F3",
       
   },

   loginButtonText:{
       color: "white",
       textAlign: "center",
       fontSize: 18
   },
});

