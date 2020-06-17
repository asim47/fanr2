/** @format */

import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TaskDetails from "./TaskDetails";
import Attachement from "./Attatchment";
import TaskButton from "./TaskButton";
import Summery from "./Summery";
import History from "./History";
import SubTask from "./Subtask";
import Correspondence from "./Comespondence";
import Header from "./TaskDetailsHeader"; 
import Committee from "./Committee";
import axios from "axios";
import PMM from "./PMM";
import { api } from "./Api";
export default class Innermails extends Component {
  state = {
    remarks: "",
    Switch: "Task Details",
    TaskDetail: [],
    Attachment: "",
    showtask: "",
    History: "",
    Subtask: "",
    Taskid: "",
    actionId: "",
    Trxid: "",
    StatusId: "",
    Ref: "",
    InitID: "",
    Detail: "",
    load: false,
    editable:true,
  };

  Changename = name => {
    this.setState({
      Switch: name
    });
  };
  componentDidCatch(error, info) {
  }
  componentDidMount() {
    axios
      .post(
        api+"/cms/rest/task/getTaskDetailById",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id:
            this.props.navigation.state.params.ev.subTaskReference ==
              "     null - 0" ||
            this.props.navigation.state.params.ev.subTaskReference == undefined
              ? this.props.navigation.state.params.ev.taskid
              : this.props.navigation.state.params.ev.taskid,
          type: 5
        }
      )
      .then(resp => {
        // let Post = [resp.data.result].filter((d) => d.trxid == this.props.navigation.state.params.ev.taskid)[0]
        // console.log("resp", Post);
        // console.log("asvfgd", resp.data);
        this.setState({
          // showtask: resp.data.result.hasSubTask,
          StatusId: resp.data.result.statusid,
          Trxid: resp.data.result.trxid,
          Taskid: resp.data.result.wfid,
          actionId: resp.data.result.actionid,
          TaskDetail: [resp.data.result],
          Detail: resp.data.result,
          Ref: resp.data.result.reference,
          InitID: resp.data.result.initiatedByUserId,
          load: true,
          editable:resp.data.result.editable
        });
      });

