import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import DisplayCard from "../components/ConstantCardUI/Card";
import { Context } from "../Context/DonersearchContex";

export default function SearchScreen({ navigation }) {
  const [value, setvalue] = useState("");
  const [result, setresult] = useState();
  const [Ainemate, setanimate] = useState();
  const { state, getsearch } = useContext(Context);
  console.disableYellowBox = true;
  
  //This File is used to render the list of the result from the user search
  
  useEffect(() => {
    navigation.addListener("focus", () => {
      setresult(undefined);
      getsearch(value);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <SearchBar
          name="Search"
          value={value}
          onChangeText={(ne) => {
            setvalue(ne);
          }}
          round
          lightTheme
          platform="default"
          containerStyle={{ marginVertical: 10 }}
          inputContainerStyle={styles.input}
          placeholder="Search"
          onEndEditing={() => {
            getsearch(value);
            setanimate(true);
            setresult(state);
            setTimeout(() => {
              setanimate(false);
            }, 5000);
          }}
        />
      </View>
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : result === undefined ? null : result.length == 0 ? (
        <Text>No Result</Text>
      ) : (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Text style={{ margin: 30, fontWeight: "bold", fontSize: 32 }}>
              Total Result({state.length})
            </Text>
            <FlatList
              data={state}
              key={"" + Math.floor(Math.random() * 9999999)}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("NTP", { id: item.id });
                    }}
                  >
                    <DisplayCard result={item} />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {},
});
