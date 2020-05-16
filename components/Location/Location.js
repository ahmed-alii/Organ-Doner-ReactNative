import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import DisplayCard from "../ConstantCardUI/Card";
import MapView, { Marker } from "react-native-maps";

export default ({ navigation, route }) => {
  console.disableYellowBox = true;
  
  //This File is used  to give the location coordinates  of the user and the doner on the map
  
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
    <View style={{flex:1}}>
      <View>
        <Text style={{ margin: 20, fontSize: 22 }}>Map</Text>
        <MapView
          style={{ height: 300 }}
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
        <ScrollView>
            <DisplayCard result={route.params.result} />
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
