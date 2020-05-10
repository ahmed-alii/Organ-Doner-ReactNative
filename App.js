//Final Version
import React, {useState} from "react";
import {AsyncStorage, Platform, StatusBar, StyleSheet, Text, View,} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import CatSpecScreen from "./components/Category/SpecficCategorylist";
import LocationScreen from "./components/Location/Location";
import NTPScreen from "./components/NavigationToProfile";
import UserContext from "./connection/userContext";
import AuthNavigation from "./navigation/AuthNavigation";
import {Provider} from "./Context/DonerContext";
import {Provider as DonercatProvider} from "./Context/DonercatContext";
import {Provider as DonersearchProvider} from "./Context/DonersearchContex";

const Stack = createStackNavigator();

export default App = (navigation) => {
  const [loggedIn, setLoggedin] = useState(false);
  const value = {loggedIn, setLoggedin};
  const [data, setdata] = useState(false);
  AsyncStorage.getItem("Doner").then((value) => {
    setdata(JSON.parse(value).LogStatus);
    setLoggedin(JSON.parse(value).LogStatus);
  });
  if (data === undefined) {
    return <Text>Loading....</Text>;
  }
  if (loggedIn === true) {
    return (
        <UserContext.Provider value={value}>
          <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => (
                <View style={styles.container}>
                  {Platform.OS === "ios" && <StatusBar barStyle="default"/>}
                  <Provider>
                    <DonercatProvider>
                      <DonersearchProvider>
                        <NavigationContainer>
                          <Stack.Navigator>
                            <Stack.Screen
                                name="Profile"
                                component={BottomTabNavigator}
                            />
                            <Stack.Screen
                                name="CatSpec"
                                component={CatSpecScreen}
                                options={{title: "Specfied Category"}}
                            />
                            <Stack.Screen
                                name="Location"
                                component={LocationScreen}
                            />
                            <Stack.Screen
                                name="NTP"
                                component={NTPScreen}
                                options={{title: "Profile"}}
                            />
                          </Stack.Navigator>
                        </NavigationContainer>
                      </DonersearchProvider>
                    </DonercatProvider>
                  </Provider>
                </View>
            )}
          </UserContext.Consumer>
        </UserContext.Provider>
    );
  } else {
    return (
        <UserContext.Provider value={value}>
          <UserContext.Consumer>
            {({loggedIn, setLoggedin}) => (
                <View style={styles.container}>
                  {Platform.OS === "ios" && <StatusBar barStyle="default"/>}
                  <Provider>
                    <NavigationContainer>
                      {loggedIn === true && <Text>Hello</Text>}
                      <AuthNavigation/>
                    </NavigationContainer>
                  </Provider>
                </View>
            )}
          </UserContext.Consumer>
        </UserContext.Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
