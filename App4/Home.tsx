import{View,Text,TextInput,Pressable,StyleSheet} from "react-native";


export default function Home(){
    return(
        <View style={styles.view1}>
            <Text style={styles.text1}>Home</Text>
            <TextInput placeholder="Enter your name" style={styles.textInput1}></TextInput>
            <TextInput placeholder="Enter your password" style={styles.textInput2}></TextInput>
            <Pressable style={styles.btn1}><Text style={styles.text2}>Login</Text></Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    view1:{
        flex:1,
        backgroundColor:"white"
    },

    text1:{
        fontSize:30,
        marginTop:100,
        alignSelf:"center"
    },

    text2:{
        fontSize:15,
        alignSelf:"center"
    },


    textInput1:{
        borderWidth:1,
        borderColor:"black",
        width:"80%",
        alignSelf:"center",
        marginTop:100
    },
    textInput2:{
        borderWidth:1,
        borderColor:"black",
        width:"80%",
        alignSelf:"center",
        marginTop:30
    },

    btn1:{
        borderWidth:1,
        borderColor:"black",
        width:"80%",
        alignSelf:"center",
        padding:10,
        backgroundColor:"#0fc0fc",
        marginTop:40,
        borderRadius:10
    }

});