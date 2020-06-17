import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import Axios from 'axios'
import { api } from './Api'







const staticArray = [
    {
        "wfid": 1,
        "name": "ADHOCWF",
        "title": "Adhoc Correspondence",
        "titlear": "Adhoc Correspondence",
        "description": "Adhoc Correspondence",
        "type": 2,
        "status": 0,
        "deleted": 0,
        "roleKeyId": "ROLE_WF_ADHOCWF",
        "enable": 0,
        "rejectType": 0,
        "seq": 1
    },
    {
        "wfid": 64,
        "name": "ADHOCTASK",
        "title": "Adhoc Task",
        "titlear": "Adhoc Task",
        "description": "Adhoc Task",
        "type": 2,
        "status": 0,
        "deleted": 0,
        "roleKeyId": "ROLE_WF_ADHOCWF",
        "enable": 0,
        "rejectType": 0,
        "seq": 2
    },
    {
        "wfid": 71,
        "name": "PROCUREMENTMOM",
        "title": "Procurement MoM ",
        "titlear": "Procurement MoM ",
        "description": null,
        "type": 2,
        "status": 0,
        "deleted": 0,
        "roleKeyId": "ROLE_WF_PROCUREMENTMOM",
        "enable": 0,
        "rejectType": 1,
        "seq": 22
    },
    {
        "wfid": 70,
        "name": "PROCESSAPPROVAL",
        "title": " IMS Document",
        "titlear": " IMS Document",
        "description": null,
        "type": 2,
        "status": 0,
        "deleted": 0,
        "roleKeyId": "ROLE_WF_PROCESSAPPROVAL",
        "enable": 0,
        "rejectType": 1,
        "seq": 21
    },
    {
        "wfid": 72,
        "name": "OBSERVATIONTASK",
        "title": "Observation Task",
        "titlear": "Observation Task",
        "description": "To Create New Observation Task",
        "type": 2,
        "status": 0,
        "deleted": 0,
        "roleKeyId": "ROLE_WF_OBSERVATIONTASK",
        "enable": 0,
        "rejectType": 0,
        "seq": 23
    }
]







export default class TaskButton extends Component {
    state = {
        TaskButton: {
            name: ""
        },
        show: "",
        error: ""
    }

    componentDidMount() {
        Axios.post(api + "/cms/rest/inbox/search/getWFTypes", { "sessionKey": this.props.skey }).then((res) => {
            console.log(this.props.skey, "KEY")
            console.log(res.data.resultList, "LIST")
            console.log(this.props.Button, "BUTTON")
            if (res.data.resultList.length == 0) {

                let Data = staticArray.find((d) => {
                    return d.wfid == this.props.Button
                })
                if (Data) {
                    this.setState({
                        TaskButton: Data
                    })

                }
                return
            } else {
                try {
                    let Data = res.data.resultList.find((d) => {
                        return d.wfid == this.props.Button
                    })
                    if (Data) {
                        this.setState({
                            TaskButton: Data
                        })

                    }
                    else {
                        this.setState({
                            TaskButton: {
                                name: 'error'
                            }
                        })
                    }
                }
                catch (e) {
                }
            }
        }
        ).catch((e) => {
            Alert.alert("No record ")
        })

        this.setState({
            show: this.props.show.hasSubTask
        })
    }
    // componentDidMount() {

    //     // this.setState({
    //     //     show: props.show
    //     // })
    // }

