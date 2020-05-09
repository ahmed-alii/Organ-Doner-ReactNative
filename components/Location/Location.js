import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DisplayCard from "../ConstantCardUI/Card";
import MapView, { Marker } from "react-native-maps";

export default ({ navigation, route }) => {
  console.disableYellowBox = true;
  if (route.params.result.Location === undefined) {
    return <Text style={{ margin: 20, fontSize: 18 }}>No Location Added</Text>;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {},
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  return (
    <View>
      <View style={{ height: 570 }}>
        <Text style={{ margin: 20, fontSize: 22 }}>Map</Text>
        <MapView
          style={{ height: 500 }}
          showsUserLocation={true}
          initialRegion={{
            latitude: route.params.result.Location.latitude,
            longitude: route.params.result.Location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={route.params.result.Location}
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
