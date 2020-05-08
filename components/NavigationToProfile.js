import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from "react-native";
import Profile from "../components/Profile/Profile";
import { Context } from "../Context/DonerContext";

export default ({ navigation, route }) => {
  const { state, getSingleuserdata } = useContext(Context);
  const [data, setdata] = useState();
  console.log("NTP" + navigation);
  useEffect(() => {
    navigation.addListener("focus", () => {
      getSingleuserdata();
      AsyncStorage.getItem("Doner").then((value) => {
        setdata(JSON.parse(value));
      });
    });
  });
  if (state === undefined || data === undefined) {
    return null;
  }
  console.log("NTP" + state + "NTP");
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Profile
          navgation={navigation}
          review={data.id === route.params.id ? false : true}
          result={state[route.params.id - 1]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
