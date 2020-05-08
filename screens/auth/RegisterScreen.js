import React, { useState, useContext } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { DatePicker, Picker, Item, Icon } from "native-base";
import { Context } from "../../Context/DonerContext";

function RegisterScreen({ navigation }) {
  const [fullName, setName] = useState("");
  const [title, settitle] = useState("Mr.");
  const [age, setage] = useState(0);
  const [date, setdate] = useState("");
  const [donation_Type, setdonation_Type] = useState("");
  const [address, setaddress] = useState("");
  const [status, setstatus] = useState("Available");
  const [religion, setreligon] = useState("");
  const [phone, setphno] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { putregistrationdata } = useContext(Context);
  const [loading, setLoading] = useState(false);

  function goToLogin() {
    return navigation.navigate("Login");
  }
  function onValueChangetitle(value) {
    settitle(value);
  }
  function onValueChangedonation(value) {
    setdonation_Type(value);
  }
  function onValueChangestatus(value) {
    setstatus(value);
  }
  function onValueChangedate(value) {
    setdate(value);
  }

  async function handleOnSignup(actions) {
    let data = {
      id: 1,
      title: title,
      name: fullName,
      age: age,
      DOB: date.toString().substr(4, 12),
      address: address,
      donation_Type: donation_Type,
      status: status,
      religion: religion,
      email: email,
      ph: phone,
    };

    let formData = new FormData(data);

    console.log(data);
    putregistrationdata(data, () => {
      alert("Registration success. Please login.");
      setLoading(false);
      navigation.navigate("Login");
    }).catch((e) => {
      alert("Failed to register...");
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container} enabled behavior="height">
      <ScrollView style={{}}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 350 }}
            source={require("../../assets/icons/people.png")}
          />
          <Text
            style={{ fontSize: 32, fontWeight: "bold", fontStyle: "italic" }}
          >
            Registor
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            <Text
              style={{
                fontSize: 18,
                paddingTop: 10,
                flexGrow: 1,
                marginLeft: 5,
              }}
            >
              Title:
            </Text>
            <Item picker style={{ width: 250 }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={title}
                onValueChange={onValueChangetitle}
              >
                <Picker.Item label="Mr." value="Mr." />
                <Picker.Item label="Ms." value="Ms." />
                <Picker.Item label="Mrs." value="Mrs." />
                <Picker.Item label="Miss" value="Miss" />
                <Picker.Item label="Mx." value="Mx." />
                <Picker.Item label="Sir" value="Sir" />
                <Picker.Item label="Dr." value="dr." />
              </Picker>
            </Item>
          </View>
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Full Name"
            value={fullName}
            onChangeText={(n) => setName(n)}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Age"
            value={age}
            keyboardType="numeric"
            onChangeText={(n) => setage(n)}
          />
          <View
            style={{
              flexDirection: "row",
              marginBottom: 25,
              marginHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: "grey",
            }}
          >
            <Text style={{ marginTop: 7, fontSize: 20, color: "grey" }}>
              Date:
            </Text>
            <DatePicker
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "grey" }}
              onDateChange={onValueChangedate}
              disabled={false}
            />
          </View>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            <Text
              style={{
                fontSize: 18,
                paddingTop: 10,
                flexGrow: 1,
                marginLeft: 10,
              }}
            >
              Donation Type:
            </Text>
            <Item picker style={{ width: 220 }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={donation_Type}
                onValueChange={onValueChangedonation}
              >
                <Picker.Item label="Liver" value="Liver" />
                <Picker.Item label="Heart" value="Heart" />
                <Picker.Item label="Lung" value="Lung" />
                <Picker.Item label="Kidney" value="Kidney" />
                <Picker.Item label="Intestine" value="Intestine" />
                <Picker.Item label="Pancreas" value="Pancreas" />
                <Picker.Item label="Blood" value="Blood" />
              </Picker>
            </Item>
          </View>
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Address"
            value={address}
            onChangeText={(n) => setaddress(n)}
          />
          <View>
            <View style={{ flexDirection: "row", marginBottom: 25 }}>
              <Text
                style={{
                  fontSize: 18,
                  paddingTop: 10,
                  flexGrow: 1,
                  marginLeft: 10,
                }}
              >
                Status:
              </Text>
              <Item picker style={{ width: 220 }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={status}
                  onValueChange={onValueChangestatus}
                >
                  <Picker.Item label="Available" value="Available" />
                  <Picker.Item label="UnAvailable" value="UnAvailable" />
                </Picker>
              </Item>
            </View>
          </View>

          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Religon"
            value={religion}
            onChangeText={(n) => setreligon(n)}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Phone"
            value={phone}
            keyboardType="numeric"
            onChangeText={(n) => setphno(n)}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={(n) => setEmail(n)}
            textContentType={"emailAddress"}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={(n) => setPassword(n)}
            textContentType={"password"}
          />
          <Button
            title={"Submit"}
            loading={loading}
            onPress={() => {
              setLoading(true);
              handleOnSignup();
            }}
          />
        </View>
        <Button
          title="Have an account? Login"
          onPress={goToLogin}
          titleStyle={{
            color: "#039BE5",
          }}
          type="clear"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
  input: {
    marginBottom: 10,
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
});

export default RegisterScreen;
