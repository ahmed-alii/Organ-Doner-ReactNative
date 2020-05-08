import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Share,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
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
import { ShareDialog } from "react-native-fbsdk";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { Context } from "../../Context/DonerContext";

export default ({ navgation, result, review }) => {
  const [data, setdata] = useState();
  const [animate, setanimate] = useState();
  const [active, setactive] = useState(false);
  const { state, getSingleuserdata } = useContext(Context);
  console.disableYellowBox = true;
  var id;
  var state2;
  if (navgation.isFocused) {
    useEffect(() => {
      navgation.addListener("focus", () => {
        console.log("ff");
        getSingleuserdata();
        AsyncStorage.getItem("Doner").then((value) => {
          setdata(JSON.parse(value));
        });
      });
    });
  }

  const shareLinkContent = {
    contentType: "link",
    contentUrl: "https://facebook.com",
    contentDescription: "Facebook sharing is easy!",
  };

  const onPresFab = (value) => {
    setactive(!active);
  };
  if (state === undefined || state === "") {
    return (
      <ActivityIndicator
        animating={true}
        size="large"
        color="#0000ff"
        style={{ marginTop: "50%" }}
      />
    );
  }
  console.log(result + "P");
  if (result === undefined) {
    if (data === undefined) {
      return <Text>Loding....</Text>;
    }
    id = data.id;
    state2 = state[id - 1];
  } else {
    console.log("true");
    state2 = result;
  }
  if (state2 === undefined) {
    return null;
  }

  // function shareLinkWithShareDialog() {
  //   var tmp = shareLinkContent;
  //   console.log(shareLinkContent);
  //   ShareDialog.show("hello")
  //     .then(function(canShow) {
  //       if (canShow) {
  //         return ShareDialog.show(shareLinkContent);
  //       }
  //     })
  //     .then(
  //       function(result) {
  //         if (result.isCancelled) {
  //           alert("Share operation was cancelled");
  //         } else {
  //           alert("Share was successful with postId: " + result.postId);
  //         }
  //       },
  //       function(error) {
  //         alert("Share failed with error: " + error.message);
  //       }
  //     );
  // }
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
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
          <Icon name="share" />
          <Button style={{ backgroundColor: "#3B5998" }} onPress={onShare}>
            <Icon name="logo-facebook" />
          </Button>
          <Button style={{ backgroundColor: "#1DA1F2" }}>
            <Icon name="logo-twitter" />
          </Button>
          <Button style={{ backgroundColor: "#3f729b" }}>
            <Icon name="logo-instagram" />
          </Button>
          <Button style={{ backgroundColor: "#34A34F" }}>
            <Icon name="logo-whatsapp" />
          </Button>
          <Button disabled style={{ backgroundColor: "#DD5144" }}>
            <Icon name="mail" />
          </Button>
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
          <CardItem>
            <FlatList
              data={state2.reviews}
              key={"" + Math.floor(Math.random() * 9999999)}
              renderItem={({ item }) => {
                return (
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
                );
              }}
            />
          </CardItem>
          {review === false ? null : (
            <CardItem>
              <Left>
                <Item rounded>
                  <Input placeholder="Comment" />
                </Item>
              </Left>
              <TouchableOpacity onPress={() => {}} style={{ left: 15 }}>
                <Icon
                  name="ios-arrow-forward"
                  type="Ionicons"
                  style={{ fontSize: 46, color: "#139de8" }}
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
