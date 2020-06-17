import React, { Component, useState, useEffect } from "react";
import Menu from "./Menu";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  AsyncStorage,
  Alert,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Overlay from "react-native-modal-overlay";
import { useStateValue } from "./state";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Axios from "axios";
import { api } from "./Api";

const Options = [
  { opt: "Claimed Correspondences", Listfor: "claimedTasks" },
  { opt: "Employee Correspondences", Listfor: "employeeTasks" },
  { opt: "Initiated Correspondences", Listfor: "initiatedTasks" },
  { opt: "Open Correspondences", Listfor: "openedTasks" },
  { opt: "Participated Tasks", Listfor: "participatedTasks" },
  { opt: "Saved Tasks", Listfor: "savedTasks" },
  { opt: "Completed Tasks", Listfor: "completedTasks" }
];

const StatOptions = [
  { opt: "Approved Statistics", Listfor: "approvedStatistics" },
  { opt: "Creation Statistics", Listfor: "creationStatistics" }
];

const ModalOptions = function(props) {
  const [
    {
      calResponse,
      userDataPayload,
      taskDetailPayload,
      currentInboxListForPayload
    },
    dispatch
  ] = useStateValue();
  // const userDataPayload ={
  //   session:"miasiab avsaysva sauysv aus jvas"
  // }
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [categoryCrud, setCategoryCrud] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState(false);
  const [statEndPoint, setStatEndPoint] = useState("");
  const [statDetails, setStatDetails] = useState(false);
  const [statsList, setStatsList] = useState([]);

  const screenHeight = Math.round(Dimensions.get("window").height);

  useEffect(() => {
    let didCancel = false;
    async function fetchMyAPI() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font
      });

      if (!didCancel) {
        setIsReady(true);
      }
    }

    async function _bootstrapAsync() {
      const userData = await AsyncStorage.getItem("userData");

      dispatch({
        type: "userData",
        userDataPayload: JSON.parse(userData)
      });

      fetchCategories(JSON.parse(userData).session);

      if (!didCancel) {
        setUserData(JSON.parse(userData) ? JSON.parse(userData).session : "");
      }
    }

    _bootstrapAsync();

    fetchMyAPI();
    return () => {
      didCancel = true;
    };
  }, [currentInboxListForPayload, userData]);

  async function fetchCategories(id) {
    const result = await Axios.post(`${api}/cms/rest/inbox/category/list`, {
      sessionKey: userDataPayload ? userDataPayload.session : id
    });

    setCategoryList(result.data.resultList);
  }

  async function DeleteCategory(id) {
    const result = await Axios.post(`${api}/cms/rest/inbox/category/delete`, {
      sessionKey: userDataPayload ? userDataPayload.session : "",
      id: id
    });

    fetchCategories(userDataPayload.session);
  }

  async function AddCategory() {
    let params = {
      sessionKey: userDataPayload ? userDataPayload.session : "",
      name: title,
      description: description
    };

    let EndPoint = editCategory ? `update` : `create`;
    const result = await Axios.post(
      `${api}/cms/rest/inbox/category/${EndPoint}`,
      editCategory ? { ...params, id: editId } : { ...params }
    );

    fetchCategories(userDataPayload.session);
    setTitle("");
    setDescription("");
  }

  const validateForm = function() {
    return title && description ? true : false;
  };

  async function fetchStats(stat) {
    const result = await Axios.post(`${api}/cms/rest/inbox/${stat}`, {
      sessionKey: userDataPayload.session
    });

    setStatsList(result.data.resultList);
  }

  return (
    <Overlay
      visible={props.open}
      onClose={() => {
        props.onClose && props.onClose();
      }}
      closeOnTouchOutside
      animationType="zoomIn"
      containerStyle={{
        backgroundColor: "rgba(0,0,0, 0.78)",
        justifyContent: "flex-end",
        margin: 0,
        padding: 0
      }}
      childrenWrapperStyle={{
        backgroundColor: "#eee",
        alignItems: "flex-start"
      }}
      // animationDuration={500}
    >
      {(hideModal, overlayState) => (
        <View
          style={{
            width: "100%"
          }}
        >
          <TouchableOpacity
            onPress={hideModal}
            style={{
              position: "absolute",
              right: 0,
              top: -20,
              color: "#000",
              height: 40,
              width: 40
            }}
          >
            <Icon name="times" size={25} color="#ccc" style={{ padding: 10 }} />
          </TouchableOpacity>

          {!categoryCrud && (
            <React.Fragment>
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold"
                }}
              >
                Options
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  height: "15%",
                  marginBottom: 30
                }}
              >
                <ScrollView>
                  {!categoryCrud &&
                    StatOptions.map((every, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          fetchStats(every.Listfor);
                          setStatEndPoint(every.Listfor);
                          setStatDetails(true);
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 10,
                            fontWeight: "bold",
                            color:
                              every.Listfor === statEndPoint
                                ? "#d2942f"
                                : "grey"
                          }}
                        >
                          {every.opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  {!categoryCrud &&
                    Options.map((every, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          dispatch({
                            type: "currentInboxListFor",
                            currentInboxListForPayload: every.Listfor
                          });
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 10,
                            fontWeight: "bold",
                            color:
                              every.Listfor === currentInboxListForPayload
                                ? "#d2942f"
                                : "grey"
                          }}
                        >
                          {every.opt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>

              <Text
                style={{
                  paddingBottom: 20,
                  fontWeight: "bold"
                }}
              >
                Folder
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  height: "15%",
                  marginBottom: 30
                }}
              >
                <ScrollView>
                  {!categoryCrud &&
                    categoryList.map((every, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          dispatch({
                            type: "currentInboxListFor",
                            currentInboxListForPayload: every.id
                          });
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 10,
                            fontWeight: "bold",
                            color:
                              every.id === currentInboxListForPayload
                                ? "#d2942f"
                                : "grey"
                          }}
                        >
                          {every.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>

              <Text
                style={{
                  paddingBottom: 20,
                  fontWeight: "bold"
                }}
              >
                Statistics
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  height: "30%",
                  marginBottom: 30
                }}
              >
                <ScrollView>
                  {statDetails &&
                    statsList?.map((every, index) => (
                      <TouchableWithoutFeedback key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            backgroundColor: "#ddd"
                          }}
                        >
                          <Text
                            style={{
                              paddingLeft: 10,
                              paddingTop: 7,
                              paddingBottom: 7,
                              fontWeight: "bold",
                              color: "grey",
                              marginRight: 10,
                              flex: 5
                            }}
                          >
                            {every.workflowTitle}
                          </Text>
                          <Text
                            style={{
                              paddingTop: 7,
                              paddingBottom: 7,
                              fontWeight: "bold",
                              color: "grey",
                              flex: 1
                            }}
                          >
                            {every.totalCreated}
                          </Text>

                          <Text
                            style={{
                              paddingTop: 7,
                              paddingBottom: 7,
                              fontWeight: "bold",
                              color: "grey",
                              flex: 1
                            }}
                          >
                            {every.approvedOrReviewed}
                          </Text>

                          <Text
                            style={{
                              paddingTop: 7,
                              paddingBottom: 7,
                              fontWeight: "bold",
                              color: "grey",
                              flex: 1
                            }}
                          >
                            {every.rejected}
                          </Text>

                          <Text
                            style={{
                              paddingTop: 7,
                              paddingBottom: 7,
                              fontWeight: "bold",
                              color: "grey",
                              flex: 1
                            }}
                          >
                            {every.pending}
                          </Text>
                          <Text
                            style={{
                              paddingTop: 7,
                              paddingBottom: 7,
                              fontWeight: "bold",
                              color: "grey",
                              flex: 1
                            }}
                          >
                            {every.pendingWithApprovar}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
              </View>

              <View style={{ flexDirection: "column", width: "100%" }}>
                {!categoryCrud && (
                  <TouchableOpacity
                    onPress={() => {
                      setCategoryCrud(true);
                      setTitle("");
                      setDescription("");
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        color: "#d2942f",
                        fontWeight: "bold"
                      }}
                    >
                      Create/Edit Category
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </React.Fragment>
          )}

          {/* <TouchableWithoutFeedback>
              <View style={{ flexDirection: "row", backgroundColor: "#ddd" }}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontWeight: "bold",
                    color: "grey",
                    marginRight: 10,
                    flex: 2
                  }}
                >
                  Title
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontWeight: "bold",
                    color: "grey",
                    marginRight: 10,
                    flex: 3
                  }}
                >
                  Description
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontWeight: "bold",
                    color: "grey",
                    marginRight: 10,
                    flex: 3
                  }}
                >
                  Edit
                </Text>
                <Text
                  style={{
                    marginBottom: 10,
                    fontWeight: "bold",
                    color: "grey",
                    marginRight: 10,
                    flex: 3
                  }}
                >
                  Delete
                </Text>
              </View>
            </TouchableWithoutFeedback> */}

          {categoryCrud && (
            <React.Fragment>
              <Text
                style={{
                  paddingBottom: 20,
                  fontWeight: "bold"
                }}
              >
                Creating Category
              </Text>

              <View style={{ flexDirection: "column", width: "100%" }}>
                {categoryCrud && (
                  <View
                    style={{ flexDirection: "row", backgroundColor: "#000" }}
                  >
                    <Text
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        fontWeight: "bold",
                        color: "#fff",
                        flex: 2
                      }}
                    >
                      Title
                    </Text>
                    <Text
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        fontWeight: "bold",
                        color: "#fff",
                        flex: 3
                      }}
                    >
                      Description
                    </Text>
                    <Text
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        fontWeight: "bold",
                        color: "#fff",
                        flex: 1,
                        alignItems: "flex-end"
                      }}
                    >
                      Edit
                    </Text>
                    <Text
                      style={{
                        paddingTop: 10,
                        paddingBottom: 10,
                        fontWeight: "bold",
                        color: "#fff",
                        flex: 1
                      }}
                    >
                      Delete
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={{ flexDirection: "column", width: "100%", height: 250 }}
              >
                <ScrollView>
                  {/* {categoryCrud &&
                    categoryList.map((every, index) => {

                      return (
                        <TouchableWithoutFeedback key={index}>
                          <View
                            style={{
                              flexDirection: "row",
                              backgroundColor: "#ddd"
                            }}
                          >
                            <Text
                              style={{
                                paddingTop: 7,
                                paddingBottom: 7,
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontWeight: "bold",
                                color: "grey",
                                flex: 2
                              }}
                            >
                              {every.title}
                            </Text>
                            <Text
                              style={{
                                paddingTop: 7,
                                paddingBottom: 7,
                                paddingLeft: 10,
                                paddingRight: 10,
                                fontWeight: "bold",
                                color: "grey",
                                flex: 3
                              }}
                            >
                              {every.description}
                            </Text>
                            <Icon
                              name="edits"
                              size={30}
                              color="#ccc"
                              onPress={() => {
                                setTitle(every.title);
                                setDescription(every.description);
                                setEditId(every.id);
                                setEditCategory(true);
                              }}
                              style={{
                                color: "#d2942f",
                                marginRight: 10,
                                paddingTop: 7,
                                paddingBottom: 7,
                                flex: 1
                              }}
                            />

                            <Icon
                              name="trash"
                              size={20}
                              color="#ccc"
                              onPress={() => DeleteCategory(every.id)}
                              style={{
                                color: "#d2942f",
                                flex: 1,
                                paddingTop: 7,
                                paddingBottom: 7
                              }}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })} */}
                </ScrollView>
              </View>

              <View style={{ flexDirection: "column", width: "100%" }}>
                {categoryCrud && (
                  <View style={{ flexDirection: "column", marginTop: 30 }}>
                    <Text>Title *</Text>
                    <TextInput
                      style={{
                        paddingLeft: 10,
                        marginTop: 3,
                        marginBottom: 20,
                        borderColor: "#ccc",
                        borderWidth: 1,
                        borderStyle: "solid",
                        height: 30
                      }}
                      value={title}
                      onChangeText={val => setTitle(val)}
                    />
                    <Text>Description *</Text>
                    <TextInput
                      style={{
                        paddingLeft: 10,
                        marginTop: 3,
                        borderColor: "#ccc",
                        borderWidth: 1,
                        borderStyle: "solid",
                        height: 30
                      }}
                      value={description}
                      onChangeText={val => setDescription(val)}
                    />
                  </View>
                )}
                {categoryCrud && (
                  <View style={{ flexDirection: "column" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-end",
                        marginTop: 10
                      }}
                    >
                      <View style={{ alignSelf: "flex-end", marginRight: 10 }}>
                        <Button
                          title="Save"
                          color="green"
                          style={{
                            marginRight: 10,
                            backgroundColor: "#ccc",
                            borderWidth: 1,
                            color: "#d2942f"
                          }}
                          onPress={() => {
                            if (validateForm()) {
                              AddCategory();
                            } else alert("Please fill required fields");
                          }}
                        />
                      </View>
                      <View>
                        <Button
                          title="Cancel"
                          color="#ccc"
                          style={{
                            marginRight: 10,
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            color: "#d2942f"
                          }}
                          onPress={() => setCategoryCrud(false)}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </React.Fragment>
          )}
        </View>
      )}
    </Overlay>
  );
};
export default ModalOptions;