    render() {
        console.log("this.state.TaskButton.name", this.state.TaskButton.name)
        if (this.state.TaskButton.name == "ADHOCTASK") {
            return (
                <View style={{ padding: 10, height: 70, width: "100%", backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Task Details")}
                            style={{ borderRadius: 5, backgroundColor: (this.props.name === "Task Details") ? "#d19537" : "white", height: 50, width: 100, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: (this.props.name == "Task Details") ? "white" : "black" }}>Task Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Attachement")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Attachement") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Attachement") ? "white" : "black" }}>Attachments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Summery")}

                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Summery") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Summery") ? "white" : "black" }}>Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("History")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "History") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "History") ? "white" : "black" }}>History</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            onPress={() => {}}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "MS document workflow") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "MS document workflow") ? "white" : "black" }}>MS document workflow</Text>
                        </TouchableOpacity> */}
                    </ScrollView>
                </View>
            )
        }
        else if (this.state.TaskButton.name == "PROCUREMENTMOM") {
            return (
                <View style={{ padding: 10, height: 70, width: "100%", backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Task Details")}
                            style={{ borderRadius: 5, backgroundColor: (this.props.name === "Task Details") ? "#d19537" : "white", height: 50, width: 100, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: (this.props.name == "Task Details") ? "white" : "black" }}>Task Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Attachement")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Attachement") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Attachement") ? "white" : "black" }}>Attachments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Summery")}

                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Summery") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Summery") ? "white" : "black" }}>Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("History")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "History") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "History") ? "white" : "black" }}>History</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => this.props.Changename("PMM")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 250, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "PMM") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "PMM") ? "white" : "black" }}>Procurement Minute of Meeting </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            )
        }
        else if (this.state.TaskButton.name == "ADHOCWF") {
            return (
                <View style={{ padding: 10, height: 70, width: "100%", backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Task Details")}
                            style={{ borderRadius: 5, backgroundColor: (this.props.name === "Task Details") ? "#d19537" : "white", height: 50, width: 100, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: (this.props.name == "Task Details") ? "white" : "black" }}>Task Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Attachement")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Attachement") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Attachement") ? "white" : "black" }}>Attachments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Summery")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Summery") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Summery") ? "white" : "black" }}>Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("History")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "History") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "History") ? "white" : "black" }}>History</Text>
                        </TouchableOpacity>
                        {(this.state.show) ? (this.state.show == true ? <TouchableOpacity
                            onPress={() => this.props.Changename("Sub Task")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Sub Task") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Sub Task") ? "white" : "black" }}>Sub Task</Text>
                        </TouchableOpacity> : null) : null}

                        <TouchableOpacity
                            onPress={() => this.props.Changename("Correspondence Templete")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 250, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Correspondence Templete") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Correspondence Templete") ? "white" : "black" }}>Correspondence Template</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            )
        }
        else if (this.state.TaskButton.name == "ADHOCMOMWF") {
            return (
                <View style={{ padding: 10, height: 70, width: "100%", backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Task Details")}
                            style={{ borderRadius: 5, backgroundColor: (this.props.name === "Task Details") ? "#d19537" : "white", height: 50, width: 100, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: (this.props.name == "Task Details") ? "white" : "black" }}>Task Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Attachement")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Attachement") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Attachement") ? "white" : "black" }}>Attachments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Summery")}

                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Summery") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Summery") ? "white" : "black" }}>Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("History")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "History") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "History") ? "white" : "black" }}>History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Sub Task")}

                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Sub Task") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Sub Task") ? "white" : "black" }}>Sub Task</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            )
        }
        else if (this.state.TaskButton.name == "PROCESSAPPROVAL") {
            return (
                <View style={{ padding: 10, height: 70, width: "100%", backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Task Details")}
                            style={{ borderRadius: 5, backgroundColor: (this.props.name === "Task Details") ? "#d19537" : "white", height: 50, width: 100, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: (this.props.name == "Task Details") ? "white" : "black" }}>Task Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Attachement")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Attachement") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Attachement") ? "white" : "black" }}>Attachments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Summery")}

                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Summery") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Summery") ? "white" : "black" }}>Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("History")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "History") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "History") ? "white" : "black" }}>History</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Committee")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 250, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Committee") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Committee") ? "white" : "black" }}>Committee</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )
        }
        else if (this.state.TaskButton.name == "Service Agreement") {
            return (
                <Text>No record Found</Text>
            )
        }
        else {
            return (
                <View style={{ padding: 10, height: 70, width: "100%", backgroundColor: "#F4F4F4", flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Task Details")}
                            style={{ borderRadius: 5, backgroundColor: (this.props.name === "Task Details") ? "#d19537" : "white", height: 50, width: 100, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: (this.props.name == "Task Details") ? "white" : "black" }}>Task Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Attachement")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Attachement") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Attachement") ? "white" : "black" }}>Attachments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("Summery")}

                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Summery") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "Summery") ? "white" : "black" }}>Summary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.Changename("History")}
                            style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 100, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "History") ? "#d19537" : "white" }}>
                            <Text style={{ color: (this.props.name == "History") ? "white" : "black" }}>History</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                        onPress={() => this.props.Changename("PMM")}
                        style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 250, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "PMM") ? "#d19537" : "white" }}>
                        <Text style={{ color: (this.props.name == "PMM") ? "white" : "black" }}>Procurement Minute of Meeting </Text>
                    </TouchableOpacity> */}

                    </ScrollView>
                </View>
            )
        }

        // let Res = this.state.TaskButton.map((res, i) => {
        //     console.log("Map", res);

        //     // return (
        //     //     <React.Fragment key={i}>
        //     //         <TouchableOpacity
        //     //             onPress={() => this.props.Changename("Correspondence Templete")}
        //     //             style={{ marginLeft: 5, borderRadius: 5, height: 50, width: 250, justifyContent: "center", alignItems: "center", backgroundColor: (this.props.name === "Correspondence Templete") ? "#d19537" : "white" }}>
        //     //             <Text style={{ color: (this.props.name == "Correspondence Templete") ? "white" : "black" }}>{res}</Text>
        //     //         </TouchableOpacity>
        //     //     </React.Fragment>
        //     // )
        // })


    }
}
