import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Picker, TextInput } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import Axios from 'axios'
import Modal from "react-native-modal";
import { api } from './Api';
import Feather from "react-native-vector-icons/Feather"   //edit
import AntDesign from "react-native-vector-icons/AntDesign"   //delete
import { CheckBox, } from "react-native-elements"
export default class PMM extends Component {
    state = {
        display: {
            id: -1,
            visible: false
        },
        PMM: [],
        Loading: false,
        language: "",
        id: "",
        // section: "",
        Text: "",
        isModalVisible: false,
        userDecisions: "",
        UserID: "",
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
        Axios.post(api + "/cms/rest/pmom/getCommitteeRecords", { "sessionKey": this.props.pkey, "trxId": this.props.ID }).then((res) => {
            this.setState({
                PMM: res.data.resultList,
                Loading: true
            })
        })
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
    toggleModal = (id, section, userDecision) => {
        this.setState({
            id: id,
            section: section,
            userDecisions: userDecision
        })
        // console.log("ids", section);
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    savedata = () => {

        Axios.post(api + "/cms/rest/procapproval/updateByProcessOwner", {
            "sessionKey": this.props.pkey,
            "id": this.state.id,
            "poDecision": this.state.userDecisions,
            "poReason": this.state.Text
        }).then((res) => {
            alert(res.data.status);
        })
    }



    delete = (e) => {
        this.setState({
            ...this.state,
            Loading: false
        })
        Axios.post(api + "/cms/rest/pmom/deleteMom", {
            "sessionKey": this.props.pkey,
            "id": e
        }).then(() => {
            Axios.post(api + "/cms/rest/pmom/getCommitteeRecords", { "sessionKey": this.props.pkey, "trxId": this.props.ID }).then((res) => {
                this.setState({
                    PMM: res.data.resultList,
                    Loading: true
                })
            })
        })
    }
    render() {
        // console.log("pkey", this.state);

        // let res = this.state.PMM.map((res, i) => {
        //     return (
        //         <React.Fragment key={i}>
        //             <View style={{ width: "100%", backgroundColor: "white", borderRadius: 20, padding: 5, marginTop: 10 }}>
        //                 <View>
        //                     <View style={{ width: "90%", flexDirection: "row", paddingLeft: 10, paddingRight: 10 }}>
        //                         <Text style={{ color: "lightgrey", width: "50%" }}>Comment</Text>
        //                         <Text style={{ width: "5%" }}>:</Text>
        //                         <Text style={{ paddingRight: 100 }}>{res.comments}</Text>
        //                     </View>
        //                     <View style={{ width: "90%", flexDirection: "row", paddingLeft: 10, paddingRight: 10 }}>
        //                         <Text style={{ color: "lightgrey", width: "50%" }}>Decision</Text>
        //                         <Text style={{ width: "5%" }}>:</Text>
        //                         <Text style={{ paddingRight: 100 }}>{res.userDecisionTitle}</Text>

        //                     </View><View style={{ width: "90%", flexDirection: "row", paddingLeft: 10, paddingRight: 10 }}>
        //                         <Text style={{ color: "lightgrey", width: "50%" }}>Added By</Text>
        //                         <Text style={{ width: "5%" }}>:</Text>
        //                         <Text style={{ paddingRight: 100 }}>{res.userId}</Text>

        //                     </View>
        //                 </View>
        //                 <TouchableOpacity
        //                     onPress={() => { this.ShowMenu(i) }}
        //                     style={{ zIndex: 200, position: "absolute", right: 20, justifyContent: "center", alignItems: "center", padding: 5 }}>
        //                     <Icon name="ellipsis-v" size={20} />
        //                 </TouchableOpacity>
        //                 <View style={{ position: "absolute", top: 5, right: 15, width: 150, backgroundColor: "#ffff" }}>
        //                     <View style={{ display: (this.state.display.id == i) ? (this.state.display.visible ? "flex" : "none") : "none" }}>
        //                         <TouchableOpacity onPress={() => this.toggleModal(res.id, res.section, res.userDecision)} style={{zIndex:10, padding: 10, borderColor: "grey", borderWidth: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
        //                             <Text>Edit</Text>
        //                         </TouchableOpacity>

        //                         <TouchableOpacity onPress={() => {
        //                             this.delete(res.id)
        //                         }} style={{zIndex:10, padding: 10, borderColor: "grey", borderWidth: 1, justifyContent: "flex-start", alignItems: "flex-start" }}>
        //                             <Text>Delete</Text>
        //                         </TouchableOpacity>

        //                     </View>
        //                 </View>
        //             </View>
        //         </React.Fragment>
        //     )
        // })
        let res = (
            <View style={{ width: "100%", backgroundColor: "white", borderRadius: 20, padding: 5, marginTop: 10, minHeight: 200 }}>
                <ScrollView horizontal>
                    <View>
                        <View style={{ paddingLeft: 10, height: 40, backgroundColor: "#606060", flexDirection: "row" }}>
                            <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Comments
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Decisions
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Added By
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Amendment
                            </Text>
                            </View>
                            <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "flex-start" }}>
                                <Text style={{ color: "white" }}>
                                    Elimination
                            </Text>
                            </View>
                        </View>

                        {this.state.PMM?.length > 0 ? this.state.PMM?.map((res, i) => {
                            console.log(res)
                            return (
                                <View style={{ paddingLeft: 10, height: 40, flexDirection: "row" }}>
                                    <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{ color: "black" }}>
                                            {res.comments}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{ color: "black" }}>
                                            {res.userDecisionTitle}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 150, justifyContent: "center", alignItems: "flex-start" }}>
                                        <Text style={{ color: "black" }}>
                                            {res.userId}
                                        </Text>
                                    </View>
                                    <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "center" }}>
                                        {
                                            res.userId == this.state.UserID ? (
                                                <Feather

                                                    onPress={() => this.toggleModal(res.id, res.section, res.userDecision)}
                                                    name="edit"
                                                    color="orange"
                                                    size={30}
                                                />
                                            ) : null
                                        }