    axios
      .post(
       api+ "/cms/rest/task/getTaskAttachments",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          taskId: this.props.navigation.state.params.ev.taskid
        }
      )
      .then(res => {
        this.setState({
          Attachment: res.data.resultList
        });
      });

    axios
      .post(
       api+ "/cms/rest/task/getTaskHistory",
        {
          sessionKey: this.props.navigation.state.params.sessionkey,
          id: this.props.navigation.state.params.ev.taskid
        }
      )
      .then(res => {
        this.setState({
          History: res.data.resultList
        });
      });
    axios
      .post(api+"/cms/rest/task/getSubTasks", {
        sessionKey: this.props.navigation.state.params.sessionkey,
        id: this.props.navigation.state.params.ev.taskid
      })
      .then(res => {
        this.setState({
          Subtask: res.data.resultList
        });
      });
  }

  RemarksChangeHandler = text => {
    this.setState({
      remarks: text
    });
  };
  render() {

    // console.log("state", this.props.navigation.state.params.ev);
    if (this.state.Switch === "Task Details") {
      return this.state.load == true ? (
        <View style={{ height: "100%", width: "100%" }}>
          {this.state.Taskid &&
          this.state.Trxid &&
          this.state.StatusId &&
          this.props.navigation.state.params.ev.taskType ? (
            <Header
              Trxid={this.state.Trxid}
              wfId={this.state.Taskid}
              StatusId={this.state.StatusId}
              Remarks={this.state.remarks}
              taskType={this.props.navigation.state.params.ev.taskType}
            />
          ) : null}
          {this.state.Taskid &&
          this.props.navigation.state.params.sessionkey &&
          this.state.Detail ? (
            <TaskButton
              skey={this.props.navigation.state.params.sessionkey}
              name="Task Details"
              Changename={this.Changename}
              Button={this.state.Taskid}
              show={this.state.Detail}
            />
          ) : null}
          <ScrollView>
            {this.state.Detail &&
            this.state.Taskid &&
            this.state.Trxid &&
            this.state.Ref &&
            this.props.navigation.state.params.ev.subTaskReference &&
            this.props.navigation.state.params.sessionkey &&
            this.state.InitID ? (
              <TaskDetails
                Details={this.state.Detail}
                initid={this.state.InitID}
                tkey={this.props.navigation.state.params.sessionkey}
                Ref={this.state.Ref}
                parentRef={
                  this.props.navigation.state.params.ev.subTaskReference
                }
                Trxid={this.state.Trxid}
                wfid={this.state.Taskid}
                RemarksCHange={this.RemarksChangeHandler}
              />
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 100
            }}
          >
            <Text style={{ fontSize: 25 }}>Loading...</Text>
          </View>
        </View>
      );
    } else if (this.state.Switch === "Attachement") {
      return this.state.load == true ? (
        <View style={{ height: "100%", width: "100%" }}>
          <Header />

          <TaskButton name="Attachement" Changename={this.Changename} />
          <ScrollView>
            {this.state.Trxid &&
            this.state.Attachment &&
            this.props.navigation.state.params.sessionkey ? (
              <Attachement
                Trxid={this.state.Trxid}
                Data={this.state.Attachment}
                sk={this.props.navigation.state.params.sessionkey}
              />
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.Switch === "Summery") {
      return this.state.load == true ? (
        <View style={{ height: "100%", width: "100%" }}>
          <Header />
          <TaskButton name="Summery" Changename={this.Changename} />
          <ScrollView>
            {this.state.TaskDetail &&
            this.props.navigation.state.params.ev.subTaskReference ? (
              <Summery
                summerydata={this.state.TaskDetail}
                SubTask={this.props.navigation.state.params.ev.subTaskReference}
              />
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.Switch === "History") {
      return this.state.load == true ? (
        <View style={{ height: "100%", width: "100%" }}>
          <Header />

          <TaskButton name="History" Changename={this.Changename} />
          <ScrollView>
            {this.state.History ? (
              <History HistoryData={this.state.History} />
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.Switch === "Sub Task") {
      return this.state.load == true ? (
        <View style={{ height: "100%", width: "100%" }}>
          <Header />

          <TaskButton name="Sub Task" Changename={this.Changename} />
          <ScrollView>
            {this.state.Subtask ? (
              <SubTask Subtaskdata={this.state.Subtask} />
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.Switch === "Correspondence Templete") {
      return this.state.load == true ? (
        <View style={{ height: "100%", width: "100%" }}>
          <Header />

          <TaskButton
            name="Correspondence Templete"
            Changename={this.Changename}
          />

          {this.state.Trxid && this.props.navigation.state.params.sessionkey ? (
            <Correspondence
              ckey={this.props.navigation.state.params.sessionkey}
              id={this.state.Trxid}
              editable={this.state.editable}
            />
          ) : null}
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.Switch === "Committee") {
      return this.state.load == true ? (
        <View style={{ height: "100%", width: "100%" }}>
          <Header />

          <TaskButton name="Committee" Changename={this.Changename} />
          <ScrollView>
            {this.state.Trxid &&
            this.props.navigation.state.params.sessionkey ? (
              <Committee
                comkey={this.props.navigation.state.params.sessionkey}
                ID={this.state.Trxid}
              />
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.Switch === "PMM") {
      return this.state.load == true ? (
        <View>
          <Header />

          <TaskButton name="PMM" Changename={this.Changename} />
          <ScrollView
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#F4F4F4"
            }}
          >
            {this.state.Trxid &&
            this.props.navigation.state.params.sessionkey ? (
              <PMM
                pkey={this.props.navigation.state.params.sessionkey}
                ID={this.state.Trxid}
              />
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    // else {
    //     return (
    //         <View>
    //             <Text>No record found</Text>
    //         </View>
    //     )
    // }
  }
}
