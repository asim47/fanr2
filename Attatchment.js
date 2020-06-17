import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { Linking } from "expo";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import * as DocumentPicker from "expo-document-picker";
import Modal, { ModalContent } from "react-native-modals";
import Base64 from "base-64";
import Axios from "axios";
import { withNavigation } from "react-navigation";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { api } from "./Api";
import CustomDialog from "./CustomDialog";
import { CameraRoll } from 'react-native';
// import RNFS from "react-native-fs";

class Attatchment extends Component {
  state = {
    display: {
      id: -1,
      visible: false
    },
    Load: false,
    Incrypt: "",
    visible2: false,
    ModalOpenA: false
  };
  showMenu(id) {
    if (this.state.display.id == id) {
      this.setState({
        display: {
          id: id,
          visible: !this.state.display.visible
        }
      });
    } else {
      this.setState({
        display: {
          id: id,
          visible: true
        }
      });
    }
  }
  componentDidMount() {
    this.setState({
      Load: true
    });
    // Axios.post(api+"/cms/rest/task/viewTaskAttachmentById", { "sessionKey": "mYsJsxIK5ZyOBx419EDMn5f3XSVR48bHpd1EshkQ7l0avEKjQJgOm5KGdSrcUIgbewzLs9UpVCA", "attachmentId": 189 }).then((res) => {
    //     console.log("Attatchment", res.data);
    //     var reader = new FileReader();
    //      reader.onload=()=>{
    //         var dataURL = reader.result;

    //      }

    // }).catch((e) => {
    //     console.log("error", e);

    // })
  }

