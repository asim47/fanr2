import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Menu from "./Menu";
export default function InboxContent(props) {

  const {
    referenceid,
    priority,
    taskstatus,
    workflowtitle,
    submiteddate,
    tasktitle,
    language,
    taskid,
    parentTaskId,
    subTaskReference
  } = props;
  return (
    <View>
      <View
        style={{
          flexDirection: "column",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingBottom: 10
        }}
      >
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
                transform: [
                  { rotate: language === "en" ? "135deg" : "-45deg" }
                ],
                paddingTop: language === "en" ? 13 : 0,
                paddingRight: 5
              }}
            />
          </View>
          <View>
            <Text>
              {" "}
              {language === "en" ? "Ref" : "الرقم المرجعي"}:{(props.subTaskReference !== undefined ? subTaskReference !== "     null - 0" ? subTaskReference : referenceid : referenceid)}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: language === "en" ? "row" : "row-reverse",
            paddingHorizontal: 15
          }}
        >
          <Text style={{ flex: 4 }}>
            {language === "en" ? "Sub" : "الموضوع"}: {tasktitle}
          </Text>
          <Text style={{ color: "#D3D3D3", flex: 5 }}>{workflowtitle}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10
          }}
        >
          <View style={{ paddingLeft: 5 }}>
            <Text style={{ color: "#D3D3D3", flex: 5 }}>
              {language === "en" ? "Status" : "الحالة"}: {taskstatus}
            </Text>
          </View>
          <View>
            <Text
              style={{
                color:
                  priority === "High"
                    ? "#ff0000"
                    : priority === "Normal"
                      ? "#faa200"
                      : priority === "Low"
                        ? "green"
                        : "#000000",
                paddingHorizontal: 20
              }}
            >
              {language === "en" ? "Priority" : "الأهمية"}: {priority}
            </Text>
            <Text style={{ color: "#D3D3D3", paddingLeft: 20 }}>{submiteddate}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

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
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    paddingHorizontal: 15
  },
  thirdContainer: {
    flexDirection: "row",
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    marginTop: 10,
    paddingHorizontal: 15
  },

  thirdContainera: {
    flexDirection: "row-reverse",
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    marginTop: 10,
    paddingHorizontal: 15
  },
  inbox: {
    fontSize: 15,
    paddingLeft: 5
  },
  icon: {
    flex: 1,
    alignItems: "flex-end"
  },
  iconText: {
    textAlign: "right"
  },
  iconTexta: {
    textAlign: "left"
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
