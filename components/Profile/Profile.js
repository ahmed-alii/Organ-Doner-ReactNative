import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, AsyncStorage, Share } from "react-native";
import { Avatar } from "react-native-elements";
import {
  Icon,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Input,
  Item,
  Fab,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../../Context/DonerContext";

export default ({ navgation, result, review }) => {
  const [active, setactive] = useState(false);
  const { state, getSingleuserdata, putcomment } = useContext(Context);
  const [value, setvalue] = useState("");
  console.disableYellowBox = true;
  var id;
  var state2;
  useEffect(() => {
    getSingleuserdata();
    navgation.addListener("state", () => {
      getSingleuserdata();
    });
  }, []);

  if (state === undefined || state === "") {
    return <Text>Loding....</Text>;
  }
  state2 = state[result - 1];
  if (state2 === undefined) {
    return null;
  }
  const addcom = async () => {
    var t;
    await AsyncStorage.getItem("Doner").then((value) => {
      t = JSON.parse(value);
    });
    var n = t.name.split(".");
    let data = {
      id: result,
      user: t.id,
      comment: value,
      title: n[0] + ".",
      name: n[1],
    };
    console.log(data);
    putcomment(data, () => {
      setvalue("");
      getSingleuserdata();
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Name:${state2.name}\nDonation Type${state2.donation_Type}\nEmail:${state2.email}\nPhone no:${state2.ph}\nAddress:${state2.address}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onPresFab = (value) => {
    setactive(!active);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginBottom: 70 }}>
        <Fab
          active={active}
          direction="down"
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="topRight"
          onPress={onPresFab}
        >
          <Icon name="share" onPress={onShare} />
        </Fab>

        <Avatar
          source={
            state2.title == "Mrs." ||
            state2.title == "Miss" ||
            state2.title == "Ms."
              ? require("../../assets/icons/fuser.png")
              : require("../../assets/icons/user.png")
          }
          size="xlarge"
          avatarStyle={{ borderRadius: 10 }}
          containerStyle={{
            backgroundColor: "white",
            borderRadius: 20,
            marginTop: 60,
          }}
        />
      </View>
      <View>
        <Card>
          <CardItem>
            <Icon name="user-alt" type="FontAwesome5" />
            <Left>
              <Text>Name</Text>
            </Left>
            <Body>
              <Text> {state2.name}</Text>
            </Body>
            <Right>
              <Text style={{ fontSize: 18 }}>
                <Icon
                  name="primitive-dot"
                  type="Octicons"
                  style={{ color: "#29eb0c" }}
                />
                {state2.status}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon name="child" type="FontAwesome5" />
            <Left>
              <Text>Age</Text>
            </Left>
            <Right>
              <Text>{state2.age}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon name="calendar-alt" type="FontAwesome5" />
            <Left>
              <Text>Date of Birth</Text>
            </Left>
            <Right>
              <Text>{state2.DOB}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon name="mail" type="Entypo" />
            <Left>
              <Text>Mail</Text>
            </Left>
            <Right>
              <Text>{state2.email}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon name="phone" type="Entypo" />
            <Left>
              <Text>phone#</Text>
            </Left>
            <Right>
              <Text>{state2.ph}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon name="map" type="FontAwesome5" />
            <Left>
              <Text>Address</Text>
            </Left>
            {review === false ? null : (
              <Body>
                <Text>{state2.address}</Text>
              </Body>
            )}
            {review === false ? (
              <Right>
                <Text>{state2.address}</Text>
              </Right>
            ) : (
              <Right>
                <TouchableOpacity
                  onPress={() => {
                    navgation.navigate("Location", { result: state2 });
                  }}
                >
                  <Icon
                    name="location-arrow"
                    type="FontAwesome5"
                    style={{ fontSize: 26, color: "#139de8" }}
                  />
                </TouchableOpacity>
              </Right>
            )}
          </CardItem>
          <CardItem>
            <Icon name="praying-hands" type="FontAwesome5" />
            <Left>
              <Text> Religon</Text>
            </Left>
            <Right>
              <Text>{state2.religion}</Text>
            </Right>
          </CardItem>
          <CardItem>
            <Icon name="hand-holding" type="FontAwesome5" />
            <Left>
              <Text> Donation Type</Text>
            </Left>
            <Right>
              <Text>{state2.donation_Type}</Text>
            </Right>
          </CardItem>
        </Card>
      </View>
      <View>
        <Card>
          <CardItem>
            <Icon name="rate-review" type="MaterialIcons" />
            <Left>
              <Text> Reviews</Text>
            </Left>
          </CardItem>
          <CardItem style={{ flexDirection: "column" }}>
            {state2.reviews !== undefined ? (
              state2.reviews.map((item, key) => (
                <View style={{ alignSelf: "flex-start", width: "100%" }}>
                  <Card>
                    <CardItem>
                      <Left>
                        <Avatar
                          rounded
                          source={
                            item.title == "Mrs." ||
                            item.title == "Miss" ||
                            item.title == "Ms."
                              ? require("../../assets/icons/fuser.png")
                              : require("../../assets/icons/user.png")
                          }
                          size="small"
                          containerStyle={{
                            backgroundColor: "#cacbcc",
                          }}
                        />
                        <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text style={{ marginLeft: 10 }}>{item.comment}</Text>
                      </Body>
                    </CardItem>
                  </Card>
                </View>
              ))
            ) : (
              <Text>No Comment</Text>
            )}
          </CardItem>
          {review === false ? null : (
            <CardItem>
              <Left>
                <Item rounded>
                  <Input
                    placeholder="Comment"
                    value={value}
                    onChangeText={(r) => {
                      setvalue(r);
                    }}
                  />
                </Item>
              </Left>
              <TouchableOpacity onPress={() => {}} style={{ left: 15 }}>
                <Icon
                  name="ios-arrow-forward"
                  type="Ionicons"
                  style={{ fontSize: 46, color: "#139de8" }}
                  onPress={addcom}
                />
              </TouchableOpacity>
            </CardItem>
          )}
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
