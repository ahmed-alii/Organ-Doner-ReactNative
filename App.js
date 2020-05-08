import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import CatSpecScreen from "./components/Category/SpecficCategorylist";
import LocationScreen from "./components/Location/Location";
import NTPScreen from "./components/NavigationToProfile";
import UserContext from "./connection/userContext";
import AuthNavigation from "./navigation/AuthNavigation";
import { Provider } from "./Context/DonerContext";

const Stack = createStackNavigator();

export default App = () => {
  const [loggedIn, setLoggedin] = useState(false);
  const value = { loggedIn, setLoggedin };
  const [data, setdata] = useState(false);
  AsyncStorage.getItem("Doner").then((value) => {
    console.log(value);
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
          {({ loggedIn, setLoggedin }) => (
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <Provider>
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen
                      name="Profile"
                      component={BottomTabNavigator}
                    />
                    <Stack.Screen name="CatSpec" component={CatSpecScreen} />
                    <Stack.Screen name="Location" component={LocationScreen} />
                    <Stack.Screen name="NTP" component={NTPScreen} />
                    {/* <Stack.Screen name="Facebook" component={FacebookScreen} /> */}
                  </Stack.Navigator>
                </NavigationContainer>
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
          {({ loggedIn, setLoggedin }) => (
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <Provider>
                <NavigationContainer>
                  {loggedIn === true && <Text>Hello</Text>}
                  <AuthNavigation />
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
