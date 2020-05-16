import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Categorylist from "../components/Category/Categorylist";

export default ({ navigation }) => {
  //This file is used to render the category Menu of the Donation-Type
  return (
    <View style={{ flex: 1 }}>
      <Categorylist navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({});
