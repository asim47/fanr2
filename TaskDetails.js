import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Axios from "axios";
import { DatePicker } from "native-base";
import { api } from "./Api";
export default class TaskDetails extends Component {
  state = {
    // result: "",
    Remarks: "",
    TaskDetails: [],
    Loading: false
  };
  dash = text => {
    this.setState({
      Remarks: text
    });
  };

  save = () => {
    AsyncStorage.clear();
    AsyncStorage.setItem("Re", this.state.Remarks).then(res => {
    });
  };
  componentDidMount() {
    Axios.post(
     api+ "/cms/rest/task/getTaskDetailAttributes",
      {
        sessionKey: this.props.tkey,
        id: this.props.Trxid,
        workflowId: this.props.wfid
      }
    )
      .then(res => {
        this.setState({
          Loading: true,
          TaskDetails: res.data.resultList
        });
      })
      .catch(e => {
      });
  }

  render() {

    // AsyncStorage.getItem("Remarks").then((rs) => {
    //     console.log("rs", rs)
    // })
    // this.remark();
    // this.setitme()
    // console.log("Tsk", this.state.result);
    let Res = this.state.TaskDetails.map((res, i) => {
      
      return (
        <View
          key={i}
          style={{
            flexDirection: "row",
            width: "100%",
            borderBottomColor: "#F4F4F4",
            borderBottomWidth: 1,
            paddingLeft: 20,
            paddingRight: 10,
            padding: 10
          }}
        >
          <Text style={{ width: "30%", fontWeight: "bold" }}>
            {res.atributelabel}
          </Text>
          {res.atributelabel == "Deadline" &&
          this.props.initid == this.props.Details.initiatedByUserId ? (
            
            <DatePicker
              
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText={
                res.atributeValue
              }
              placeHolderTextStyle={{
                color: "grey",
                // marginBottom: 10,
                marginLeft: 25,
                padding: 0,
                marginRight: 0,
                fontSize: 14
              }}
              textStyle={{
                marginLeft: 25,
                color: "grey",
                padding: 0
              }}
              onDateChange={date => setInitiationDateFrom(date)}
              disabled={false}
            />
          ) : (
            // <Text style={{ color: "grey", width: 10 }}>dskvm</Text>
            <Text style={{ color: "grey", width: "50%", paddingLeft: 30 }}>
              {res.atributeValue}
            </Text>
          )}
        </View>
      );
    });
    return this.state.Loading == true ? (
      <View>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View
            style={{ height: 700, width: "100%", backgroundColor: "#F4F4F4" }}
          >
            {/* {Res} */}

            <View
              style={{ width: "100%", height: "65%", backgroundColor: "white" }}
            >
              <View
                style={{
                  height: "15%",
                  width: "100%",
                  backgroundColor: "#fffffff"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 14
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly"
                    }}
                  >
                    <Entypo name="triangle-right" size={20} color="#d19537" />
                    {this.props.parentRef &&
                    this.props.parentRef !== "     null - 0" ? (
                      <React.Fragment>
                        <Text style={{ fontWeight: "bold" }}>
                          Parent Ref {this.props.Details.parentTaskReference}
                        </Text>
                        <Text style={{ paddingLeft: 20, fontWeight: "bold" }}>
                          Ref:{this.props.parentRef}
                        </Text>
                      </React.Fragment>
                    ) : (
                      <Text>Ref:{this.props.Ref}</Text>
                    )}
                  </View>
                  <Entypo name="clock" size={20} color="#d19537" />
                </View>
                {/* <View style={{ paddingLeft: 20, paddingRight: 20, flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold", }}>Title:sdvd</Text>
                                </View>
                            </View> */}
              </View>
              {/* <View style={{ padding: 15 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Details</Text>
                            <Text style={{ width: "80%", color: "grey" }}>dvsdv</Text>
                        </View> */}
              <View
                style={{
                  height: "70%",
                  width: "100%",
                  backgroundColor: "white"
                }}
              >
                <ScrollView nestedScrollEnabled={true}>{Res}</ScrollView>
              </View>
            </View>
            <View
              style={{
                height: "15%",
                width: "100%",
                backgroundColor: "white",
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <View style={{ padding: 15 }}>
                <Text style={{ fontWeight: "bold" }}>Remarks</Text>
                <TextInput
                  placeholder={this.props.Details.remarks}
                  // onBlur={() => this.save()}
                  onChangeText={this.props.RemarksCHange}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    ) : (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Loading...</Text>
      </View>
    );
  }
}
