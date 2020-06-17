import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, TouchableHighlight, Button, Picker, TextInput, Alert } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Axios from 'axios'
import Modal from "react-native-modal";
import { api } from './Api';
import Feather from "react-native-vector-icons/Feather"   //edit
import AntDesign from "react-native-vector-icons/AntDesign"   //delete
export default class Committee extends Component {
    state = {
        display: {
            id: -1,
            visible: false
        },
        Committee: [],
        Loading: false,
        isModalVisible: false,
        language: "",
        id: "",
        section: "",
        Text: "",
        UserID: "",
    }
    Change = (val) => {
        this.setState({
            Text: val
        })

    }
    ShowMenu(id) {
        if (this.state.display.id == id) {
            this.setState({
                display: {
                    id: id,
                    visible: !this.state.display.visible
                }
            })
        }
        else {
            this.setState({
                display: {
                    id: id,
                    visible: true
                }
            })
        }
    }
    componentDidMount() {
        Axios.post(`${api}/cms/rest/auth/getUserDetails`, {
            sessionKey: this.props.pkey
        }).then((res) => {
            this.setState({
                ...this.state,
                UserID: res.data.result.userId
            })
        })
        Axios.post(api + "/cms/rest/procapproval/getCommitteeRecords", { "sessionKey": this.props.comkey, "trxId": this.props.ID }).then((resp) => {
            console.log(resp.data.resultList, "TESTING")
            this.setState({
                Committee: resp.data.resultList,
                Loading: true,
            })
        })
    }
    // click = (s, id) => {
    //     console.log("dsvjn", s, id);

