import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from "react-native";
import Profile from "../components/Profile/Profile";
import { Context } from "../Context/DonerContext";

export default ({ navigation, route }) => {
  const [data, setdata] = useState();
  
  //Just a navigator file to render the profile of the user
  
  useEffect(() => {
    AsyncStorage.getItem("Doner").then((value) => {
      setdata(JSON.parse(value));
    });
  }, []);
  if (data === undefined) {
    return null;
  }
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Profile
          navgation={navigation}
          review={data.id === route.params.id ? false : true}
          result={route.params.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
