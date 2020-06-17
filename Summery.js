import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
export default class TaskDetails extends Component {
    state = {
        load: false
    }
    componentDidMount() {
        this.setState({
            load: true
        })
    }
    render() {

        let Response = this.props.summerydata.map((res, i) => {
            return (
                <View style={{ width: "100%", backgroundColor: "white" }} key={i}>
                    <View style={{ height: "15%", width: "100%", backgroundColor: "#fffffff" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 14 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Entypo name="triangle-right" size={20} color="#d19537" />
                                <Text>Ref:{(this.props.SubTask == "     null - 0" ? res.reference : this.props.SubTask)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%", backgroundColor: "white" }}>
                        <ScrollView>
                            <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                <Text style={{ width: "35%", fontWeight: "bold" }}>Initiator</Text>
                                <Text style={{ color: "grey" }}>{res.initiatedby}</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                <Text style={{ width: "35%", fontWeight: "bold" }}>Request Date</Text>
                                <Text style={{ color: "grey" }}>{res.initiateddate}</Text>
                            </View>
                            <View style={{ flexDirection: "row", width: "100%", borderBottomColor: "#F4F4F4", borderBottomWidth: 1, paddingLeft: 20, paddingRight: 10, padding: 10 }}>
                                <Text style={{ width: "35%", fontWeight: "bold" }}>Deadline</Text>
                                <Text style={{ color: "grey" }}>{(res.expireindays == null) ? "NA" : ((res.expireindays < 0) ? "Expired" : res.deadline)}</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )
        })
        return this.state.load == false ? (
            <View>
                <Text>Loading...</Text>
            </View>
        ) : (
                <View>
                    <View style={{ height: 700, width: "100%", backgroundColor: "#F4F4F4" }}>
                        {Response}
                        {/* <Text>fsnkjf</Text> */}
                    </View>
                </View>
            )
    }
}
