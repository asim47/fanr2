import React, { Component } from "react";
import { View, Text, BackHandler, ScrollView } from "react-native";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import Entypo from "react-native-vector-icons/Entypo"
export default class History extends Component {
    render() {
        let resp = this.props.HistoryData.map((res, i) => {
            return (
                <React.Fragment key={i}>
                    <Collapse>
                        <CollapseHeader>
                            <View style={{ width: "100%", padding: 15, backgroundColor: "#F4F4F4", marginTop: 10 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ width: 50, fontWeight: "100" }}>From</Text>
                                    <Text style={{ width: 130, color: "grey" }}>{res.assignedby}</Text>
                                    <Text style={{ width: 80, fontWeight: "bold" }}>To</Text>
                                    <Text style={{ width: 100, color: "grey" }}>{res.assignedto}</Text>
                                    <Entypo name="chevron-small-down" size={25} />
                                </View>
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                            <View style={{ width: "100%", backgroundColor: "white" }}>
                                <ScrollView>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Claimed By</Text>
                                        <Text style={{ color: "grey" }}>{res.claimedby}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Status</Text>
                                        <Text style={{ color: "grey" }}>{res.status}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Required Action</Text>
                                        <Text style={{ color: "grey" }}>{res.requriedAction}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Assigned Date</Text>
                                        <Text style={{ color: "grey" }}>{res.initiateddate}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Last Action Date</Text>
                                        <Text style={{ color: "grey" }}>{res.lastactiondate}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Difference</Text>
                                        <Text style={{ color: "grey" }}>{res.dateDifference}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Completion %</Text>
                                        <Text style={{ color: "grey" }}>{res.percentage}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                        <Text style={{ width: "35%", }}>Remarks</Text>
                                        <Text style={{ color: "grey" }}>{res.comments}</Text>
                                    </View>

                                </ScrollView>
                            </View>
                        </CollapseBody>
                    </Collapse>
                </React.Fragment>
            )
        })
        return (
            <View>
                <View style={{ paddingBottom: 20 }}>
                    <ScrollView>
                        {resp}
                    </ScrollView>
                </View>
            </View>
        );
    }
}