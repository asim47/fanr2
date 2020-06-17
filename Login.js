/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
  StyleSheet,
  Image,
  Dimensions,
  Platform
} from "react-native";
import { Container, Text } from "native-base";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import axios from "axios";
import { api } from "./Api";

const Login = function(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [language, setlanguage] = useState("");
  const [List, setList] = useState("");
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

  const signIn = function() {
    0;
    axios
      .post(`${api}/cms/rest/auth/login`, {
        user: userName,
        password: password
      })
      .then(res => {
        //       if(res.data.status == "SUCCESS"){
        //         dispatch({
        //              type: "currentInboxListFor",
        //              currentInboxListForPayload: "allTasks"
        // })
        //       }
        _signInAsync = async () => {
          await AsyncStorage.multiSet(
            [
              [
                "userData",
                JSON.stringify(JSON.parse(JSON.stringify(res.data)))
              ],
              ["language", JSON.stringify(JSON.parse(JSON.stringify("en")))]
            ],
            () => {
              navigate("App");
            }
          );

          // langua()
        };

        res.data.status === "FAILED"
          ? alert("Login unsuccessful")
          : _signInAsync();
      })
      .catch(err => {
        alert("Login unsuccessful!");
        // navigate("App");
      });
  };

  const validateForm = function() {
    return userName && password ? true : false;
  };

  if (!isReady) {
    return <AppLoading />;
  }
  // async function langua() {
  //   await AsyncStorage.getItem("language").then((res) => {
  //     console.log("res", res);

  //     setlanguage(JSON.parse(res))
  //   })

  // }
  // AsyncStorage.getItem("language")
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
          <Text style={CustomStyles.formTitle}>Login</Text>
          {/* <Icon2
            name="md-unlock"
            size={40}
            color="#fff"
            style={{
              position: "absolute",
              bottom: -26,
              left: "50%"
            }}
          /> */}
        </View>
        <View>
          <Input
            placeholder="Username"
            inputContainerStyle={{ borderBottomColor: "#ebebeb" }}
            leftIcon={
              <Icon2
                name="md-person"
                size={18}
                color="#C0C0C0"
                style={CustomStyles.inputIcon}
              />
            }
            value={userName}
            onChangeText={val => setUserName(val)}
          />
        </View>
        <View>
          <Input
            placeholder="Password"
            inputContainerStyle={{ borderBottomColor: "#ebebeb" }}
            leftIcon={
              <Icon2
                name="md-unlock"
                size={18}
                color="#C0C0C0"
                style={CustomStyles.inputIcon}
              />
            }
            secureTextEntry={true}
            value={password}
            onChangeText={val => setPassword(val)}
          />
        </View>
        <View style={CustomStyles.loginButtonHolder}>
          <Button
            title="Login"
            buttonStyle={{ backgroundColor: "#d2992c" }}
            onPress={() => {
              if (validateForm()) {
                signIn();
              } else alert("Please fill required fields");
            }}
            value={password}
            secureTextEntry={true}
          />
        </View>
        {/* <TouchableWithoutFeedback
          style={{ padding: 10 }}
          onPress={() => navigate("ResetPassword")}
        >
          <Text style={CustomStyles.forgetPassword}>Forget your password?</Text>
        </TouchableWithoutFeedback> */}
      </View>
      <Text style={CustomStyles.websiteUrl}>www.fanr.gov.ae</Text>
    </Container>
  );
};

export default Login;

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
