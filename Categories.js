import React, { Component, useEffect, useState } from "react";
import Menu from "./Menu";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Overlay from "react-native-modal-overlay";
import { useStateValue } from "./state";
import Axios from "axios";
import { api } from "./Api";

const Categories = function(props) {
  const [Categories, setCategories] = useState([]);

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
  useEffect(() => {
    async function _bootstrapAsync() {
      const userData = await AsyncStorage.getItem("userData");

      fetchCategories(JSON.parse(userData).session);

      async function fetchCategories(id) {
        const result = await Axios.post(`${api}/cms/rest/inbox/category/list`, {
          sessionKey: userDataPayload ? userDataPayload.session : id
        });

        setCategories(result.data.resultList);
      }
    }

    _bootstrapAsync();
  }, []);

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
          <Icon
            name="times"
            size={25}
            color="#ccc"
            onPress={hideModal}
            style={{ position: "absolute", right: 0, top: 2, color: "#000" }}
          />

          <Text
            style={{
              marginBottom: 10,
              fontWeight: "bold"
            }}
          >
            Options
          </Text>

          {Categories.map((every, index) => (
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
                  fontWeight: "bold"
                }}
              >
                {every.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Overlay>
  );
};
export default Categories;
