import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Avatar, Button, ThemeContext } from "react-native-elements";
import {
  Icon,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Input,
  Item,
} from "native-base";

export default ({ result }) => {
  
  //This File is the UI card to show as a single list item as a short detail of the user on the search screen and category screen 
  
  return (
    <View style={{ margin: 20 }}>
      <Card
        style={{
          borderTopLeftRadius: 80,
          borderBottomLeftRadius: 80,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <CardItem
          style={{
            borderTopLeftRadius: 80,
            borderBottomLeftRadius: 80,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Left>
            <Avatar
              rounded
              source={
                result.title == "Mrs." ||
                result.title == "Miss" ||
                result.title == "Ms."
                  ? require("../../assets/icons/fuser.png")
                  : require("../../assets/icons/user.png")
              }
              size="large"
              avatarStyle={{ borderRadius: 10 }}
              containerStyle={{
                backgroundColor: "#cacbcc",
              }}
            />
          </Left>
          <Body style={{ alignSelf: "center", flexGrow: 1 }}>
            <Text>{result.name}</Text>
            <Text>Donation:{result.donation_Type}</Text>
            <Text>
              <Icon
                name="chat"
                type="MaterialIcons"
                style={{ color: "#0099ff", fontSize: 18 }}
              />
              Comment({result.reviews !== undefined ? result.reviews.length : 0}
              )
            </Text>
          </Body>
          <Right style={{ alignSelf: "flex-start" }}>
            <Text style={{ fontSize: 12 }}>
              <Icon
                name="primitive-dot"
                type="Octicons"
                style={{
                  color: result.status === "Available" ? "#29eb0c" : "red",
                  fontSize: 12,
                }}
              />
              Status
            </Text>
          </Right>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});