                                    </View>
                                    <View style={{ height: 40, width: 110, justifyContent: "center", alignItems: "center" }}>
                                        {
                                            res.userId == this.state.UserID ? (
                                                <AntDesign
                                                    onPress={() => {
                                                        this.delete(res.id)
                                                    }}
                                                    name="delete"
                                                    color="orange"
                                                    size={30}
                                                />
                                            ) : null
                                        }

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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text>Loading..</Text>
            </View >
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
                                <Text style={{ padding: 10, fontWeight: "bold", fontSize: 15 }}>Decision*</Text>
                                <View style={{ paddingRight: 20 }}>
                                    {/* <Picker
                                        selectedValue={this.state.language}
                                        style={{ height: 70, width: "100%", position: "relative", left: 20, right: 20 }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ language: itemValue })
                                        }>
                                        <Picker.Item label="Select" value="Select" />
                                        <Picker.Item label="Recommended" value="Recommended" />
                                        <Picker.Item label="NotRecommended" value="NotRecommended" />
                                    </Picker> */}

                                    {/* <ListItem>
                                        <CheckBox onPress={() => {
                                            this.setState({ language: "Recommended" })
                                        }} checked={this.state.language == "Recommended"} />
                                        <Body>
                                            <Text style={{ paddingLeft: 10 }}>Recommended</Text>
                                        </Body>
                                    </ListItem> */}

                                    <CheckBox

                                        onPress={() => {
                                            this.setState({ language: "Recommended" })
                                        }}
                                        title='Recommended'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.language == "Recommended"}
                                    />
                                    {/* <ListItem>
                                        <CheckBox checked={this.state.language == "NotRecommended"} onPress={() => {
                                            this.setState({ language: "NotRecommended" })
                                        }} />
                                        <Body>
                                            <Text style={{ paddingLeft: 10 }}>Not Recommended</Text>
                                        </Body>
                                    </ListItem> */}
                                    <CheckBox

                                        onPress={() => {
                                            this.setState({ language: "NotRecommended" })
                                        }}
                                        title='Not Recommended'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        checked={this.state.language == "NotRecommended"}
                                    />
                                </View>
                                <Text style={{ padding: 10, fontWeight: "bold", fontSize: 15 }} >Comments*</Text>
                                <View style={{ padding: 15 }}>
                                    <TextInput multiline onChangeText={(val) => this.Change(val)} placeholder="" style={{ width: "100%", height: 70, backgroundColor: "#ebebeb" }} />
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
                            {res}
                        </ScrollView>
                    </View>
                </View>
            )
    }
}
