import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, AsyncStorage } from "react-native";
import image from "./assets//images/react.png";
import profile from "./assets//images/account.png";
import pen from "./assets//images/pen.png";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Axios from "axios";
import { api } from "./Api";
import { useStateValue } from "./state";
import { Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Updates from 'expo-updates';
const Account = function (props) {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    jobTitle: "",
    userId:""
  });
  const [userData, setUserData] = useState("");
  const [language, setLanguage] = useState("en");

  const [isReady, setIsReady] = useState(false);
  const [
    {
      calResponse,
      userDataPayload,
      taskDetailPayload,
      currentInboxListForPayload,
      languagePayload
    },
    dispatch
  ] = useStateValue();
  // const userDataPayload ={
  //   session:"miasiab avsaysva sauysv aus jvas"
  // }
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

    async function _bootstrapAsync() {
      const userData = await AsyncStorage.getItem("userData");
      const language = await AsyncStorage.getItem("language");

      setLanguage(JSON.parse(language));

      dispatch({
        type: "userData",
        userDataPayload: JSON.parse(userData)
      });

      getUserDetails(JSON.parse(userData).session);

      async function getUserDetails(id) {
        const result = await Axios.post(`${api}/cms/rest/auth/getUserDetails`, {
          // sessionKey: userDataPayload ? userDataPayload.session : id
          sessionKey: userDataPayload.session
        });

        // result.data.valid
          // ? 
          setUserDetails(result.data.result)
          // : null
      }

      setUserData(JSON.parse(userData) ? JSON.parse(userData).session : "");
    }

    _bootstrapAsync();

    fetchMyAPI();
    return () => {
      didCancel = true;
    };
  }, [userData]);

  const { navigate } = props.navigate;

  const handleLogout = function () {
    _bootstrapAsync = async () => {
      async function Logout() {
        const result = await Axios.post(`${api}/cms/rest/auth/logout`, {
          sessionKey: userDataPayload ? userDataPayload.session : id
        });
      }
      Logout();

      const userData = await AsyncStorage.clear();
      Updates.reloadAsync()
      navigate("Auth");

    };

    _bootstrapAsync();
  };

  const toggleLanguage = function (language) {
    _setAsync = async () => {
      await AsyncStorage.multiSet(
        [["language", JSON.stringify(JSON.parse(JSON.stringify(language)))]],
        () => {
          setLanguage(language);

          dispatch({
            type: "language",
            languagePayload: language
          });
        }
      );
    };

    _setAsync();
  };

  const { name, email, jobTitle, userImage } = userDetails;

  return (
    <View>
      {/* <View style={styles.secondaryContainer}>
        <View>
          <Image
            source={image}
            style={styles.image}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View style={{}}>
          <Text style={styles.inbox}>
            {" "}
            {language === "en" ? "My Account" : "حسابي"}
          </Text>
        </View>
        <View style={styles.icon} onPress={() => props.setCurrentTab(1)}>
          <Icon
            name="bell"
            size={20}
            color="gray"
            style={styles.iconText}
            onPress={() => props.setCurrentTab(1)}
          />
        </View>
        <View>
          <Text style={styles.number} onPress={() => props.setCurrentTab(1)}>
            5
          </Text>
        </View>
      </View> */}
      <View
        style={
          language === "en" ? styles.secondContainer : styles.secondContainera
        }
      >
        <View>
          <Image
            source={image}
            style={styles.image}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View>
          <Text style={styles.inboxText}>
            {language === "en" ? "My Account" : "حسابي"}
          </Text>
        </View>
        {/* <View style={styles.bell}>
          <Icon
            name="bell"
            size={20}
            color="gray"
            onPress={() => props.setCurrentTab(1)}
          />
        </View>
        <View>
          <Text
            style={language === "en" ? styles.badge : styles.badgea}
            onPress={() => props.setCurrentTab(1)}
          >
            5
          </Text>
        </View>
      */}
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingBottom: 20
        }}
      >
        <View style={{ flex: 2 }}>
          {/* <Image source={profile} style={{ height: 100, width: 100 }} /> */}
          {
            userImage ? (
              <Image source={{ uri: `data:image/png;base64,${userImage}` }} style={{ height: 100, width: 100 }} />
            ) : <Image source={profile} style={{ height: 100, width: 100 }} />
          }

          {/* <Text
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 50,
              marginTop: 10,
              padding: 5,
              textAlign: "center"
            }}
          >
            {language === "en" ? "Change DP" : "تغيير الصورة"}
          </Text> */}
        </View>
        <View style={{ flex: 3, paddingTop: 30, paddingLeft: 10 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{name}</Text>
          {/* <Text>Street Name , UAE</Text> */}
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          {/* <Image
            source={pen}
            style={styles.image}
            style={{ width: 20, height: 20 }}
          /> */}
        </View>
      </View>
      <View>
        <Text
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            color: "#0d447a"
          }}
        >
          {language === "en" ? "Designation" : "تعيين"} : {jobTitle}
        </Text>
        <Text
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            color: "#0d447a"
          }}
        >
          {language === "en" ? "Email" : "البريد الإلكتروني"} : {email}
        </Text>
        {/* <View>
          <Text
            style={{
              paddingTop: 10,
              paddingHorizontal: 15,
              color: "#0d447a"
            }}
          >
            {language === "en" ? "Address" : "عنوان"}
          </Text>
          <Text
            style={{
              paddingHorizontal: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              color: "#ccc",
              paddingBottom: 10
            }}
          >
            Street Name Or PO Box 123456, Doha, Qatar
          </Text>
        </View> */}
        {/* <Text
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            color: "#0d447a"
          }}
        >
          {language === "en" ? "Reset Password" : "إعادة تعيين كلمة المرور"}
        </Text> */}

        {/* <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            color: "#0d447a"
          }}
         >
          <Text style={{ color: "#0d447a" }}>
            {" "}
            {language === "en" ? "Language" : "لغة"}
          </Text>

          <TouchableOpacity onPress={() => toggleLanguage("en")}>
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                color: "#0d447a",
                alignSelf: language === "en" ? "flex-start" : "flex-end"
              }}
            >
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleLanguage("ar")}>
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                color: "#0d447a",
                alignSelf: language === "en" ? "flex-start" : "flex-end"
              }}
            >
              عربى
            </Text>
          </TouchableOpacity>
        </View> */}
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              color: "#0d447a",
              alignSelf: language === "en" ? "flex-start" : "flex-end"
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  secondContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  secondContainera: {
    display: "flex",
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  secondaryContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    paddingHorizontal: 15,
    display: "flex"
  },
  bell: {
    marginLeft: "auto",
    flexDirection: "row"
  },
  icon: {
    flex: 1
  },
  inboxText: {
    fontSize: 15,
    paddingLeft: 5
  },
  badge: {
    color: "#fff",
    backgroundColor: "red",
    borderRadius: 100,
    paddingHorizontal: 5,
    position: "absolute",
    right: 0,
    top: -7,
    fontSize: 10
  },
  badgea: {
    color: "#fff",
    backgroundColor: "red",
    borderRadius: 100,
    paddingHorizontal: 5,
    position: "absolute",
    left: 0,
    top: -7,
    fontSize: 10
  },
  iconText: {
    textAlign: "right"
  },
  number: {
    borderRadius: 100,
    color: "#fff",
    backgroundColor: "red",
    paddingHorizontal: 5,
    position: "absolute",
    right: 0,
    top: -7,
    fontSize: 10
  },
  inbox: {
    fontSize: 18,
    paddingLeft: 5,
    color: "#ce9a2c"
  }
});
