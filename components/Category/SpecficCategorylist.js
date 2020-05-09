import React, { useEffect, useContext, useState } from "react";
import { useRoute } from "@react-navigation/stack";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Context } from "../../Context/DonercatContext";
import DisplayCard from "../ConstantCardUI/Card";
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default ({ navigation, route }) => {
  const { state, getcatdata } = useContext(Context);
  const [Ainemate, setanimate] = useState();
  console.disableYellowBox = true;
  useEffect(() => {
    setanimate(true);
    getcatdata(route.params.type);
    setTimeout(() => {
      setanimate(false);
    }, 3000);
    navigation.addListener("focus", () => {
      setanimate(true);
      getcatdata(route.params.type);
      setTimeout(() => {
        setanimate(false);
      }, 3000);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Text style={{ margin: 30, fontWeight: "bold", fontSize: 32 }}>
              {route.params.type}
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
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 25,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 35,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  iconOT: {
    marginTop: 12,
  },
  Htext: {
    fontSize: 16,
    marginVertical: 14,
    fontFamily: "serif",
    fontWeight: "bold",
    flexGrow: 1,
    paddingLeft: 15,
  },
});
