import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default ({ navigation }) => {
  console.disableYellowBox = true;
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"}}
        >
          <TouchableOpacity
            style={styles.cat}
            onPress={() => {
              navigation.navigate("CatSpec", { type: "Heart" });
            }}
          >
            <Image
              style={{ height: 120, width: 120, marginTop: 10 }}
              source={require("../../assets/icons/heart.png")}
            />
            <Text style={styles.catText}>Heart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cat}
            onPress={() => {
              navigation.navigate("CatSpec", { type: "Lung" });
            }}
          >
            <Image
              style={{ height: 120, width: 120, marginTop: 10 }}
              source={require("../../assets/icons/lungs.png")}
            />
            <Text style={styles.catText}>Lung's</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.cat}
            onPress={() => {
              navigation.navigate("CatSpec", { type: "Liver" });
            }}
          >
            <Image
              style={{ height: 120, width: 120, marginTop: 10 }}
              source={require("../../assets/icons/liver.png")}
            />
            <Text style={styles.catText}>Liver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cat}
            onPress={() => {
              navigation.navigate("CatSpec", { type: "Kidney" });
            }}
          >
            <Image
              style={{ height: 120, width: 120, marginTop: 10 }}
              source={require("../../assets/icons/kidney.png")}
            />
            <Text style={styles.catText}>Kidney</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center"}}
        >
          <TouchableOpacity
            style={styles.cat}
            onPress={() => {
              navigation.navigate("CatSpec", { type: "Intestine" });
            }}
          >
            <Image
              style={{ height: 120, width: 120, marginTop: 10 }}
              source={require("../../assets/icons/intestine.png")}
            />
            <Text style={styles.catText}>Intestine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cat}
            onPress={() => {
              navigation.navigate("CatSpec", { type: "Pancreas" });
            }}
          >
            <Image
              style={{ height: 120, width: 120, marginTop: 10 }}
              source={require("../../assets/icons/pancreas.png")}
            />
            <Text style={styles.catText}>Pancreas</Text>
          </TouchableOpacity>
        </View>
      <View
          style={{
            flexDirection: "row",
            justifyContent: "center"}}
        >
        <TouchableOpacity
            style={styles.cat}
            onPress={() => {
              navigation.navigate("CatSpec", { type: "Blood" });
            }}
        >
          <Image
              style={{ height: 120, width: 120, marginTop: 10 }}
              source={require("../../assets/icons/blood.png")}
          />
          <Text style={styles.catText}>Blood</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cat: {
    backgroundColor: "white",
    width: 150,
    height: 150,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  catText: { fontSize: 16, color: "#23a868", marginLeft: 4, marginBottom: 5 },
  catIcon: { fontSize: 42, marginTop: 10, color: "#23a868", marginLeft: 4 },
});
