import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

export default function App() {
  const[getName,setName]=React.useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List View</Text>
      <FlatList
        data= {[{name:"sahan"},{name:"Kamal"},{name:"Kasun"}]}
        renderItem={({item})=>{
          return<Button title={item.name} />
        }}
      />
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    justifyContent: 'center',
    
  },

  title:{
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'

  },
  nameInput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  }
});
