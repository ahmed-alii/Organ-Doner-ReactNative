import React, { useState, useContext } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
} from "react-native";
import { Button, Input, ThemeContext } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker, Item, Icon } from "native-base";
import { Context } from "../../Context/DonerContext";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [Location, setloac] = useState({ latitude: 0, longitude: 0 });
  const [valid, setvalid] = useState(false);

  console.disableYellowBox = true;
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
      Location: Location,
      ph: phone,
      password: password,
    };

    if (fullName === "") {
      alert("Enter Your Name!");
      setLoading(false);
      return false;
    } else if (age === 0) {
      alert("Enter Your Proper Age!");
      setLoading(false);
      return false;
    } else if (date === "") {
      alert("Enter Your Date of Birth By Clicking on it!");
      setLoading(false);
      return false;
    } else if (address === "") {
      alert("Enter Your Address!");
      setLoading(false);
      return false;
    } else if (Location.latitude === 0 && Location.longitude === 0) {
      alert("Enter Your Location By Tabing on Location Icon!");
      setLoading(false);
      return false;
    } else if (religion === "") {
      alert("Enter Your Religon!");
      setLoading(false);
      return false;
    } else if (phone === 0) {
      alert("Enter Your Phone No#!");
      setLoading(false);
      return false;
    } else if (email === "") {
      alert("Enter Your Email!");
      setLoading(false);
      return false;
    } else if (password === "") {
      alert("Enter Your Password!");
      setLoading(false);
      return false;
    }

    let formData = new FormData(data);
    putregistrationdata(data, () => {
      alert("Registration success. Please login.");
      setLoading(false);
      navigation.navigate("Login");
    }).catch((e) => {
      alert("Failed to register...");
    });
  }

  const showDatepicker = () => {
    showMode("date");
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setdate(currentDate);
  };
  return (
    <KeyboardAvoidingView style={styles.container} enabled behavior={Platform.OS === "ios"? "padding": "height"}>
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
          {show && (
            <DateTimePicker
              locale="en"
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
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
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={showDatepicker}
            >
              <Icon
                name="calendar-alt"
                type="FontAwesome5"
                style={{ color: "green", fontSize: 21 }}
              />
              <Text style={{ fontSize: 18, marginLeft: 5 }}>Select Date:</Text>
              <Text
                style={{
                  marginLeft: 3,
                  fontSize: 18,
                  color: "green",
                }}
              >
                {date.toString().substr(4, 12)}
              </Text>
            </TouchableOpacity>
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
                placeholder="Select your Donation "
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
          <TouchableOpacity
            style={{ flexDirection: "row", marginLeft: 10, marginBottom: 10 }}
            onPress={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setloac({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
            }}
          >
            <Icon
              name="my-location"
              type="MaterialIcons"
              style={{ color: "green" }}
            />
            <Text style={{ fontSize: 18, marginLeft: 5 }}>
              Click For Location
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 14, width: 180 }}>
              Latitude:{Location.latitude}
            </Text>
            <Text style={{ fontSize: 14 }}>Longitude:{Location.longitude}</Text>
          </View>

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
            textContentType={"emailAddres"}
            autoCapitalize={"none"}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={(n) => setPassword(n)}
            textContentType={"password"}
            autoCapitalize={"none"}
            secureTextEntry={true}
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
