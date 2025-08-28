import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
  <KeyboardAvoidingView style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contact Book</Text>
      <TextInput
        placeholder="Mobile"
        style={styles.mobileInput}
        keyboardType="phone-pad"
      />
      <TextInput placeholder="Name" style={styles.nameInput} />
      <Pressable style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.viewAll}>View Contacts</Text>
      </Pressable>
    </ScrollView>

    <FlatList
      style={styles.flatListContainer}
      data={[
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
        { name: "Rahul", mobile: "1234567890" },
      ]}
      renderItem={({ item }) => {
        return (
          <View style={styles.contactListView}>
            <View style={styles.nameIcon}>
              <Text style={styles.nameIconText}>A</Text>
            </View>
            <Text style={styles.nameView}>{item.name}</Text>
            <Text style={styles.mobileView}>{item.mobile}</Text>
            <Image
              style={styles.whatsappIcon}
              source={require("./assets/whatsapp.png")}
            />
          </View>
        );
      }}
    />
  </KeyboardAvoidingView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "blue",
    marginTop: 40,
  },
  mobileInput: {
    height: 45,
    marginTop: 50,
    borderRadius: 10,
    borderColor: "gray",
    fontSize: 15,
    borderWidth: 1,
    padding: 10,
    width: 300,
    alignSelf: "center",
  },
  nameInput: {
    height: 45,
    marginTop: 20,
    borderRadius: 10,
    borderColor: "gray",
    fontSize: 15,
    borderWidth: 1,
    padding: 10,
    width: 300,
    alignSelf: "center",
  },
  saveButton: {
    height: 45,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    alignSelf: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
  },
  viewAll: {
    marginTop: 20,
    fontSize: 15,
    color: "blue",
    marginLeft: 35,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  contactListView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
    marginRight: 30,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  nameView: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "bold",
  },
  mobileView: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: "bold",
  },
  nameIcon: {
    width: 30,
    height: 30,
    borderRadius: 60,
    backgroundColor: "#F5F5DC",
    marginLeft: 10,
  },
  nameIconText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  whatsappIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  flatListContainer: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "gray",
    
    width: 350,
    
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    
  },
});
