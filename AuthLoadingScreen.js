import React, { useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View
} from "react-native";

import { useStateValue } from "./state";
import Axios from "axios";
import { api } from "./Api";

const AuthLoadingScreen = function (props) {
  const [{ calResponse }, dispatch] = useStateValue();

  useEffect(() => {
    _bootstrapAsync();
  }, []);

  _bootstrapAsync = async () => {
    const userData = await AsyncStorage.getItem("userData");

 
    let data = JSON.parse(userData)

    if(!userData){
      return props.navigation.navigate("Auth");
    }
    dispatch({
      type: "userData",
      userDataPayload: data
    });
    console.log("Going to send request")
    Axios.post(api + "/cms/rest/auth/getUserDetails", {
      sessionKey: data.session
    }).then((res) => {
      if (res.data.status == "SUCCESS") {
        // props.navigation.navigate(JSON.parse(userData) ? "App" : "Auth");
       return props.navigation.navigate("App");
      } else {
      return  props.navigation.navigate("Auth");
      }
    }).catch(()=>{
      props.navigation.navigate("Auth");
    })
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
