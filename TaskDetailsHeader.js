/** @format */

import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableHighlight,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { withNavigation } from "react-navigation";
import TreeView from "./TreeView";
import Axios from "axios";
import { Linking } from "expo";
import { ScrollView } from "react-native-gesture-handler";
import { api } from "./Api";
class TaskDetailsHeader extends Component {
  state = {
    language: "",
    data: {},
    Action: {
      name: ""
    },
    actions: [],
    en: "",
    index: ""
  };
  componentDidMount() {
    // Axios.post("/cms/rest/inbox/search/getWFTypes", { "sessionKey": this.props.navigation.state.params.sessionkey }).then((res) => {
    //     let Data = res.data.resultList.find((d) => {
    //         return d.wfid == this.props.wfId
    //     })
    //     this.setState({
    //         Action: Data
    //     })
    // })
    console.log({
      sessionKey: this.props.navigation.state.params.sessionkey,
      id: this.props.Trxid,
      type: this.props.taskType
    })
    Axios.post(
      api + "/cms/rest/task/getTaskActions",
      {
        sessionKey: this.props.navigation.state.params.sessionkey,
        id: this.props.Trxid,
        type: this.props.taskType
      }

      // wfId
    ).then(res => {

      this.setState({
        actions: res.data.resultList
      });
    });
    AsyncStorage.getItem("language")
      .then(res => {

        this.setState({
          en: JSON.parse(res)
        });
      })
      .catch(e => {
        Alert.alert("Error");
      });
  }
  Change = () => {
    this.setState({
      language: ""
    });
  };
  render() {

    // console.log("Hader", this.state.index);
    let ACtion = this.state.actions.map((res, i) => {
      return (
        <Picker.Item
          label={this.state.en == "en" ? res.title : res.titleAr}
          value={this.state.en == "en" ? res.title : res.titleAr}
          key={i}
        />
      );
    });
    if (this.state.language == "Complete") {
      Axios.post(
        api + "/cms/rest/task/takeAction",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id: this.props.Trxid,
          type: 5,
          actionId: 8
        }
      )
        .then(res => {
          Alert.alert("Action has been performed Successfully!");
          this.setState({
            language: "Action"
          });
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert(e.data.status);
          this.setState({
            language: "Action"
          });
        });
    } else if (this.state.language == "Finally Completed") {
      Axios.post(
        api + "/cms/rest/task/takeAction",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id: this.props.Trxid,
          type: 5,
          actionId: 16
        }
      )
        .then(res => {
          Alert.alert("Action has been performed Successfully!");
          this.setState({
            language: "Action"
          });
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert(e.data.status);
          this.setState({
            language: "Action"
          });
        });
    } else if (this.state.language == "Request Information") {
      if (this.props.Remarks !== "") {
        Axios.post(
          api + "/cms/rest/task/takeAction",
          {
            sessionKey: this.props.navigation.state.params.sessionkey,
            id: this.props.Trxid,
            type: 2,
            actionId: 6,
            activityId: null,
            completionPersentage: null,
            comments: this.props.Remarks,
            nextAssignee: null,
            requiredAction: null
          }
        )
          .then(res => {
            Alert.alert("Action has been performed Successfully!");
            this.setState({
              language: "Action"
            });
            this.props.navigation.goBack();
          })
          .catch(e => {
            Alert.alert(e.data.status);
            this.setState({
              language: "Action"
            });
          });
      } else {
        alert("Fill Remarks");
        this.setState({
          language: "Action"
        });
      }
    } else if (this.state.language == "Return") {
      Axios.post(
        api + "/cms/rest/task/takeAction",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id: this.props.Trxid,
          type: 2,
          actionId: 9
        }
      )
        .then(res => {
          Alert.alert("Action has been performed Successfully!");
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert(e.data.status);
        });
      this.props.navigation.goBack();
    } else if (this.state.language == "Claimed") {
      Axios.post(
        api + "/cms/rest/task/takeAction",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id: this.props.Trxid,
          type: 5,
          actionId: 2,
          activityId: null,
          completionPersentage: null,
          comments: "",
          nextAssignee: "null",
          requiredAction: null
        }
      )
        .then(res => {
          Alert.alert("Action has been performed Successfully!");
          this.setState({
            language: "Action"
          });
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert(e.data.status);
          this.setState({
            language: "Action"
          });
        });
    } else if (this.state.language == "Back") {
      return this.props.navigation.goBack();
    } else if (this.state.language == "Save Task") {
      Axios.post(
        api + "/cms/rest/task/takeAction",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id: this.props.Trxid,
          type: 5,
          actionId: 17,
          activityId: null,
          completionPersentage: null,
          notes: this.props.Remarks,
          nextAssignee: null,
          requiredAction: null
        }
      )
        .then(res => {
          Alert.alert("Action has been performed Successfully!");
          this.setState({
            language: "Action"
          });
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert(e.data.status);
          this.setState({
            language: "Action"
          });
        });
      // AsyncStorage.getItem().then((res) => {
      //     console.log("svbgsdhjsbdvh", res);
      // })
    } else if (this.state.language == "Create Sub Task") {
      Axios.post(
        api + "/cms/rest/task/takeAction",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id: this.props.Trxid,
          type: 5,
          actionId: 15
        }
      )
        .then(res => {
          Alert.alert("Action has been performed Successfully!");
          this.setState({
            language: "Action"
          });
          this.props.navigation.goBack();
        })
        .catch(e => {
          Alert.alert(e.data.status);
          this.setState({
            language: "Action"
          });
        });
    } else if (this.state.language == "preview") {
      Axios.post(
        api + "/cms/rest/document/viewDocument",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          taskId: this.props.Trxid
        }
      ).then(res => {
        this.setState({
          language: ""
        });
        Linking.canOpenURL(res.data.session).then(supported => {
          if (supported) {
            Linking.openURL(res.data.session);
          } else {
          }
        });
      });
    }

    if ((this.state.Action.name = "ADHOCTASK")) {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.language == "Re-assign"}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={{ marginTop: 22 }}>
              <View>
                <TouchableHighlight
                  style={{ width: "100%", padding: 5 }}
                  onPress={this.Change}
                >
                  <Entypo name="cross" size={25} />
                </TouchableHighlight>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontWeight: "bold",
                    fontSize: 20,
                    paddingTop: 5
                  }}
                >
                  Parties Tree
                </Text>
                <TreeView
                  wID={this.props.wfId}
                  close={this.Change}
                  TaskId={this.props.Trxid}
                  tkey={this.props.navigation.state.params.sessionkey}
                />
              </View>
            </View>
          </Modal>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 30,
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 5
              }}
            >
              <Icon name="chevron-left" size={20} style={{ padding: 10 }} />
            </TouchableOpacity>
            <Text style={{ width: "30%", paddingTop: 15, fontSize: 15 }}>
              Task Details
            </Text>
            <View
              style={{ width: "40%", borderWidth: 1, borderColor: "#F4F4F4" }}
            >
              {this.props.StatusId == 1 ? (
                <Picker
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  {ACtion}
                  <Picker.Item label="Claimed" value="Claimed" />
                </Picker>
              ) : this.props.wfId == 1 ? (
                <Picker
                  enabled
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      language: itemValue,
                      index: itemIndex
                    })
                  }
                >
                  <Picker.Item label="Action" value="Action" />
                  <Picker.Item label="Back" value="Back" />
                  <Picker.Item label="preview" value="preview" />
                  {ACtion}
                </Picker>
              ) : (
                    <Picker
                      enabled
                      selectedValue={this.state.language}
                      style={{ width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          language: itemValue,
                          index: itemIndex
                        })
                      }
                    >
                      <Picker.Item label="Action" value="Action" />
                      <Picker.Item label="Back" value="Back" />

                      {ACtion}

                      {/* <Picker.Item label="Re-assign" value="Re-assign" /> */}

                      {/* <Picker.Item label="Back" value="Back" />
                                        <Picker.Item label="Finally Completed" value="Finally Completed" /> */}
                    </Picker>
                  )}
            </View>
            {/* {this.props.wfId === 1?<Picker.Item label="Preview" value="Preview" />:<React.Fragment></React.Fragment>} */}
            <View style={{ width: "20%", padding: 10 }}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("./assets/images/Group550.png")}
              />
            </View>
          </View>
        </View>
      );
    } else if (this.state.Action.name == "ADHOCWF") {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 30,
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 5
              }}
            >
              <Icon name="chevron-left" size={20} style={{ padding: 10 }} />
            </TouchableOpacity>
            <Text style={{ width: "40%", paddingTop: 15, fontSize: 15 }}>
              Task Details
            </Text>
            <View
              style={{ width: "40%", borderWidth: 1, borderColor: "#F4F4F4" }}
            >
              {this.props.StatusId == 1 ? (
                <Picker
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  {ACtion}
                  <Picker.Item label="Claimed" value="Claimed" />
                </Picker>
              ) : this.props.wfId == 1 ? (
                <Picker
                  enabled
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      language: itemValue,
                      index: itemIndex
                    })
                  }
                >
                  <Picker.Item label="Action" value="Action" />
                  <Picker.Item label="Back" value="Back" />
                  <Picker.Item label="preview" value="preview" />
                  {ACtion}
                </Picker>
              ) : (
                    <Picker
                      enabled
                      selectedValue={this.state.language}
                      style={{ width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          language: itemValue,
                          index: itemIndex
                        })
                      }
                    >
                      <Picker.Item label="Action" value="Action" />
                      <Picker.Item label="Back" value="Back" />

                      {ACtion}

                      {/* <Picker.Item label="Re-assign" value="Re-assign" /> */}

                      {/* <Picker.Item label="Back" value="Back" />
                                        <Picker.Item label="Finally Completed" value="Finally Completed" /> */}
                    </Picker>
                  )}
            </View>
            <View style={{ width: "20%", padding: 10 }}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("./assets/images/Group550.png")}
              />
            </View>
          </View>
        </View>
      );
    } else if (this.state.Action.name == "ADHOCMOMWF") {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 30,
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 5
              }}
            >
              <Icon name="chevron-left" size={20} style={{ padding: 10 }} />
            </TouchableOpacity>
            <Text style={{ width: "40%", paddingTop: 15, fontSize: 15 }}>
              Task Details
            </Text>
            <View
              style={{ width: "40%", borderWidth: 1, borderColor: "#F4F4F4" }}
            >
              {this.props.StatusId == 1 ? (
                <Picker
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  {ACtion}
                  <Picker.Item label="Claimed" value="Claimed" />
                </Picker>
              ) : this.props.wfId == 1 ? (
                <Picker
                  enabled
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      language: itemValue,
                      index: itemIndex
                    })
                  }
                >
                  <Picker.Item label="Action" value="Action" />
                  <Picker.Item label="Back" value="Back" />
                  <Picker.Item label="preview" value="preview" />
                  {ACtion}
                </Picker>
              ) : (
                    <Picker
                      enabled
                      selectedValue={this.state.language}
                      style={{ width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          language: itemValue,
                          index: itemIndex
                        })
                      }
                    >
                      <Picker.Item label="Action" value="Action" />
                      <Picker.Item label="Back" value="Back" />

                      {ACtion}

                      {/* <Picker.Item label="Re-assign" value="Re-assign" /> */}

                      {/* <Picker.Item label="Back" value="Back" />
                                        <Picker.Item label="Finally Completed" value="Finally Completed" /> */}
                    </Picker>
                  )}
            </View>
            <View style={{ width: "20%", padding: 10 }}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("./assets/images/Group550.png")}
              />
            </View>
          </View>
        </View>
      );
    } else if (this.state.Action.name == "PROCESSAPPROVAL") {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 30,
              padding: 10
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingRight: 5
              }}
            >
              <Icon name="chevron-left" size={20} style={{ padding: 10 }} />
            </TouchableOpacity>
            <Text style={{ width: "40%", paddingTop: 15, fontSize: 15 }}>
              Task Details
            </Text>
            <View
              style={{ width: "40%", borderWidth: 1, borderColor: "#F4F4F4" }}
            >
              {this.props.StatusId == 1 ? (
                <Picker
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  {ACtion}
                  <Picker.Item label="Claimed" value="Claimed" />
                </Picker>
              ) : this.props.wfId == 1 ? (
                <Picker
                  enabled
                  selectedValue={this.state.language}
                  style={{ width: "100%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({
                      language: itemValue,
                      index: itemIndex
                    })
                  }
                >
                  <Picker.Item label="Action" value="Action" />
                  <Picker.Item label="Back" value="Back" />
                  <Picker.Item label="preview" value="preview" />
                  {ACtion}
                </Picker>
              ) : (
                    <Picker
                      enabled
                      selectedValue={this.state.language}
                      style={{ width: "100%" }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({
                          language: itemValue,
                          index: itemIndex
                        })
                      }
                    >
                      <Picker.Item label="Action" value="Action" />
                      <Picker.Item label="Back" value="Back" />

                      {ACtion}

                      {/* <Picker.Item label="Re-assign" value="Re-assign" /> */}

                      {/* <Picker.Item label="Back" value="Back" />
                                        <Picker.Item label="Finally Completed" value="Finally Completed" /> */}
                    </Picker>
                  )}
            </View>
            <View style={{ width: "20%", padding: 10 }}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("./assets/images/Group550.png")}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}
export default withNavigation(TaskDetailsHeader);
