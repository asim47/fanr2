import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
export default class TaskDetails extends Component {
    render() {
        let Res = this.props.Subtaskdata.map((res, i) => {

            return (
                <React.Fragment key={i}>
                    <View style={{ width: "100%", backgroundColor: "white" }}>
                        <View style={{ padding: 10, width: "100%", backgroundColor: "#fffffff" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 14 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Entypo name="triangle-right" size={20} color="#d19537" />
                                    <Text>Ref:{res.reference}</Text>
                                </View>
                            </View>
                            <View style={{ paddingLeft: 20, paddingRight: 20, flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold", }}>Subject:{res.title}</Text>
                                </View>

                            </View>
                        </View>
                        <View style={{ paddingBottom: 50 }}>
                            <View style={{ width: "100%", backgroundColor: "white" }}>
                                <ScrollView>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", fontWeight: "bold" }}>Workflow Type</Text>
                                        <Text style={{ color: "grey" }}>{res.wfTitle}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", fontWeight: "bold" }}>Initiated</Text>
                                        <Text style={{ color: "grey" }}>{res.initiateddate}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", fontWeight: "bold" }}>Last Action</Text>
                                        <Text style={{ color: "grey" }}>{res.lastactiondate}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", fontWeight: "bold" }}>Action</Text>
                                        <Text style={{ color: "grey" }}>{res.actionTitle}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", fontWeight: "bold" }}>Sender</Text>
                                        <Text style={{ color: "grey" }}>{res.claimedBy}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", fontWeight: "bold" }}>Status</Text>
                                        <Text style={{ color: "grey" }}>{res.statusTitle}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", fontWeight: "bold" }}>Claimed By</Text>
                                        <Text style={{ color: "grey" }}>{res.claimedBy}</Text>
                                    </View>

                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </React.Fragment>
            )
        })
        return (
            <View>
                <View style={{ height: 630, width: "100%", backgroundColor: "#F4F4F4" }}>
                    <ScrollView>
                        {Res}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
