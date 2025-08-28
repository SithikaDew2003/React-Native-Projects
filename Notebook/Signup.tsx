import React,{ useEffect, useState} from "react";
import { View,Text, StyleSheet, TextInput, Pressable,Image, TouchableOpacity, ScrollView} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from "@react-native-picker/picker";
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from "react-native-alert-notification";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


const PUBLIC_URL ="https://be9b96050d63.ngrok-free.app";
export default function Signup(){
    const [image, setImage] = useState<string | null>(null);
    const [getCity,setCity] = useState("");

    const [getCities,setCities] = React.useState<{id:number;name:string}[]>(
        []
    );

    const [getFirstName,setFirstName] =useState("");
    const [getLastName,setLastName] = useState("");
    const [getEmail,setEmail] = useState("");
    const [getPassword,setpassword] = useState("");
    const [getConfirmPassword,setConfirmPassword] = useState("");



    useEffect(()=>{
        const loadCities = async () => {
            const response = await fetch(PUBLIC_URL+"/NoteBook/Cities");

            if(response.ok){
                const json = await response.json();
                setCities(json.cityList);
                // console.log(json.cityList);
            }else{
                console.log("cities loading failed");
            }
        };
        loadCities();
    },[]);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'], // Corrected media types
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);
        
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return(
        <AlertNotificationRoot>
        <SafeAreaView style={styles.safeArea}>
            <ScrollView>
                <View style={styles.signUpBody}>
            <Text style={styles.signUpTitle}>Signup</Text>
           <Pressable onPress={pickImage} style={styles.imageSelector}>
                {image ?(
                    <Image style={styles.selectedImage} source={{uri:image}}/>
                ):(
                    
                    <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>+</Text>
                <Text style={styles.imageLabel}>Add Image</Text>
              </View>

                   
                )
            }
            </Pressable> 
            

            <TextInput style={styles.firstNameInput} placeholder="Type your first name" onChangeText={setFirstName} value= {getFirstName}></TextInput>
            <TextInput style={styles.lastNameInput} placeholder="Type your Last name" onChangeText={setLastName} value= {getLastName}></TextInput>
            <TextInput style={styles.emailInput} keyboardType="email-address" placeholder="Type your email" onChangeText={setEmail} value= {getEmail}></TextInput>
            <TextInput style={styles.passwordInput} secureTextEntry placeholder="Type your password" onChangeText={setpassword} value= {getPassword}></TextInput>
            <TextInput style={styles.passwordInput} secureTextEntry placeholder="Confirm your password" onChangeText={setConfirmPassword} value= {getConfirmPassword}></TextInput>
            <View style={styles.cityInput}>
                <Picker style={styles.cityInput} selectedValue={getCity} onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
                  <Picker.Item label="Select a city" value="0" />
                  {getCities.map((city) => (
                    <Picker.Item key={city.id} label={city.name} value={city.id} />
                  ))}
                </Picker>
            </View>
            

            <Pressable  style={styles.signUpButton}><Text style={styles.signUpButtonText} onPress={async ()=>{
                if(getFirstName=="" || getLastName=="" || getEmail=="" || getPassword=="" || getConfirmPassword=="" || getCity=="" || image==null){
                    Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Warning',
                    textBody: 'Please fill all the fields',
               });
               return;
                }

                let formData = new FormData();
                formData.append("firstName",getFirstName);
                formData.append("lastName",getLastName);
                formData.append("email",getEmail);
                formData.append("password",getPassword);
                formData.append("confirmPassword",getConfirmPassword);
                formData.append("city",getCity);
                if (image) {
                    formData.append("image", {
                      uri: image,
                      name: "profile.jpg",
                      type: "image/jpg"
                    } as any);
                }
                  const response = await fetch(PUBLIC_URL+"/NoteBook/Signup",{
                      method:"POST",
                      headers:{
                        "Content-Type":"multipart/form-data"
                      },
                      body:formData
                  });
                
                  if (response.ok) {
                    Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Account created successfully',
                   });
                  }else{
                    Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Account creation failed',
                    })
                  }


            }}>Signup</Text></Pressable>
            
            <View style={styles.loginContainer}>
              <Text style={styles.accountText}>Already have an account?</Text>
                <TouchableOpacity>
                  <Text style={styles.loginLink}> LogIn</Text>
                </TouchableOpacity>
            </View>
        </View>
            </ScrollView>
        </SafeAreaView>
        </AlertNotificationRoot>
    );

    
}


const styles = StyleSheet.create({
    safeArea:{
        flex: 1
    },

    signUpBody:{
        flex: 1,
        backgroundColor:"white"
    },

    signUpTitle:{
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50
        
    },


    firstNameInput: {
        height: 40,
        marginTop: 50,
        borderWidth: 1,
        padding: 10,
        width: 320,
        alignSelf: "center",
        borderRadius: 10
    },
    emailInput: {
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        width: 320,
        alignSelf: "center",
        borderRadius: 10
    },


    lastNameInput: {
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        width: 320,
        alignSelf: "center",
        borderRadius: 10
    },
cityInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: 320,
    alignSelf: "center",
    marginTop: 15, 
    overflow: 'hidden',
    height: 55,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
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

    signUpButton:{
        height: 50,
        marginTop: 40,
        borderWidth: 1,
        padding: 10,
        width: 320,
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "green",
        
    },

    signUpButtonText:{
        color: "white",
        textAlign: "center",
        fontSize: 18
    },

    imageSelector:{
        width: 100,
        height: 100,
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "black"
    },

    selectedImage:{
        width: "100%",
        height: "100%",
        borderRadius: 60
    },

    imagePlaceholder: {
    alignItems: "center",
  },
  imageText: {
    fontSize: 36,
    color: "#342f3dff",
    marginBottom: 5,
  },
  imageLabel: {
    fontSize: 14,
    color: "#2b3ac0ff"
  },

    loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20

},
accountText: {
    fontSize: 16,
    color: "#333",
    
},
loginLink: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    
}


});