    // }
    toggleModal = (id, section) => {
        this.setState({
            id: id,
            section: section
        })
        // console.log("ids", section);
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    savedata = () => {
        Axios.post(api + "/cms/rest/procapproval/updateByCommitee", {
            "sessionKey": this.props.comkey, "id": this.state.id,
            "section": this.state.section,
            "piProposedChanges": this.state.language,
            "piReason": this.state.Text
        }).then((res) => {
            alert(res.data.status)

        })
    }
    render() {

        // let Res = this.state.Committee.map((res, i) => {
        //     return (
        //         <React.Fragment key={i}>

        //          <View style={{ width: "100%", backgroundColor: "white", borderRadius: 20, padding: 5, marginTop: 10, minHeight: 200 }}>
        //         <ScrollView horizontal>
        //             <View>
        //                 <View style={{ paddingLeft: 10, height: 40, backgroundColor: "#606060", flexDirection: "row" }}>
        //                     <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
        //                         <Text style={{ color: "white" }}>
        //                             Comments
        //                     </Text>
        //                     </View>
        //                     <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
        //                         <Text style={{ color: "white" }}>
        //                             Decisions
        //                     </Text>
        //                     </View>
        //                     <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
        //                         <Text style={{ color: "white" }}>
        //                             Added By
        //                     </Text>
        //                     </View>
        //                     <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "flex-start" }}>
        //                         <Text style={{ color: "white" }}>
        //                             Amendment
        //                     </Text>
        //                     </View>
        //                     <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "flex-start" }}>
        //                         <Text style={{ color: "white" }}>
        //                             Elimination
        //                     </Text>
        //                     </View>
        //                 </View>

        //                 {this.state.PMM.length > 0 ? this.state.PMM.map((res, i) => {
        //                     console.log(res)
        //                     return (
        //                         <View style={{ paddingLeft: 10, height: 40, flexDirection: "row" }}>
        //                             <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
        //                                 <Text style={{ color: "black" }}>
        //                                     {res.comments}
        //                                 </Text>
        //                             </View>
        //                             <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
        //                                 <Text style={{ color: "black" }}>
        //                                     {res.userDecisionTitle}
        //                                 </Text>
        //                             </View>
        //                             <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
        //                                 <Text style={{ color: "black" }}>
        //                                     {res.userId}
        //                                 </Text>
        //                             </View>
        //                             <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "center" }}>
        //                                 {
        //                                     res.userId == this.state.UserID ? (
        // <Feather

        //     onPress={() => this.toggleModal(res.id, res.section, res.userDecision)}
        //     name="edit"
        //     color="orange"
        //     size={30}
        // />
        //                                     ) : null
        //                                 }

        //                             </View>
        //                             <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "center" }}>
        //                                 {
        //                                     res.userId == this.state.UserID ? (
        //                                         <AntDesign
        //                                             onPress={() => {
        //                                                 this.delete(res.id)
        //                                             }}
        //                                             name="delete"
        //                                             color="orange"
        //                                             size={30}
        //                                         />
        //                                     ) : null
        //                                 }

        //                             </View>
        //                         </View>
        //                     )
        //                 }) : <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
        //                         <Text style={{ color: "grey" }}>No Records Found</Text>
        //                     </View>}
        //             </View>
        //         </ScrollView>
        //     </View>

        //         </React.Fragment>
        //     )
        // })


        let Res = (
            <View style={{ width: "100%", backgroundColor: "white", borderRadius: 20, padding: 5, marginTop: 10, minHeight: 200 }}>
                <ScrollView horizontal>
                    <View>
                        <View style={{ paddingLeft: 10, height: 40, backgroundColor: "#606060", flexDirection: "row" }}>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Page/ Section
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    proposed changes
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    IMS Document Reason
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    IMS Document Owner Decision
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    IMS Document Owner Reason
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Added by
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 300, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Department Name
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white" }}>
                                    Amendment
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "white" }}>
                                    Elimination
                            </Text>
                            </View>
                        </View>

                        {this.state.Committee.length > 0 && this.state.Committee ? this.state.Committee?.map((res, i) => {
                            return (
                                <View style={{ paddingLeft: 10, height: 40, flexDirection: "row" }}>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{}}>
                                            {res.section}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{}}>
                                            proposed changes
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{}}>
                                            {res.piProposedChanges}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{}}>
                                            {res.poDecisionTitle}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{}}>
                                            {res.piReason}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{}}>
                                            {res.userId}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 300, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{}}>
                                            {res.userDepartment}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white" }}>

                                            {
                                                this.state.UserID == res.userId ? (
                                                    <Feather

                                                        onPress={() => this.toggleModal(res.id, res.section)}
                                                        name="edit"
                                                        color="orange"
                                                        size={30}
                                                    />
                                                ) : null
                                            }
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 200, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "white" }}>

                                            {
                                                this.state.UserID == res.userId ? (
                                                    <AntDesign
                                                        onPress={() => {
                                                          this.setState({
                                                              ...this.state,
                                                              Loading: false,
                                                          })
                                                            Axios.post(api+"/cms/rest/procapproval/deletePA",{
                                                                "sessionKey": this.props.comkey,
                                                                "id": res.id
                                                            }).then(()=>{
                                                                Axios.post(api + "/cms/rest/procapproval/getCommitteeRecords", { "sessionKey": this.props.comkey, "trxId": this.props.ID }).then((resp) => {
                                                                    console.log(resp.data.resultList, "TESTING")
                                                                    this.setState({
                                                                        Committee: resp.data.resultList,
                                                                        Loading: true,
                                                                    })
                                                                })
                                                            })
                                                        }}
                                                        name="delete"
                                                        color="orange"
                                                        size={30}
                                                    />
                                                ) : null
                                            }
                                        </Text>
                                    </View>

                                </View>
                            )
                        }) : <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "grey" }}>No Records Found</Text>
                            </View>}
                    </View>
                </ScrollView>
            </View>
        )


        return this.state.Loading == false ? (
            <React.Fragment>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text>Loading...</Text>
                </View>
            </React.Fragment>
        ) : (
                <View>
                    <Modal isVisible={this.state.isModalVisible} swipeDirection="left">
                        <View style={{ flex: 1 }}>
                            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
                                <TouchableOpacity onPress={this.toggleModal}>
                                    <Icon name="remove" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", backgroundColor: "#FFFF", marginTop: 50, paddingBottom: 20, paddingTop: 30 }}>
                                <Text style={{ padding: 10, fontWeight: "bold", fontSize: 15 }}>Process Owner Decision</Text>
                                <View style={{ paddingRight: 20 }}>
                                    <Picker
                                        selectedValue={this.state.language}
                                        style={{ height: 70, width: "100%", position: "relative", left: 20, right: 20 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ language: itemValue })
                                        }>
                                        <Picker.Item label="Select" value="Select" />
                                        <Picker.Item label="Accepted" value="Accepted" />
                                        <Picker.Item label="Accepted With Modifications" value="Accepted With Modifications" />
                                        <Picker.Item label="Refused" value="Refused" />
                                    </Picker>
                                </View>
                                <Text style={{ padding: 10, fontWeight: "bold", fontSize: 15 }} >Process Owner Reason</Text>
                                <View style={{ padding: 15 }}>
                                    <TextInput onChangeText={(val) => this.Change(val)} placeholder="No need for the change" style={{ width: "100%", height: 50, backgroundColor: "#ebebeb" }} />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                                    <TouchableOpacity style={{
                                        padding: 10, backgroundColor: "#FFFFF", shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.00,
                                        elevation: 24,
                                    }}>
                                        <Text style={{ color: "#d7962f" }}>Reset</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.savedata} style={{
                                        padding: 10, backgroundColor: "#FFFFF", shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.00,

                                        elevation: 24,
                                    }}>
                                        <Text style={{ color: "#d7962f" }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
                        </View>
                    </Modal>
                    <View style={{ width: "100%", height: "100%", backgroundColor: "#F4F4F4", padding: 10 }}>
                        <ScrollView>
                            {Res}
                        </ScrollView>
                    </View>
                </View>
            )
    }
}
