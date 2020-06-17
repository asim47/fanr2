import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button
} from "react-native";
import Content from "./Content";
import Icon from "react-native-vector-icons/FontAwesome";
import image from "./assets//images/react.png";
import Modal, { SlideAnimation, ModalContent } from "react-native-modals";
import { lang } from "moment";
import { useStateValue } from "./state";
import Axios from "axios";
import { api } from "./Api";



const Notification = (props) => {
  const [
    {
      calResponse,
      userDataPayload,
      taskDetailPayload,
      currentInboxListForPayload,
      languagePayload
    },
    dispatch
  ] = useStateValue();
  const [NotiData, setNotiData] = useState(null)
  // const userDataPayload ={
  //   session:"miasiab avsaysva sauysv aus jvas"
  // }


  useEffect(() => {
    GetNoti()
  }, [])

  async function GetNoti() {
    let res = await Axios.post(api + "/cms/rest/pushNotification/getUserNotifications", {
      sessionKey: userDataPayload ? userDataPayload.session : ""
    });

    console.log(res.data)

    if(res.data.status == "SUCCESS"){
      setNotiData(res.data.resultList)
    }else{
      setNotiData(null)
    }
  }
  return (
    <View style={styles.container}>
      {/*Top */}
      <View
        style={
          props.language === "en"
            ? styles.secondContainer
            : styles.secondContainera
        }
      >
        <View>
          <Image
            source={image}
            style={styles.image}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View>
          <Text style={styles.inboxText}>
            {props.language === "en" ? "Notifications" : "إشعارات"}
          </Text>
        </View>
        <View style={styles.bell}>
          <Icon
            name="bell"
            size={20}
            color="gray"
            onPress={() => props.setCurrentTab(1)}
          />
        </View>
        <View>
          <Text
            style={
              props.language === "en" ? styles.badge : styles.badgea
            }
            onPress={() => props.setCurrentTab(1)}
          >
           { NotiData ? NotiData.length :0}
          </Text>
        </View>
      </View>

      {/*Notification */}
      <ScrollView>
       {
         NotiData?.map((value)=>{
           return  <Content value={value} />
         })
       }
       {/* <View>
         <Text>
           {JSON.stringify(NotiData)}
         </Text>
       </View> */}
      </ScrollView>


    </View>
  );
}
// Modal Popup state

const styles = StyleSheet.create({
  container: {
    // paddingTop: 0,
    marginBottom: 25,
    height: "100%"
  },
  secondContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  secondContainera: {
    display: "flex",
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  thirdContainer: {
    flexDirection: "row"
  },
  mainContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 20
  },
  bell: {
    marginLeft: "auto",
    flexDirection: "row"
  },
  inboxText: {
    fontSize: 15,
    paddingLeft: 5
  },
  badge: {
    color: "#fff",
    backgroundColor: "red",
    borderRadius: 100,
    paddingHorizontal: 5,
    position: "absolute",
    right: 0,
    top: -7,
    fontSize: 10
  },
  badgea: {
    color: "#fff",
    backgroundColor: "red",
    borderRadius: 100,
    paddingHorizontal: 5,
    position: "absolute",
    left: 0,
    top: -7,
    fontSize: 10
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 10
  },
  date: {
    color: "#ccc",
    paddingRight: 15
  },
  secondaryText: {
    color: "#ccc"
  }
});





export default Notification






{/* Modal Popup */ }
{/* <Button
          title="Show Modal"
          onPress={() => {
            setState({ visible: true });
          }}
        />
        <Modal
          visible={state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
          style={{ width: "100%", alignItems: "stretch", height: "100%" }}
        >
          <ModalContent
            style={{ backgroundColor: "red", padding: 0, width: "100%" }}
          >
            <Text style={{ width: "100%" }}>Hello</Text>
            <Text style={{ width: "100%" }}>Hello</Text>
            <Text style={{ width: "100%" }}>Hello</Text>
            <Text style={{ width: "100%" }}>Hello</Text>
            <Text style={{ width: "100%" }}>Hello</Text>
            <Text style={{ width: "100%" }}>Hello</Text>
            <Text style={{ width: "100%" }}>Hello</Text>
            <Text style={{ width: "100%" }}>Hello</Text>
          </ModalContent>
        </Modal> */}