import React from "react";
import { useState, useEffect } from "react";
import { Tab, TabView } from "react-native-easy-tabs";
import {
  View,
  Text,
  StyleSheet,
  Divider,
  ScrollView,
  Image,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Menu2 from "./Menu2";
import MenuAttachments from "./MenuAttachments";
import { Container, Header, Content, Accordion } from "native-base";
import { useStateValue } from "./state";
import image from "./assets/document-icon-8.png";
import image4 from "./assets/images/clock.png";
import image5 from "./assets/images/warn.png";
import InboxItemModal from "./ModalOptions---";
import TestModal from "./TestModal";

const dataArray = [
  { title: "Correspondence Template", content: "Lorem ipsum dolor sit amet" }
];

const InnerMail = function(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [language, setLanguage] = useState("en");
  const [
    { calResponse,
       userDataPayload,
        taskDetailPayload, languagePayload },
    dispatch
  ] = useStateValue();
  // const userDataPayload ={
  //   session:"miasiab avsaysva sauysv aus jvas"
  // }
  useEffect(() => {
    async function _bootstrapAsync() {
      const language = await AsyncStorage.getItem("language");

      setLanguage(JSON.parse(language));
    }

    _bootstrapAsync();
  }, [languagePayload]);

  const {
    priority,
    taskstatus,
    tasktitle,
    workflowtitle,
    taskid
  } = taskDetailPayload;

  return (
    <View style={{ paddingTop: 33, backgroundColor: "#ccc", height: "100%" }}>
      <View
        style={
          language === "en"
            ? styles.secondaryContainer
            : styles.secondaryContainera
        }
      >
        <View
          style={{ flexDirection: language === "en" ? "row" : "row-reverse" }}
        >
          <TouchableOpacity
            selectedTabIndex={currentTab}
            style={{ padding: 10 }}
            onPress={() => props.navigation.navigate("Inbox")}
          >
            <Icon
              name="chevron-left"
              size={20}
              color="gray"
              style={styles.iconText}
            />
          </TouchableOpacity>

          <Text style={styles.inbox}>
            {language === "en" ? "Sub" : "الموضوع"}: Address Issues
          </Text>
          <Text style={{ color: "#ccc", marginLeft: 15 }}>{workflowtitle}</Text>
        </View>
        {/* <View style={styles.icon}>
          <Icon
            name="bell"
            size={20}
            color="gray"
            onPress={() => props.navigation.navigate("Inbox", { tab: 1 })}
          />
        </View>
        <View>
          <Text
            style={language === "en" ? styles.number : styles.numbera}
            onPress={() => props.navigation.navigate("Inbox", { tab: 1 })}
          >
            5
          </Text>
        </View> */}
      </View>
      <View
        style={
          language === "en" ? styles.thirdContainer : styles.thirdContainera
        }
      >
        <View>
          <Icon
            name="tag"
            size={30}
            color="red"
            style={{
              fontSize: 15,
              transform: [{ rotate: "135deg" }],
              paddingTop: 13,
              paddingRight: 5
            }}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>
            {language === "en" ? "Title" : "عنوان"}:{tasktitle}
          </Text>
        </View>
        <View style={styles.icon}>
          <View>
            {priority === "Low" ? null : priority === "Normal" ? (
              <Image
                source={image4}
                style={{
                  width: 22,
                  height: 20
                }}
              />
            ) : priority === "High" ? (
              <Image
                source={image5}
                style={{
                  width: 22,
                  height: 22
                }}
              />
            ) : null}
          </View>
          {/* <Icon
            name="history"
            size={30}
            color="gray"
            style={styles.iconSearch}
          /> */}
          {/* <Icon name="ellipsis-v" size={30} color="gray" style={styles.iconSearch2} /> */}
          <View>
            <Menu2 taskid={taskid} language={language} />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          paddingHorizontal: 15,
          marginBottom: 10,
          backgroundColor: "#fff"
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            color:
              priority === "High"
                ? "#ff0000"
                : priority === "Normal"
                ? "#faa200"
                : priority === "Low"
                ? "green"
                : "#000000"
          }}
        >
          {language === "en" ? "Priority" : "أفضلية"}: {priority}
        </Text>
        <Text style={{ color: "#ccc", marginBottom: 10 }}>
          {language === "en" ? "Status" : "الحالة"}: {taskstatus}
        </Text>
        <Text style={{ color: "#ccc", marginBottom: 10 }}>
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginBottom: 10
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {language === "en" ? "Attachments" : "مرفقات"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <Text>Task Detail.doc</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={image}
                  style={styles.image}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ color: "#ccc" }}>Docs</Text>
              </View>
            </View>
            <View style={{ position: "relative", top: -10 }}>
              <MenuAttachments />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              margin: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <Text>Task Detail.doc</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={image}
                  style={styles.image}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ color: "#ccc" }}>Docs</Text>
              </View>
            </View>
            <View style={{ position: "relative", top: -10 }}>
              <MenuAttachments />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          paddingVertical: 10,
          marginBottom: 10,
          paddingHorizontal: 15
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
          {" "}
          {language === "en" ? "Remarks" : "ملاحظات"}
        </Text>
        <Text style={{ color: "#ccc" }}>
          when an unknown printer took a galley of type and scrambled it
        </Text>
      </View>

      <Container style={{ padding: 0 }}>
        <Content padder>
          <Accordion dataArray={dataArray} expanded={0} />
        </Content>
      </Container>
    </View>
  );
};

export default InnerMail;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    height: "100%"
  },
  image: {
    width: 30,
    height: 30
  },
  secondaryContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    paddingTop: 10,
    position: "relative",
    paddingRight: 15,
    paddingLeft: 10,
    backgroundColor: "#fff"
  },
  secondaryContainera: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    paddingTop: 10,
    position: "relative",
    paddingRight: 15,
    paddingLeft: 10,
    backgroundColor: "#fff"
  },
  thirdContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 5,
    position: "relative",
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  },
  thirdContainera: {
    flexDirection: "row-reverse",
    paddingTop: 10,
    paddingBottom: 5,
    position: "relative",
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  },
  inbox: {
    fontSize: 15,
    paddingLeft: 5,
    fontWeight: "bold",
    marginLeft: 5
  },
  icon: {
    marginLeft: "auto",
    flexDirection: "row"
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
  numbera: {
    borderRadius: 100,
    color: "#fff",
    backgroundColor: "red",
    paddingHorizontal: 5,
    position: "absolute",
    left: 0,
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
