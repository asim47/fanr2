import React, { useState } from "react";
// import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  AsyncStorage
} from "react-native";
import image from "./assets//images/react.png";
import Icon from "react-native-vector-icons/FontAwesome";
import SearchContent from "./SearchContent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const Search = function(props) {
  // console.log("key", props);

  // const [key, setkey] = useState("")
  // AsyncStorage.getItem("Session").then((res) => {
  //   setkey(res)
  // })

  return (
    <View style={styles.container}>
      <View
        style={
          props.language === "en"
            ? styles.secondContainer
            : styles.secondContainera
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
            {props.language === "en" ? "Documents" : "مستندات"}
          </Text>
        </View>
        <View style={styles.bell}>
          <Icon
            name="bell"
            size={20}
            color="gray"
            onPress={() => props.setCurrentTab(1)}
          />
        </View>
        <View>
          <Text
            style={props.language === "en" ? styles.badge : styles.badgea}
            onPress={() => props.setCurrentTab(1)}
          >
            5
          </Text>
        </View>
      </View>

      {/* <View style={styles.searchContainer}>
        <View>
          <Icon name="search" size={20} color="gray" />
        </View>
        <View>
          <TextInput
            placeholder={
              props.language === "en" ? "Search Documents" : "بحث الوثائق"
            }
            style={{ paddingLeft: 10 }}
          />
        </View>
      </View> */}

      <ScrollView style={{ paddingHorizontal: 5, flex: 1 }}>
        {props ? (
          props.keyy !== null ? (
            <SearchContent keys={props.keyy} />
          ) : null
        ) : null}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    height: "100%"
    // backgroundColor: "#ccc"
  },

  secondaryContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative",
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  },

  secondaryContainera: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative",
    paddingHorizontal: 15,
    backgroundColor: "#fff"
  },
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
  searchContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    position: "relative",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 4
  },
  // thirdContainer: {
  //     flexDirection: 'row',
  //     paddingBottom: 5,
  //     marginBottom: 5,
  //     position: "relative",
  //     marginTop: 20,
  //     paddingHorizontal: 15
  // },
  inbox: {
    fontSize: 18,
    paddingLeft: 5,
    color: "#ce9a2c"
  },
  icon: {
    flex: 1
  },
  bell: {
    marginLeft: "auto",
    flexDirection: "row"
  },
  inboxText: {
    fontSize: 15,
    paddingLeft: 5
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
  }
});
