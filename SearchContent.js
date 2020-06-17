import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Linking
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Menu from "./DocsMenu";
import image from "./assets/document-icon-8.png";

import Axios from "axios";
import { api } from "./Api";

const SearchContent = function (props) {
  const [document, serdocumrnt] = useState([]);
  const [Search, setSearch] = useState("");
  const [temp, setemp] = useState([])
  // console.log("props", props);
  useEffect(() => {
    if (Search !== "") {
      let array = document;
      serdocumrnt(array.filter(arr => arr.title.includes(Search)));
    } else {
      serdocumrnt(temp);
    }
  }, [Search]);

  useEffect(() => {
    if (props.keys !== "") {
      Axios.post(
        api + "/cms/rest/document/getAllDocuments",
        {
          sessionKey: props.keys
            ? props.keys
            : "KpIv1ARTymVmj6B4zpOuZGwpIXRt4tIRmAJriNkKbzkVtvTeCG2qZrxTKNoVPegYmaqa8Hcdojy"
        }
      ).then(res => {
        serdocumrnt(res.data.resultList);
        setemp(res.data.resultList)
      });
    }
  }, [props.keys]);
  // console.log("Documrnt", document);

  return (
    <React.Fragment>
      <View style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        position: "relative",
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 4
      }}>
        <View>
          <Icon name="search" size={20} color="gray" />
        </View>
        <View>
          <TextInput
            placeholder="Search Documents"
            style={{ paddingLeft: 10 }}
            onChangeText={val => setSearch(val)}
          />
        </View>
      </View>
      <View style={{ paddingBottom: 10, borderBottomWidth: 1 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            // paddingLeft: 10,
            // paddingRight: 10,
            flexWrap: "wrap",
            paddingTop: 5,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          {document &&
            document.map((res, i) => {
              return (
                <View
                  style={{
                    width: "100%",
                    // backgroundColor: "#F7F7F7",
                    margin: 5,
                    flexDirection: "column",
                    height: 120,
                    // borderWidth: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                  key={i}
                >
                  <View style={{ height: "50%", width: "100%", justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
                    <Text>
                      Ref No: {res.reference}
                    </Text>
                    <Text>
                      User ID: {res.initiatedby}
                    </Text>
                  </View>
                  <View style={{ height: "50%", width: "100%", justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
                    <Text>
                      File Name: {res.title}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      Axios.post(api + "/cms/rest/document/viewDocument", { "sessionKey": props.keys, "taskId": res.trxid }).then((res) => {
                        // console.log("dsgvdsvbdsx", res.data);
                        Linking.canOpenURL(res.data.result).then(supported => {
                          console.log(res.data)

                          if (supported) {
                            Linking.openURL(`${res.data.result}`)
                          }
                          else {
                            alert('File not supported…');
                          }
                        })

                      })
                    }}>
                      <View style={{ padding: 5 }}>
                        <Text>
                          View
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
      </View>
    </React.Fragment>
  );
};
export default SearchContent;


{/* <View
style={{
  flexDirection: "row",
  justifyContent: "space-between",
  margin: 5
}}
>
<View style={{ flexDirection: "row" }}>
  <Image
    resizeMethod="resize"
    resizeMode="contain"
    source={require("./assets/document-icon-8.png")}
  />
  <Text
    style={{ paddingLeft: 15, color: "grey", width: "70%" }}
  >
    {res.title}
  </Text>
</View>

{res.trxid && props.keys ? (
  <Menu isd={res.trxid} SKey={props.keys} />
) : null}
</View> */}