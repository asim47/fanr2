import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Platform } from "react-native";
import { Container, Text } from "native-base";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import axios from "axios";
import { api } from "./Api";

const ResetPassword = function(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState("");

  const { navigate } = props.navigation;

  useEffect(() => {
    let didCancel = false;

    async function fetchMyAPI() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
      });
      setIsReady(true);
    }

    fetchMyAPI();
    return () => {
      didCancel = true;
    };
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Container style={CustomStyles.container}>
      <Image
        source={require("./assets//images/bg1.png")}
        style={CustomStyles.backgroundImage}
      />
      <View style={CustomStyles.topImageHolder}>
        <Image
          source={require("./assets//images/logo.png")}
          style={CustomStyles.logo}
        />
      </View>
      <View style={CustomStyles.formHolder}>
        <View style={CustomStyles.formTitleHolder}>
          <Text style={CustomStyles.formTitle}>Forget Password</Text>
          <Icon
            name="sort-up"
            size={40}
            color="#fff"
            style={{
              position: "absolute",
              bottom: -26,
              left: "50%"
            }}
          />
        </View>
        <View style={{ position: "relative" }}>
          <Input
            placeholder="Recovery Email"
            inputContainerStyle={{ borderBottomColor: "#ebebeb" }}
            leftIcon={
              <Icon
                name="envelope"
                size={18}
                color="#C0C0C0"
                style={CustomStyles.inputIcon}
              />
            }
          />
        </View>
        <View style={CustomStyles.loginButtonHolder}>
          <Button title="Send" buttonStyle={{ backgroundColor: "#d2992c" }} />
        </View>
        <TouchableWithoutFeedback
          style={{ padding: 10 }}
          onPress={() => navigate("Login")}
        >
          <Text style={CustomStyles.forgetPassword}>Login</Text>
        </TouchableWithoutFeedback>
      </View>
      <Text style={CustomStyles.websiteUrl}>www.fanr.gov.ae</Text>
    </Container>
  );
};

export default ResetPassword;

const CustomStyles = StyleSheet.create({
  container: {
    backgroundColor: "#e7eef0",
    position: "relative"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch',
    opacity: 0.3,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9
  },
  topImageHolder: {
    backgroundColor: "#13303c",
    height: 250,
    padding: 20,
    paddingTop: 40,
    alignContent: "center"
  },
  logo: {
    width: 100,
    height: 117,
    alignSelf: "center"
  },
  formHolder: {
    position: "relative",
    top: -49,
    zIndex: 99,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderRadius: 10,
    margin: 50,
    marginTop: 0
  },
  formTitleHolder: {
    backgroundColor: "#d2992c",
    padding: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  formTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  websiteUrl: {
    color: "#d2992c",
    fontSize: 24,
    textAlign: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0
  },
  inputIcon: {
    marginLeft: -5,
    marginRight: 10
  },
  forgetPassword: {
    textAlign: "center",
    color: "#888"
  },
  loginButtonHolder: {
    marginTop: 30,
    marginBottom: 10
  }
});
