import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Text,
  Tab,
  Tabs,
  TabHeading,
  ScrollableTab,
  Header,
  Title as BaseTitle
} from "native-base";
import { Button, Input, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import axios from "axios";
import { api } from "./Api";

import InboxContent from "./InboxContent";
import Modal from "./Modal";

const Inbox = function(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = React.useState(false);
  const { navigate } = props.navigation;

  const onBellClick = function() {
    setShowModal(true);
  };

  const onClose = function() {
    setShowModal(false);
  };

  return (
    <Container style={styles.container}>
      <View style={styles.PrimaryContainer}>
        <View>
          <Image
            source={require("./assets/images/logo-small.png")}
            style={{
              height: 24,
              width: 24
            }}
          />
        </View>
        <View>
          <Text style={styles.inbox}>Inbox</Text>
        </View>
        <View style={styles.icon}>
          <Icon name="bell" size={20} color="gray" style={styles.iconText} />
        </View>
        <View>
          <Text style={styles.number}>5</Text>
        </View>
      </View>
      <View style={styles.secondaryContainer}>
        <View>
          <Icon name="search" size={20} color="gray" />
        </View>
        <View>
          <TextInput
            placeholder="Search All Options"
            style={{ paddingLeft: 10 }}
          />
        </View>
      </View>
      <Tabs
        tabBarPosition="bottom"
        tabContainerStyle={{
          height: 70,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.6,
          shadowRadius: 3.84,

          elevation: 5
        }}
        tabBarUnderlineStyle={{
          backgroundColor: "transparent",
          height: 0
        }}
      >
        <Tab
          heading={
            <TabHeading style={{ flexDirection: "column" }}>
              <Icon
                style={{ color: "#B2B2B2", marginBottom: 3 }}
                size={22}
                name="envelope"
              />
              <Text style={{ color: "#B2B2B2" }}>Inbox</Text>
            </TabHeading>
          }
        >
          <ScrollView>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ev, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigate("Notification")}
              >
                <InboxContent />
              </TouchableOpacity>
            ))}
          </ScrollView>
          {showModal && <Modal open={showModal} onClose={() => onClose()} />}
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ flexDirection: "column" }}>
              <Icon
                style={{ color: "#B2B2B2", marginBottom: 3 }}
                size={22}
                name="bell"
              />
              <Text style={{ color: "#B2B2B2" }}>Notifications</Text>
            </TabHeading>
          }
        >
          <Text>2</Text>
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ flexDirection: "column" }}>
              <Icon
                style={{ color: "#B2B2B2", marginBottom: 3 }}
                size={22}
                name="search"
              />
              <Text style={{ color: "#B2B2B2" }}>Search Doc</Text>
            </TabHeading>
          }
        >
          <Text>3</Text>
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ flexDirection: "column" }}>
              <Icon
                style={{ color: "#B2B2B2", marginBottom: 3 }}
                size={22}
                name="user"
              />
              <Text style={{ color: "#B2B2B2" }}>Profile</Text>
            </TabHeading>
          }
        >
          <Text>4</Text>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    height: "100%"
  },
  image: {
    width: 30,
    height: 30
  },
  PrimaryContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 5,
    position: "relative",
    paddingHorizontal: 15
  },
  secondaryContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 5,
    position: "relative",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  thirdContainer: {
    flexDirection: "row",
    paddingBottom: 0,
    marginBottom: 0,
    position: "relative",
    marginTop: 10,
    paddingHorizontal: 15
  },
  inbox: {
    color: "#d2992c",
    fontSize: 24,
    paddingLeft: 5
  },
  icon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
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
  searchIcon: {
    fontSize: 20,
    fontWeight: "normal"
  },
  iconSearch: {
    textAlign: "right",
    transform: [{ rotate: "90deg" }],
    position: "absolute",
    top: 0,
    right: 20,
    fontSize: 20
  },
  iconSearch2: {
    textAlign: "right",
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 20
  },
  bottom: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 999,
    backgroundColor: "#fff"
  },
  bottomContent: {
    borderRightWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    alignItems: "center",
    paddingBottom: 7
  },
  mid: {
    flexDirection: "row",
    display: "flex"
  }
});

// const CustomStyles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     position: "relative"
//   },
//   iconStyle: {
//     color: "red",
//     fontSize: 24
//   }
// });
