import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Menu from "./Menu";
import moment from "moment"
export default class Content extends Component {
  render() {
    const { value } = this.props
    return (
      <View>
        <View style={styles.mainContainer}>
          <View style={styles.thirdContainer}>
            <View>
              <Text style={styles.heading}> {value.msgeTitle} </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: "auto"
              }}
            >
              <View style={{ alignSelf: "center", marginRight: 5 }}>
                <Text style={{ color: "gray" }}>            {value.msgeDate.slice(0,9)}</Text>
              </View>
              <View>
                <Menu />
              </View>
            </View>
            {/* <View style={styles.bell}>
              <Text style={styles.date}>07/10/14</Text>
              <Icon name="ellipsis-v" size={20} color="gray" />
            </View> */}
          </View>
          <View>
            <Text style={styles.secondaryText}>
              {value.msgeBody}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  secondContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginBottom: 10
  },
  thirdContainer: {
    flexDirection: "row"
  },
  mainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginBottom: 10
  },
  bell: {
    marginLeft: "auto",
    flexDirection: "row"
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
  heading: {
    fontWeight: "bold",
    marginBottom: 10
  },
  date: {
    color: "#ccc",
    paddingRight: 15
  },
  secondaryText: {
    color: "#ccc"
  }
});
