import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import ErrorMessage from "../../components/Form/ErrorMessage";
import { Context } from "../../Context/DonerContext";
import { AsyncStorage } from "react-native";
import UserContext from "../../connection/userContext";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password must have at least 6 characters "),
});

function Login({ navigation, firebase }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("ios-eye");
  const { loggedIn, setLoggedin } = useContext(UserContext);
  const { state, getlogindata } = useContext(Context);
  console.disableYellowBox = true;

  function goToSignup() {
    return navigation.navigate("Register");
  }

  function goToForgotPassword() {
    return navigation.navigate("Reset");
  }

  function handlePasswordVisibility() {
    if (rightIcon === "ios-eye") {
      setRightIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "ios-eye-off") {
      setRightIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values, actions) {
    var check = false;
    for (var i = 0; i < state.length; i++) {
      if (state[i].user === values.email && state[i].pass === values.password) {
        actions.setSubmitting(false);
        check = true;
        var Data = {
          id: state[i].id,
          title: state[i].title,
          name: state[i].name,
          LogStatus: true,
        };
        setLoggedin(true);
        await AsyncStorage.setItem("Doner", JSON.stringify(Data));
        break;
      }
    }
    if (check == false) {
      actions.setSubmitting(false);
      alert("Failed to login...");
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 300 }}
            source={require("../../assets/icons/people.png")}
          />
          <Text
            style={{ fontSize: 42, fontWeight: "bold", fontStyle: "italic" }}
          >
            Login
          </Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            handleOnLogin(values, actions);
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
          }) => (
            <>
              <FormInput
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor="#2C384A"
                onBlur={handleBlur("email")}
                onEndEditing={() => {
                  getlogindata(values.email);
                }}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name="password"
                value={values.password}
                onChangeText={handleChange("password")}
                placeholder="Enter password"
                secureTextEntry={passwordVisibility}
                iconName="ios-lock"
                iconColor="#2C384A"
                onBlur={handleBlur("password")}
                rightIcon={
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color="grey" />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="LOGIN"
                  buttonColor="#039BE5"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={goToSignup}
          titleStyle={{
            color: "#F57C00",
          }}
          type="clear"
        />
        <Button
          title="Forgot Password?"
          onPress={goToForgotPassword}
          titleStyle={{
            color: "#039BE5",
          }}
          type="clear"
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
});

export default Login;
