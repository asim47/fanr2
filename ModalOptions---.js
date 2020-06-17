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
  ScrollView
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


      if (!didCancel) {
        fetchCategories(JSON.parse(userData).session);
      }

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
            maxWidth: "100%",
            width: "100%",
            flexWrap: "wrap"
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              top: -10,
              color: "#000",
              zIndex: 999,
              backgroundColor: "transparent",
              padding: 10
            }}
            onPress={hideModal}
          >
            <Icon
              name="times"
              size={25}
              onPress={hideModal}
              style={{
                color: "#000",
                zIndex: 999
              }}
            />
          </TouchableOpacity>

          {!categoryCrud && (
            <Text
              style={{
                marginBottom: 10,
                fontWeight: "bold"
              }}
            >
              Options
            </Text>
          )}

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
                    color: every.Listfor === statEndPoint ? "#d2942f" : "grey"
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

          <Text
            style={{
              marginBottom: 10,
              fontWeight: "bold"
            }}
          >
            {categoryCrud ? "Creating Category" : "Folder"}
          </Text>

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

          {statDetails &&
            statsList?.map((every, index) => (
              <TouchableWithoutFeedback key={index}>
                <View style={{ flexDirection: "row", backgroundColor: "#ddd" }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "grey",
                      marginRight: 10,
                      flex: 1
                    }}
                  >
                    {every.workflowTitle}
                  </Text>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "grey",
                      marginRight: 10,
                      flex: 1
                    }}
                  >
                    {every.totalCreated}
                  </Text>

                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "grey",
                      marginRight: 10,
                      flex: 1
                    }}
                  >
                    {every.approvedOrReviewed}
                  </Text>

                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "grey",
                      marginRight: 10,
                      flex: 1
                    }}
                  >
                    {every.rejected}
                  </Text>

                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "grey",
                      marginRight: 10,
                      flex: 1
                    }}
                  >
                    {every.pending}
                  </Text>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "grey",
                      marginRight: 10,
                      flex: 1
                    }}
                  >
                    {every.pendingWithApprovar}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}

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
            <View style={{ flexDirection: "row", backgroundColor: "#000" }}>
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
                  flex: 2
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold",
                  color: "grey",
                  paddingLeft: 20,
                  flex: 1,
                  alignItems: "flex-end"
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
                  flex: 1
                }}
              >
                Delete
              </Text>
            </View>
          )}
          {/* {categoryCrud &&
            categoryList.map((every, index) => (
              <TouchableWithoutFeedback key={index}>
                <ScrollView>
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#ddd"
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        fontWeight: "bold",
                        color: "grey",
                        marginRight: 10,
                        flex: 2
                      }}
                    >
                      {every.title}
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
                      {every.description}
                    </Text>
                    <Icon
                      name="edit"
                      size={20}
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
                        flex: 1
                      }}
                    />
                  </View>
                </ScrollView>
              </TouchableWithoutFeedback>
            ))} */}
          {categoryCrud && (
            <View style={{ marginTop: 30 }}>
              <Text>Title *</Text>
              <TextInput
                style={{ paddingLeft: 10, backgroundColor: "#ccc" }}
                value={title}
                onChangeText={val => setTitle(val)}
              />
              <Text>Description *</Text>
              <TextInput
                style={{ paddingLeft: 10, backgroundColor: "#ccc", height: 30 }}
                value={description}
                onChangeText={val => setDescription(val)}
              />
            </View>
          )}
          {categoryCrud && (
            <View
              style={{
                flexDirection: "row",
                // alignSelf: "flex-end",
                marginTop: 10
              }}
            >
              <View style={{ alignSelf: "flex-end", marginRight: 10 }}>
                <Button
                  title="Save"
                  color="red"
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
          )}
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
      )}
    </Overlay>
  );
};
export default ModalOptions;
