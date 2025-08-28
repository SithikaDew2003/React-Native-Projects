
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [getFirstName,setFirstName]=React.useState("");
  const [getLastName,setLastName]=React.useState("");
  const [getCompany,setCompany]=React.useState("");
  const [getMobile,setMobile]=React.useState("");
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBody}>
        <Text style={styles.appTitle}>Create New Contact</Text>
        <Image source={require('./assets/favicon.png')} style={styles.image}/>
        <TextInput onChangeText={setFirstName} style={styles.firstNameInput} placeholder="first name"/>
        <TextInput onChangeText={setLastName} style={styles.lastNameInput} placeholder="last name"/>
        <TextInput onChangeText={setCompany} style={styles.companyInput} placeholder="company"/>
        <TextInput onChangeText={setMobile} style={styles.mobileInput} placeholder="mobile"/>
        <Pressable onPress={async ()=>{
            const contact = {
              mobile:getMobile,
              firstName:  getFirstName,
              lastName: getLastName,
              company: getCompany
            };

            const contactJson = JSON.stringify(contact);
            const response =  await fetch("https://bf2f87beee6f.ngrok-free.app/Web5/SaveContact",
              {
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:contactJson
              }

              
            );

            if (response.ok){
              Alert.alert("Success");
            }else{
              Alert.alert("Error");
              
            }




        }} style={styles.saveButton}><Text style={styles.saveButtonText}>Save</Text></Pressable>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  safeArea:{
    flex:1,
    backgroundColor:'white'
  },
  appBody:{
    flex:1,
    backgroundColor:'white',
    marginTop:40
  },
  appTitle:{
    fontSize:25,
    color:'black',
    textAlign:'center',
    marginTop:20,
    fontWeight:'bold'

  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20
  },

  firstNameInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10

  },
  lastNameInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10

  },
  companyInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10

  },
  mobileInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10

  },
  saveButton:{
    height: 45,
    backgroundColor:'black',
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    display :'flex',
    justifyContent:'center',
    
  },
  saveButtonText:{
    color:'white',
    textAlign:'center',
    fontSize:15
  }


});


