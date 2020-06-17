import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Picker,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import TreeView from "react-native-final-tree-view";
import Feature from "react-native-vector-icons/Feather";
import Axios from "axios";
import {withNavigation} from "react-navigation"
import RNPickerSelect from "react-native-picker-select";
import { api } from "./Api";

class Tree extends Component {
  state = {
    language: "",
    family: [],
    AllAction: [],
    Value: null,
    en: ""
  };
  getIndicator(isExpanded, hasChildrenNodes) {
    if (!hasChildrenNodes) {
      return <Icon name="caretright" size={15} />;
    } else if (isExpanded) {
      return <Feature name="arrow-down-right" size={15} />;
    } else {
      return <Icon name="caretright" size={12} />;
    }
  }
  componentDidMount() {
    Axios.post(
      api+ "/cms/rest/tree/getTreeData",
      { sessionKey: this.props.tkey }
    )
      .then(res => {
        this.setState({
          family: [JSON.parse(res.data.session)]
        });
      })
      .catch(e => {
      });

      console.log("SEDNING THIS REQUEST")
    Axios.post(
      api+ "/cms/rest/action/getAllActions",
      { sessionKey: this.props.tkey,workflowId:this.props.wID }
    ).then(res => {
      // console.log(this.props.tkey,res.data,"GET ALL ACTIONS")
      this.setState({
        AllAction: res.data.resultList
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

  Reassign = () => {
    this.props.navigation.navigate("Inbox",{name:""})
    Axios.post(
      api+  "/cms/rest/task/takeAction",
      {
        sessionKey: this.props.tkey,
        id: this.props.TaskId,
        type: 2,
        actionId: 11,
        activityId: null,
        completionPersentage: null,
        comments: "some Comments",
        nextAssignee: this.state.Value,
        requiredAction: this.state.language
      }
    )
      .then(res => {
        // console.log("rr", res.data);
        Alert.alert(res.data.status);
      })
      .catch(e => {
        Alert.alert("Not Authorized");
        // console.log(e, "");
      });
  };
  select = a => {
    if (!a.node.children) {
      // console.log(a.node,"NODEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeee")
      this.setState({
        Value: a.node.id
      });
    }
  };

  render() {
    // var items = []
    // var i;
    // for (i = 0; i < this.state.AllAction.length; i++) {
    //     items.push({ label: this.state.AllAction[i].title, value: this.state.AllAction[i].title })
    // }
    // this.language()
    let Action = this.state.AllAction.map((res, i) => {
      console.log(res.title)
      return (
        <Picker.Item
          label={this.state.en == "en" ? res.title : res.titleAr}
          value={this.state.en == "en" ? res.configId : res.configId}
          key={i}
        />
      );
    });
    return (
      <View>
        {/* <Text>prank</Text> */}
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            height: 130,
            borderWidth: 1,
            marginTop: 10,
            borderColor: "grey"
          }}
        >
          <ScrollView>
            <TreeView
              onNodePress={this.select}
              data={this.state.family} // defined above
              renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
                return (
                  <View style={{ paddingLeft: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginLeft: 25 * level
                      }}
                    >
                      {this.getIndicator(isExpanded, hasChildrenNodes)}{" "}
                      {node.text}
                    </Text>
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#F4F4F4",
            padding: 15
          }}
        >
          {this.state.Value ? (
            <Text style={{ fontSize: 15 }}>{this.state.Value}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              paddingLeft: 10,
              fontWeight: "bold",
              fontSize: 20,
              paddingTop: 5
            }}
          >
            Required Action
          </Text>
          {this.state.Value ? (
            <Picker
              itemStyle={{ textAlignVertical: "top" }}
              selectedValue={this.state.language}
              style={{
                height: 50,
                width: "100%",
                position: "relative",
                left: 20
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            >
              {Action}
            </Picker>
          ) : (
            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: "100%", padding: 5, borderWidth: 2 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            ></Picker>
          )}
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 30
          }}
        >
          <TouchableOpacity
            onPress={this.props.close}
            style={{
              padding: 10,
              backgroundColor: "#F4F4F4",
              width: "30%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#d7962f" }}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.Reassign}
            style={{
              padding: 10,
              backgroundColor: "#F4F4F4",
              width: "30%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#d7962f" }}>Re-assign</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default  withNavigation(Tree);
