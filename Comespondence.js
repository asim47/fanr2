import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import FontIcon from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Linking } from "expo";

import Axios from "axios";
import { api } from "./Api";
export default class Comespondence extends Component {
  state = {
    Html: "",
    Extenstion: "",
    response: false
  };
  //   componentDidMount() {
  //     // Axios.post(
  //     //   "/cms/rest/correspondence/template/getCorrTemplate",
  //     //   { sessionKey: this.props.ckey, trxId: this.props.id }
  //     // ).then(res => {
  // this.setState({
  //   Html: res.data.result.html
  // });
  //     // });
  //   }
  AddDocs = () => {
    DocumentPicker.getDocumentAsync().then(response => {
      var resp = response.uri.split(".");
      res = resp[resp.length - 1];
      this.setState({
        Extenstion: res
      });
      FileSystem.readAsStringAsync(response.uri, {
        encoding: FileSystem.EncodingType.Base64
      }).then(res => {
        this.setState({
          response: true
        });

        Axios.post(
          api + "/cms/rest/correspondence/template/updateCorrespondence",
          {
            sessionKey: this.props.ckey,
            trxId: this.props.id,
            content: res,
            fileName: response.name,
            contentType: this.state.Extenstion
          }
        )
          .then(res => {
            alert(res.data.status);
          })
          .catch(e => {
            alert(e.data.status);
          });

        // <React.Fragment>
        //   <View style={{ backgroundColor: "red",height:"100%",width:"100%" }}>
        //     <TouchableOpacity>
        //       <Text>Loading...</Text>
        //     </TouchableOpacity>
        //   </View>
        // </React.Fragment>
      });
    });

    // const bytes = utf8.encode(file);
    // const encoded = base64.encode(bytes);
  };
  View = () => {
    Axios.post(api + "/cms/rest/correspondence/template/viewCorrLetter", { "sessionKey": this.props.ckey, "trxId": this.props.id }).then((res) => {

      // console.log(this.props.ckey,this.props.id)
      // console.log(res.data,"DATA")
      // this.setState({
      //   Html: res?.data?.result?.html || "" 
      // });
      Linking.canOpenURL(
        res.data.session
      ).then(supported => {
        if (supported) {
          Linking.openURL(
            res.data.session
          );
        } else {
        }
      })
    }).catch(() => {

    })
  }


  render() {

    return (
      <View>
        <View
          style={{ height: "100%", width: "100%", backgroundColor: "#F4F4F4" }}
        >

          {/* <View style={{ width: "100%", backgroundColor: "white", }}>
                        <View style={{ justifyContent: "space-between", flexDirection: "row", padding: 15 }}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ padding: 10 }}>
                                <TouchableOpacity style={{ width: 50 }} >
                                    <FontIcon name="bold" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="italic" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="underline" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="strikethrough" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="superscript" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="subscript" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="align-left" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="align-right" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="align-center" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="list" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="list-ol" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="italic" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="italic" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="italic" size={35} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: 50 }}>
                                    <FontIcon name="italic" size={35} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View> */}
          <View
            style={{
              width: "100%",
              backgroundColor: "white"
              //   marginTop: 30
            }}
          >
            {
              this.props.editable ? (
                <TouchableOpacity
                  style={{
                    padding: 8,
                    backgroundColor: "#d19537",
                    color: "white",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                  onPress={this.AddDocs}
                >
                  <Text style={{ color: "white" }}>Update Correspondence Letter</Text>
                </TouchableOpacity>
              ) : null
            }
            <TouchableOpacity onPress={this.View} style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#F4F4F4", marginTop: 10 }}>
              <Text style={{ color: "#d19537" }}>View</Text>
            </TouchableOpacity>
            {/* <WebView style={{ height: 300, width: 400 }} source={{ html: this.state.Html }} /> */}
          </View>
        </View>
      </View>
    );
  }
}
