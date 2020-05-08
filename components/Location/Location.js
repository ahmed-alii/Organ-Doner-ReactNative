import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DisplayCard from "../ConstantCardUI/Card";
import MapView, { Marker } from "react-native-maps";

import Geolocation from "react-native-geolocation-service";

export default ({ navigation, route }) => {
  console.log("Location");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  const region = {
    latitude: 31.5310513,
    longitude: 74.2925706,
  };
  return (
    <View>
      <View style={{ height: 570 }}>
        <Text style={{ margin: 20, fontSize: 22 }}>Map</Text>
        <MapView
          style={{ height: 500 }}
          showsUserLocation={true}
          initialRegion={{
            latitude: 31.5310513,
            longitude: 74.2925706,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={region}
            style={{ height: 5 }}
            image={require("../../assets/icons/pin.png")}
          />
        </MapView>
      </View>
      <DisplayCard result={route.params.result} />
    </View>
  );
};

const styles = StyleSheet.create({});
