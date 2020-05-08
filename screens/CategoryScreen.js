import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Categorylist from "../components/Category/Categorylist";

export default ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Categorylist navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({});
