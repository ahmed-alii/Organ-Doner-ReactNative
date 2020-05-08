import React from "react";
import { Input } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  onEndEditing,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      placeholderTextColor="grey"
      name={name}
      placeholder={placeholder}
      onEndEditing={onEndEditing}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
  },
});

export default FormInput;