  Word = id => {
    Axios.post(api + "/cms/rest/task/viewTaskAttachmentById", { "sessionKey": this.props.sk, "attachmentId": id }).then(async (res) => {


  Linking.canOpenURL(
        res.data.session  
      ).then(supported => {
        if (supported) {
          Linking.openURL(
            res.data.session  
          );
        } else {
        }
      });


      // console.log(res.data.session,id);
      
      // const fileUri = FileSystem.documentDirectory + new Date().toISOString();
      // const url = res.data.session;

      // let downloadObject = FileSystem.createDownloadResumable(
      //   url,
      //   fileUri
      // );
      // console.log("res.data.session");
      // let response = await downloadObject.downloadAsync();
      // let two = await FileSystem.getInfoAsync(response.uri)
      // console.log(response);
      // console.log(two);

      // try {
      //   CameraRoll.saveToCameraRoll( response.uri, 'photo').then(()=>{
      //     console.log("done")
      //   }).catch((err)=>{
      //     console.log(err)
      //   })
      // } catch (error) {
      //   console.log(error)
      // }
      // Linking.canOpenURL(
      //   response.uri
      // ).then(supported => {
      //   if (supported) {
      //     Linking.openURL(
      //       response.uri
      //     );
      //   } else {
      //   }
      // });
    })
    // Sharing.shareAsync(uri, { mimeType: "application/pdf", dialogTitle: "open file with" }).then((res) => {
    //     console.log("share", res);

    // }).catch((e) => {
    //     console.log("error", e);

    // })
  };
  delete = id => {
    console.log("Working,", id)
    Axios.post(
      api + "/cms/rest/task/removeTaskAttachmentById",
      { sessionKey: this.props.sk, attachmentId: id }
    ).then(res => {
      alert(res.data.status);
      this.props.navigation.goBack();
    });
  };
  AddDocs = () => {
    DocumentPicker.getDocumentAsync().then(response => {
      FileSystem.readAsStringAsync(response.uri, {
        encoding: FileSystem.EncodingType.Base64
      }).then(res => {

        Axios.post(
          api + "/cms/rest/task/addTaskAttachment",
          {
            sessionKey: this.props.sk,
            taskId: this.props.Trxid,
            content: res,
            description: response.size,
            fileName: response.name,
            contentType: "pdf"
          }
        )
          .then(res => {
            alert(res.data.status);
            this.props.navigation.goBack();
          })
          .catch(e => {
            alert(e.data.status);
          });
      });
    });

    // const bytes = utf8.encode(file);
    // const encoded = base64.encode(bytes);
  };
  render() {
    // console.log("att", this.state.visible2);

    let res = this.props.Data.map((res, i) => {
      let newFile = require("./assets/document-icon-8.png")

      let re = /(?:\.([^.]+))?$/;

      let ext = re.exec(res.filename)[1];

      if (ext == "doc") newFile = require("./assets/word.png")
      if (ext == "docx") newFile = require("./assets/word.png")
      if (ext == "jpg") newFile = require("./assets/unnamed.png")
      if (ext == "pdf") newFile = require("./assets/337946.png")
      if (ext == "ppt") newFile = require("./assets/ppt.png")
      if (ext == "xlsx") newFile = require("./assets/xlsx.png")
      if (ext == "xls") newFile = require("./assets/xlsx.png")
      if (ext == "png") newFile = require("./assets/png.png")

      return (
        <React.Fragment key={i}>
          <CustomDialog
            open={this.state.ModalOpenA}
            yes={() => {
              this.delete(res.attachmentid)
              this.setState({
                ...this.setState,
                ModalOpenA: false
              })
            }}
            no={() => this.setState({
              ...this.setState,
              ModalOpenA: false
            })}
          />
          <View
            style={{
              width: "45%",
              backgroundColor: "white",
              position: "relative",
              marginLeft: 10,
              marginTop: 5
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10
              }}
            >
              <Text></Text>
              <TouchableOpacity
                onPress={() => {
                  this.showMenu(i);
                }}
              >
                <Entypo name="dots-three-vertical" size={15} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ height: 36, width: 36 }}
                resizeMethod="resize"
                resizeMode="contain"
                source={newFile}
              />
              <Text style={{ padding: 15, color: "grey", width: "70%" }}>
                {res.filename}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                left: 60,
                top: 25,
                width: 100,
                backgroundColor: "white",
                zIndex: 500,
                borderRadius: 5
              }}
            >
              <View
                style={{
                  padding: 10,
                  display:
                    this.state.display.id == i
                      ? this.state.display.visible
                        ? "flex"
                        : "none"
                      : "none"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.Word(res.attachmentid)}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    paddingVertical: 4,
                    borderBottomColor: "lightgrey"
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>View</Text>
                </TouchableOpacity>
                {/* {/* <TouchableOpacity style={{ paddingVertical: 4, justifyContent: "center", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "lightgrey" }}>
                                    <Text style={{ fontWeight: "bold" }} >Remove</Text>
                                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {

                    // this.delete(res.attachmentid)
                    this.setState({
                      ...this.setState,
                      ModalOpenA: true
                    })
                  }}
                  style={{
                    paddingVertical: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "lightgrey"
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </React.Fragment>
      );
    });
    return this.state.Load == false ? (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    ) : (
        <View>
          {/* <FlatList data={this.state.files} renderItem={(item) => <Button title={item.name} onPress={this.openFile(item)} />} /> */}
          <View
            style={{ height: hp("100%"), width: "100%", backgroundColor: "#F4F4F4" }}
          >
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
              <Text style={{ color: "white" }}>Add Attatchment +</Text>
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                flexWrap: "wrap"
              }}
            >
              {res}
            </View>
          </View>
          {/* <Modal
          visible={this.state.visible2}
          onTouchOutside={() => {
            this.setState({ visible2: false });
          }}
        >
          <ModalContent>
            <TouchableOpacity
              onPress={() => {
                this.setState({ visible2: false });
              }}
              style={{ flexDirection: "row", justifyContent: "flex-end" }}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <TextInput style={{ width: "40%" }} />
              <TextInput style={{ width: "40%" }} />
            </View>
          </ModalContent>
        </Modal> */}

        </View>
      );
  }
}
export default withNavigation(Attatchment);
