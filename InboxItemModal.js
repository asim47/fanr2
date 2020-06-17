import React, { Component, useState, useEffect } from "react";
import Menu from "./Menu";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  Picker,
  AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Overlay from "react-native-modal-overlay";
import { DatePicker, Item } from "native-base";
import { useStateValue } from "./state";
import Axios from "axios";
import { api } from "./Api";

const ModalExample = function(props) {
  const [modalVisible, setmodalVisible] = useState(true);

  onClose = () => setmodalVisible(false);
  return (
    <Overlay
      visible={true}
      onClose={() => {
        props.onClose && props.onClose();
      }}
      // closeOnTouchOutside
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
              top: 0,
              width: 40,
              zIndex: 999,
              backgroundColor: "transparent",
              textAlign: "center",
              alignItems: "center"
            }}
            onPress={hideModal}
          >
            <Icon name="times" size={25} color="#000" />
          </TouchableOpacity>
          <Text
            style={{
              marginBottom: 10,
              fontWeight: "bold"
            }}
          >
            Advance Search
          </Text>
          <TextInput
            placeholder="Subject"
            style={{
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              maxWidth: "100%",
              marginLeft: 10
            }}
            value={searchKeyword}
            onChangeText={val => setSearchKeyword(val)}
          />
          <View>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined, padding: 0 }}
              placeholder="Select Type"
              placeholderStyle={{
                color: "#ccc"
              }}
              placeholderIconColor="#007aff"
              selectedValue={selected2}
              onValueChange={value => onValueChange2(value)}
            >
              <Picker.Item
                label="Workflow Type"
                value=""
                color="#ccc"
                style={{ padding: 0 }}
              />
              {workFlowTypeArr.map(item => {
                return (
                  <Picker.Item
                    label={item.title}
                    value={item.wfid}
                    color="#ccc"
                    key={item.wfid}
                    style={{ padding: 0 }}
                  />
                );
              })}
            </Picker>
          </View>
          <TextInput
            placeholder="Reference Number "
            style={{
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginLeft: 10
            }}
            value={reference}
            onChangeText={val => setReference(val)}
          />
          <TextInput
            placeholder="Communication Type "
            style={{
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginLeft: 10
            }}
            value={communicationType}
            onChangeText={val => setcommunicationType(val)}
          />
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <View>
              <DatePicker
                defaultDate={initiationDateFrom}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={
                  false
                    ? `${initiationDateFrom.toLocaleDateString()}`
                    : "Initiation Date From"
                }
                placeHolderTextStyle={{
                  color: "#ccc",
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  padding: 0,
                  marginRight: 35,
                  fontSize: 14
                }}
                textStyle={{
                  padding: 0
                }}
                onDateChange={date => setInitiationDateFrom(date)}
                disabled={false}
              />
            </View>
            <View style={{ marginLeft: "auto" }}>
              <DatePicker
                defaultDate={initiationDateTo}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={
                  false
                    ? `${initiationDateTo.toLocaleDateString()}`
                    : "Initiation Date To"
                }
                placeHolderTextStyle={{
                  color: "#ccc",
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  padding: 0,
                  fontSize: 14,
                  paddingRight: 20
                }}
                textStyle={{
                  padding: 0,
                  alignSelf: "flex-end",
                  marginLeft: "auto"
                }}
                onDateChange={date => setInitiationDateTo(date)}
                disabled={false}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <View>
              <DatePicker
                defaultDate={lastActionDateFrom}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={
                  false
                    ? `${lastActionDateFrom.toLocaleDateString()}`
                    : "Last Action Date From"
                }
                placeHolderTextStyle={{
                  color: "#ccc",
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  padding: 0,
                  marginRight: 35,
                  fontSize: 14
                }}
                textStyle={{
                  padding: 0
                }}
                onDateChange={date => setlastActionDateFrom(date)}
                disabled={false}
              />
            </View>
            <View style={{ marginLeft: "auto" }}>
              <DatePicker
                defaultDate={lastActionDateTo}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={
                  false
                    ? `${lastActionDateTo.toLocaleDateString()}`
                    : "Last Action Date To"
                }
                placeHolderTextStyle={{
                  color: "#ccc",
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  padding: 0,
                  fontSize: 14
                }}
                textStyle={{
                  padding: 0,
                  alignSelf: "flex-end",
                  marginLeft: "auto"
                }}
                onDateChange={date => setlastActionDateTo(date)}
                disabled={false}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              performSearch();
              setSearchKeyword("");
              setReference("");
              setcommunicationType("");
              setInitiationDateFrom(null);
              setInitiationDateTo(null);
              setlastActionDateFrom(null);
              setInitiationDateTo(null);
            }}
          >
            <Text
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: "#ccc",
                textAlign: "center",
                padding: 10
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Overlay>
  );
};
export default ModalExample;
