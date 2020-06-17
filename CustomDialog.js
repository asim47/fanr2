import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, I18nManager } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from "react-redux"
const CustomDialog = ({open,yes,no}) => {


    // const props = useSelector(state => state.Modal.customDialogByAsim)
    const props = {
    open: true,
    varient: "info",
    mainHeading: "Are you sure you want to delete this attachment?",
    message: "",
    okMsg: I18nManager.isRTL ? "تم" : "OK",
    removeMsg: "",
    remove: () => no(),
    ok: () => yes(),
    }
    return (
        <Modal animated animationType="fade" visible={open} transparent={true}>
            <View style={styles.Overlay}>
                <View style={styles.DialogArea}>
                    <TouchableOpacity onPress={() => props.remove() } style={{ padding: 10, backgroundColor: "transparent", zIndex: 100, alignSelf: "flex-end", position: "absolute" }} >
                        <AntDesign name="close" size={25} color="white" />
                    </TouchableOpacity>

                    <View style={{ ...styles.InfoBox, backgroundColor: props.varient == "error" ? "#D81F25" : props.varient == "success" ? "#22BB33" : "#F0AD4E" }}>
                        {
                            props.varient == "error" ? (
                                <MaterialIcons name="error-outline" size={50} color="white" />
                            ) : null
                        }
                        {
                            props.varient == "success" ? (
                                <Feather name="check-circle" size={45} color="white" />
                            ) : null
                        }
                        {
                            props.varient == "info" ? (
                                <Feather name="info" size={45} color="white" />
                            ) : null
                        }
                    </View>

                    <View style={styles.HeadingContainer}>
                        {
                            props.mainHeading ? (
                                <Text style={styles.MainHeading}>
                                    {
                                        props.mainHeading
                                    }
                                </Text>
                            ) : null
                        }
                        {
                            props.message ? (
                                <Text style={styles.Message}>
                                    {
                                        props.message
                                    }
                                </Text>
                            ) : null
                        }
                    </View>
                    <View style={styles.ButtonContainer}>

                        {
                            props.removeMsg ? (
                                <TouchableOpacity
                                    onPress={() => props.remove()}
                                    style={{ ...styles.ok, width: 100, marginRight: 10, borderWidth: .7, borderColor: props.varient == "error" ? "#D81F25" : props.varient == "success" ? "#22BB33" : "#F0AD4E" }}>
                                    <Text style={{ fontSize: 20, color: props.varient == "error" ? "#D81F25" : props.varient == "success" ? "#22BB33" : "#F0AD4E" }}>No </Text>
                                </TouchableOpacity>
                            ) : null
                        }
                        <TouchableOpacity

                            onPress={() => props.ok()}
                            style={{ ...styles.ok, backgroundColor: props.varient == "error" ? "#D81F25" : props.varient == "success" ? "#22BB33" : "#F0AD4E" }}>
                            <Text style={{ color: "white", fontSize: 20 }}>Yes</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default CustomDialog

const styles = StyleSheet.create({
    Overlay: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    DialogArea: {
        height: 270,
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,

    },
    InfoBox: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center"
    },
    HeadingContainer: {
        flex: 2.5,
        padding: 10,
        justifyContent:"center"
    },
    ButtonContainer: {
        flex: 1,
        padding: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"

    },
    MainHeading: {
        fontSize: 20,
        color: "black",
        textAlign:"center"
    },
    Message: {
        fontSize: 16,
        textAlign:"center"
    },
    ok: {
        height: 50,
        width: 80,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    }
})