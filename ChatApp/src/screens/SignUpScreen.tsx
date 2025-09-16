import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { RootParmList } from "../../App";

type SignUpScreenProps = NativeStackNavigationProp<RootParmList,"SignUpScreen">;
export  function SignUpScreen() {
    
    return(
        <View>
            <Text>SignUpScreen</Text>
        </View>
    )
}