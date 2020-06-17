/** @format */

import React from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  TouchableWithoutFeedback,
  RefreshControl,
  Dimensions
} from "react-native";

import { Table, TableWrapper, Row } from "react-native-table-component";
import { useState, useEffect } from "react";
import { Tab, TabView } from "react-native-easy-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
//import Inbox from './Inbox';
import Notification from "./Notification";
import Search from "./Search";
import InboxContent from "./InboxContent";
import Modal from "./Modal";
import ModalOptions from "./ModalOptions";
import Categories from "./Categories";
import image from "./assets/images/react.png";
import Axios from "axios";
import { api } from "./Api";
import { useStateValue } from "./state";
import image2 from "./assets/images/volume.png";
import image3 from "./assets/images/searchsetting.png";
import image4 from "./assets/images/clock.png";
import image5 from "./assets/images/warn.png";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Account from "./Account";
import Menu from "./Menu";
import InnerMail from "./InnerMail";
import Overlay from "react-native-modal-overlay";

const Options = [
  {
    opt: "Claimed Correspondences",
    ar: "مطالبات المراسلات",
    Listfor: "claimedTasks"
  },
  {
    opt: "Employee Correspondences",
    ar: "مراسلات الموظفين",
    Listfor: "employeeTasks"
  },
  {
    opt: "Initiated Correspondences",
    ar: "بدأت المراسلات ",
    Listfor: "initiatedTasks"
  },
  {
    opt: "Open Correspondences",
    ar: "المراسلات المفتوحة",
    Listfor: "openedTasks"
  },
  {
    opt: "Participated Tasks",
    ar: "المهام المشاركة",
    Listfor: "participatedTasks"
  },
  { opt: "Saved Tasks", ar: "المهام المحفوظة", Listfor: "savedTasks" },
  // { opt: "Completed Tasks", ar: "", Listfor: "المهام المنجزة" },
  { opt: "All Tasks", ar: "", Listfor: "allTasks" }
];

const StatOptions = [
  // {
  //   opt: "Approved Statistics",
  //   ar: "الاحصائيات المعتمدة",
  //   Listfor: "approvedStatistics"
  // },
  {
    opt: "Correspondence Management Statistics",
    ar: "الاحصائيات المعتمدة",
    Listfor: "creationStatistics"
  }
];

const MyScreen = function (props) {
  const {
    referenceid,
    priority,
    taskstatus,
    workflowtitle,
    submiteddate,
    tasktitle
  } = props;


  const [currentTab, setCurrentTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [tasksList, settasksList] = useState([]);
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [showCategories, setshowCategories] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [userData, setUserData] = useState("");
  const [latestdata, setlatestdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log("tasksList", tasksList);

  useEffect(() => {
    if (searchTerm !== "") {
      let array = tasksList;
      // console.log("datas", array);
      settasksList(array.filter(arr => arr.referenceid.includes(searchTerm)));
    } else {
      settasksList(temp);
    }
  }, [searchTerm]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryCrud, setCategoryCrud] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState(false);
  const [statEndPoint, setStatEndPoint] = useState("approvedStatistics");
  const [statDetails, setStatDetails] = useState(false);
  const [statsList, setStatsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");
  const [temp, setTemp] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [session, setsession] = useState("");
  const [defaultSelected, setDefaultSelected] = useState(true);
  const [Refreshs, setRefreshs] = useState(false);
  const [tableHead, settableHead] = useState([
    "Workflow Type",
    "Total Created",
    "Reviewed",
    "Rejected",
    "Pending with Requester",
    "Pending with Approver(s)"
  ]);

  const [widthArr, setwidthArr] = useState([160, 70, 70, 70, 70, 70]);

  const { navigate } = props.navigation;
  const paramTab = JSON.stringify(props.navigation.getParam("tab"));
  if (paramTab && parseInt(paramTab) !== currentTab) {
    setCurrentTab(parseInt(paramTab));
  }

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
  // console.log("goback",props);
  // const userDataPayload ={
  //   session:"miasiab avsaysva sauysv aus jvas"
  // }
  useEffect(() => {

    emptyRefresh();
  }, [props]);
  function handelRefresh() {
    setRefreshs(true);
    Promise.all([emptyRefresh()]).then(() => {
      setRefreshs(false);
    });
  }
  const emptyRefresh = () => {
    let didCancel = false;
    async function fetchMyAPI() {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        // ...Ionicons.font
      });

      if (!didCancel) {
        setIsReady(true);
      }
    }

    async function _bootstrapAsync() {
      const userData = await AsyncStorage.getItem("userData");
      const language = await AsyncStorage.getItem("language");

      setLanguage(JSON.parse(language));

      dispatch({
        type: "userData",
        userDataPayload: JSON.parse(userData)
      });

      fetchClaimedTasks(JSON.parse(userData).session);

      async function fetchClaimedTasks(id) {
        setLoading(true);

        let EndPoint = Number(currentInboxListForPayload)
          ? `category/getCategoryTasks`
          : currentInboxListForPayload;

        let params = Number(currentInboxListForPayload)
          ? {
            sessionKey: userDataPayload ? userDataPayload.session : id,
            startRow: 0,
            endRow: 1000,
            id: currentInboxListForPayload
          }
          : {
            sessionKey: userDataPayload ? userDataPayload.session : id,
            startRow: 0,
            endRow: 1000
          };

        const result = await Axios.post(
          `${api}/cms/rest/inbox/${EndPoint}`,
          params
        );

        if (!result.data.status) {
          // props.navigation.navigate("Auth")
        }
        // console.log(result.data,"INBOX")
        fetchCategories(JSON.parse(userData).session);

        fetchStats("approvedStatistics", JSON.parse(userData).session);

        if (!didCancel) {
          settasksList(result.data.resultList || []);
          setTemp(result.data.resultList || []);
        }

        setLoading(false);
      }
      if (!didCancel) {
        setUserData(JSON.parse(userData) ? JSON.parse(userData).session : "");
      }
    }

    _bootstrapAsync();
    // _bootstrapAsync.fetchClaimedTasks()

    if (!didCancel) {
      onCloseModalOptions();
    }

    fetchMyAPI();
    return () => {
      didCancel = true;
    };
  };

  useEffect(() => {
    emptyRefresh();
  }, [currentInboxListForPayload, userData, languagePayload, rerender]);

  async function fetchTasks(
    searchKeyword,
    selected2,
    reference,
    communicationType,
    initiationDateFrom,
    initiationDateTo,
    lastActionDateFrom,
    lastActionDateTo
  ) {
    const formatDate = async dateActual => {
      var date = new Date(dateActual);
      var dateString = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      return dateString;
    };
    if (!userDataPayload.session) {
      // navigate("Auth")
    }
    let Session = userDataPayload.session
      ? userDataPayload.session
      : "";

    if (!userDataPayload.session) {
      // props.navigation.navigate("Auth")
    }
    const result = await Axios.post(
      api + "/cms/rest/inbox/search/getResults",
      {
        // sessionKey: (userDataPayload) ? (userDataPayload.session) : "TXvZDP4qrfs03VOzhQIak53yRlILtn256dLSwBVwKIFY3HGYA5wzZdeG2G8AiuyvoIkOkre6tgF7",
        sessionKey: Session,
        title: searchKeyword,
        reference: reference,
        type: `${selected2}`,
        initiatedDateFrom: initiationDateFrom
          ? await formatDate(initiationDateFrom)
          : "",
        initiatedDateTo: initiationDateTo
          ? await formatDate(initiationDateTo)
          : "",
        startRow: 0,
        endRow: 100
      }
    );
    if (!result.data.status) {
      // props.navigation.navigate("Auth")
    }
    settasksList(result.data.resultList || []);
    setTemp(result.data.resultList || []);


    setDefaultSelected(false);

    onClose();
  }

  const onBellClick = function () {
    setSearchTerm("");
    setShowModal(true);
  };

  const onClose = function () {
    setShowModal(false);
  };

  const onClickModalOptions = function () {
    setShowModalOptions(true);
  };

  const onCloseModalOptions = function () {
    setShowModalOptions(false);
  };

  const onClickCategories = function () {
    setshowCategories(true);
  };

  const onCloseCategories = function () {
    setshowCategories(false);
  };

  async function fetchCategories(id) {
    const result = await Axios.post(`${api}/cms/rest/inbox/category/list`, {
      sessionKey: userDataPayload ? userDataPayload.session : id
    });
    if (!result.data.status) {
      // props.navigation.navigate("Auth")
    }
    setCategoryList(result.data.resultList);
  }

  async function DeleteCategory(id) {
    const result = await Axios.post(`${api}/cms/rest/inbox/category/delete`, {
      sessionKey: userDataPayload ? userDataPayload.session : "",
      id: id
    });
    if (!result.data.status) {
      // props.navigation.navigate("Auth")
    }
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
    if (!result.data.status) {
      // props.navigation.navigate("Auth")
    }
    fetchCategories(userDataPayload.session);
    setTitle("");
    setDescription("");
    alert("Successful");
  }

  const validateForm = function () {
    return title && description ? true : false;
  };

  async function fetchStats(stat, key) {
    console.log("Inboxkey", `${api}/cms/rest/inbox/${stat}`);

    try {
      const result = await Axios.post(`${api}/cms/rest/inbox/${stat == "approvedStatistics" ? "approvedStatistics" : "cmsStatistics"}`, {
        sessionKey: userDataPayload.session
      });


      console.log("APi res", JSON.stringify(result.data));
      if (!result.data.status) {
        // props.navigation.navigate("Auth")
      } else {
        setStatsList(result.data.resultList);

      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!isReady) {
    return <AppLoading autoHideSplash={false} />;
  }
  // const results = Axios.post(api+"/cms/rest/inbox/allTasks", { "sessionKey": "q60XYcVE2sKaRkBN22pzMwXx8bXQjgCUSJ8VtkdbmMeEIkkEKmLqgFA36BGp2Ra9v4frosb3Krt", "startRow": 0, "endRow": 100 }).then((res) => {
  //   setlatestdata(res.data.resultList || [])

  // }).catch((e) => {
  //   console.log("erro", e);
  // })
  // console.log("reultss", results);
  // console.log("tastlist", tasksList);

  // if (userDataPayload.session !== null || userDataPayload.session !== undefined) {
  //   AsyncStorage.setItem("Session", userDataPayload.session).then((res) => {
  //     console.log("sedsvsdvssion", res)
  //   })

  // } else {
  //   AsyncStorage.setItem("Session", userDataPayload.session).then((res) => {
  //     console.log("sedsvsdvssion", res)
  //   })
  // }
  // dispatch({
  //   type: "currentInboxListFor",
  //   currentInboxListForPayload: "allTasks"
  // })
  return (
    <View
      style={{ paddingTop: 40, height: "100%", zIndex: 999, paddingBottom: 80 }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 0,
          zIndex: 999,
          borderTopColor: "#ccc",
          borderTopWidth: 1
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            flex: 1,
            alignItems: "center",
            borderRightWidth: 1,
            borderRightColor: "#ccc"
          }}
          activeOpacity={1}
          onPress={() => setCurrentTab(0)}
        >
          <Icon
            name="envelope"
            size={20}
            color="#ccc"
            onPress={() => setCurrentTab(0)}
            style={{ color: currentTab === 0 ? "#000" : "#bbb" }}
          />
          <Text
            onPress={() => setCurrentTab(0)}
            style={{ color: currentTab === 0 ? "#000" : "#bbb" }}
          >
            {" "}
            {language === "en" ? "Inbox" : "صندوق الوارد"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            flex: 1,
            alignItems: "center",
            borderRightWidth: 1,
            borderRightColor: "#ccc"
          }}
          activeOpacity={1}
          onPress={() => setCurrentTab(1)}
        >
          <Icon
            name="bell"
            size={20}
            color="#ccc"
            onPress={() => setCurrentTab(1)}
            style={{ color: currentTab === 1 ? "#000" : "#bbb" }}
          />
          <Text
            onPress={() => setCurrentTab(1)}
            style={{ color: currentTab === 1 ? "#000" : "#bbb" }}
          >
            {" "}
            {language === "en" ? "Notifications" : "إشعارات"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            flex: 1,
            alignItems: "center",
            borderRightWidth: 1,
            borderRightColor: "#ccc"
          }}
          activeOpacity={1}
          onPress={() => setCurrentTab(2)}
        >
          <Icon
            name="search-plus"
            size={20}
            color="#ccc"
            onPress={() => setCurrentTab(2)}
            style={{ color: currentTab === 2 ? "#000" : "#bbb" }}
          />
          <Text
            onPress={() => setCurrentTab(2)}
            style={{ color: currentTab === 2 ? "#000" : "#bbb" }}
          >
            {" "}
            {language === "en" ? "Search" : "تفتيش"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            flex: 1,
            alignItems: "center",
            borderRightWidth: 1,
            borderRightColor: "#ccc"
          }}
          activeOpacity={1}
          onPress={() => setCurrentTab(3)}
        >
          <Icon
            name="user"
            size={20}
            color="#ccc"
            onPress={() => setCurrentTab(3)}
            style={{ color: currentTab === 3 ? "#000" : "#bbb" }}
          />
          <Text
            onPress={() => setCurrentTab(3)}
            style={{ color: currentTab === 3 ? "#000" : "#bbb" }}
          >
            {" "}
            {language === "en" ? "Profile" : "الملف الشخصي"}
          </Text>
        </TouchableOpacity>
      </View>

      <TabView selectedTabIndex={currentTab}>
        <Tab>
          <View>
            <View
              style={
                language === "en"
                  ? styles.secondaryContainer
                  : styles.secondaryContainera
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
                <Text style={styles.inbox}>
                  {language === "en" ? "Inbox" : "صندوق الوارد"}
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="bell"
                  size={20}
                  color="gray"
                  style={language === "en" ? styles.iconText : styles.iconTexta}
                  onPress={() => setCurrentTab(1)}
                />
              </View>
              <View>

                {async () => {
                  let res = await Axios.post(api + "/cms/rest/pushNotification/getUserNotifications", {
                    sessionKey: userDataPayload ? userDataPayload.session : ""
                  });

                  if (res.data.status == "SUCCESS") {
                    // setNotiData(res.data.resultList)
                    return (
                      <Text
                        style={language === "en" ? styles.number : styles.numbera}
                        onPress={() => setCurrentTab(1)}
                      >
                        {res?.data?.resultList?.length}
                      </Text>
                    )
                  } else {
                    return null
                  }
                }}
              </View>
            </View>

            <View
              style={
                language === "en"
                  ? styles.secondaryContainer
                  : styles.secondaryContainera
              }
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: language === "en" ? "row" : "row-reverse"
                }}
              >
                <View>
                  <Icon name="search" size={20} color="gray" />
                </View>
                <View>
                  <TextInput
                    placeholder={
                      language === "en"
                        ? "Search All Options"
                        : "ابحث في كل الخيارات"
                    }
                    style={{ paddingLeft: 10 }}
                    value={searchTerm}
                    onChange={val => setSearchTerm(val.nativeEvent.text)}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: language === "en" ? "flex-end" : "flex-start"
                }}
              >
                <View
                  style={{
                    flexDirection: language === "en" ? "row" : "row-reverse"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => onBellClick()}
                    style={{ alignSelf: "flex-end" }}
                  >
                    <Image
                      source={image3}
                      style={{ width: 20, height: 20, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onClickModalOptions()}>
                    <Image
                      source={image2}
                      style={{ width: 20, height: 20, alignSelf: "flex-end" }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#d2942f"
                style={{ marginTop: "70%" }}
              />
            ) : null}
            <View style={{ paddingBottom: 180 }}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={Refreshs}
                    onRefresh={handelRefresh}
                  />
                }
              >
                {tasksList.length === 0 && !loading ? (
                  <View
                    style={{
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 10,
                        fontWeight: "bold",
                        marginTop: "70%"
                      }}
                    >
                      {language === "en" ? "No Record Found!" : "لا يوجد سجلات"}
                    </Text>
                  </View>
                ) : null}
                {tasksList &&
                  !loading &&
                  tasksList.map((ev, index) => {
                    return (
                      <View
                        style={{
                          flexDirection:
                            language === "en" ? "row" : "row-reverse"
                        }}
                        key={index}
                      >
                        <View style={{ flex: 4 }}>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch({
                                type: "taskDetail",
                                taskDetailPayload: ev
                              });
                              props.navigation.navigate("InnerMail", {
                                ev: ev,
                                sessionkey: userDataPayload.session
                              });
                            }}
                            style={{ flex: 5 }}
                          >
                            <InboxContent
                              {...ev}
                              setCurrentTab={setCurrentTab}
                              language={language}
                            />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            zIndex: 999,
                            flex: 1,
                            flexDirection:
                              language === "en" ? "row" : "row-reverse",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            borderBottomColor: "#ccc",
                            borderBottomWidth: 1,
                            paddingTop: 10
                          }}
                        >
                          {ev.priority === "Low" ? null : ev.priority ===
                            "Normal" ? (
                              <Image
                                source={image4}
                                style={{
                                  width: 22,
                                  height: 20
                                }}
                              />
                            ) : ev.priority === "High" ? (
                              <Image
                                source={image5}
                                style={{
                                  width: 22,
                                  height: 22
                                }}
                              />
                            ) : null}

                          <Menu taskid={ev.taskid} language={language} />
                        </View>
                      </View>
                    );
                  })}
              </ScrollView>
            </View>
            {true && (
              <Modal
                navigate={navigate}
                open={showModal}
                onClose={() => onClose()}
                fetchTasks={fetchTasks}
              />
            )}
            {/* {showModalOptions && (
              <ModalOptions
                open={showModalOptions}
                onClose={() => onCloseModalOptions()}
              />
            )} */}

            {true && (
              <Overlay
                visible={showModalOptions}
                onClose={() => {
                  onCloseModalOptions();
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
                  <ScrollView style={{width:Dimensions.get("window").width -40}}>
                    <View
                      style={{
                        width: "100%"
                      }}
                    >
                      <TouchableOpacity
                        onPress={hideModal}
                        style={language === "en" ? styles.times : styles.times2}
                      >
                        <Icon
                          name="times"
                          size={25}
                          color="#ccc"
                          style={
                            language === "en"
                              ? { paddingLeft: 40 }
                              : { paddingRight: 40 }
                          }
                        />
                      </TouchableOpacity>

                      {!categoryCrud && (
                        <React.Fragment>
                          <Text
                            style={{
                              marginBottom: 10,
                              fontWeight: "bold"
                            }}
                          >
                            {language === "en" ? "Options" : "خيارات"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                              height: 90,
                              marginBottom: 30,
                              paddingLeft: 5
                            }}
                          >
                            <ScrollView
                              showsVerticalScrollIndicator={true}
                              style={{ paddingRight: 10 }}
                            >
                              {/* {!categoryCrud &&
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
                                    {language === "en" ? every.opt : every.ar}
                                  </Text>
                                </TouchableOpacity>
                              ))} */}
                              {!categoryCrud &&
                                Options.map((every, index) => {
                                  return (
                                    <React.Fragment key={index}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          dispatch({
                                            type: "currentInboxListFor",
                                            currentInboxListForPayload:
                                              every.Listfor
                                          });
                                          setRerender(!rerender);
                                          setShowModalOptions(false);
                                          setDefaultSelected(true);
                                        }}
                                      >
                                        <Text
                                          style={{
                                            marginBottom: 10,
                                            fontWeight: "bold",
                                            color:
                                              every.Listfor ===
                                                currentInboxListForPayload &&
                                                defaultSelected
                                                ? "#d2942f"
                                                : "grey"
                                          }}
                                        >
                                          {language === "en"
                                            ? every.opt
                                            : every.ar}
                                        </Text>
                                      </TouchableOpacity>
                                    </React.Fragment>
                                  );
                                })}
                            </ScrollView>
                          </View>

                          <Text
                            style={{
                              paddingBottom: 20,
                              fontWeight: "bold"
                            }}
                          >
                            {language === "en" ? "Folders" : "مجلد"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                              height: 90,
                              marginBottom: 30,
                              paddingLeft: 5
                              // alignItems:
                              //   language === "en" ? "flex-start" : "flex-end"
                            }}
                          >
                            <ScrollView style={{ paddingRight: 10 }}>
                              {!categoryCrud &&
                                categoryList &&
                                categoryList.map((every, index) => (
                                  <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                      dispatch({
                                        type: "currentInboxListFor",
                                        currentInboxListForPayload: every.id
                                      });
                                      setShowModalOptions(false);
                                    }}
                                  >
                                    <View
                                      style={{
                                        alignItems:
                                          language === "en"
                                            ? "flex-start"
                                            : "flex-end"
                                      }}
                                    >
                                      <Text
                                        style={{
                                          marginBottom: 10,
                                          fontWeight: "bold",
                                          color:
                                            every.id ===
                                              currentInboxListForPayload
                                              ? "#d2942f"
                                              : "grey"
                                        }}
                                      >
                                        {every.title}
                                      </Text>
                                    </View>
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
                            {language === "en" ? "Statistics" : "الإحصاء"}
                          </Text>
                          {!categoryCrud &&
                            StatOptions.map((every, index) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  fetchStats(every.Listfor, userData);
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
                                  {language === "en" ? every.opt : every.ar}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                              // height: statsList?.length === 0 ? "10%" : "30%",
                              marginBottom: 30,
                              borderWidth: 1,
                              borderColor: "#ccc",
                              justifyContent: "center"
                            }}
                          >
                            {statsList?.length !== 0 && (
                              <ScrollView>
                                <ScrollView horizontal={true}>
                                  <View
                                    style={{
                                      flexDirection: "column",
                                      width: 600
                                    }}
                                  >
                                    <View
                                      style={{
                                        flexDirection:
                                          language === "en"
                                            ? "row"
                                            : "row-reverse",
                                        backgroundColor: "#ddd",
                                        width: "100%"
                                      }}
                                    >
                                      <Text
                                        style={{
                                          paddingLeft: 10,
                                          paddingTop: 7,
                                          paddingBottom: 7,
                                          fontWeight: "bold",
                                          color: "#202020",
                                          marginRight: 10,
                                          flex: 4
                                        }}
                                      >
                                        {language === "en"
                                          ? "Workflow Type"
                                          : "نوع سير العمل"}
                                      </Text>
                                      <Text
                                        style={{
                                          paddingTop: 7,
                                          paddingBottom: 7,
                                          fontWeight: "bold",
                                          color: "#202020",
                                          marginRight: 10,
                                          flex: 2
                                        }}
                                      >
                                        {language === "en"
                                          ? "Total Created"
                                          : "مجموع خلق"}
                                      </Text>
                                      <Text
                                        style={{
                                          paddingTop: 7,
                                          paddingBottom: 7,
                                          fontWeight: "bold",
                                          color: "#202020",
                                          marginRight: 10,
                                          flex: 2
                                        }}
                                      >
                                        {language === "en"
                                          ? "Approved/Reviewed"
                                          : "وافق / التعليق"}
                                      </Text>
                                      <Text
                                        style={{
                                          paddingTop: 7,
                                          paddingBottom: 7,
                                          fontWeight: "bold",
                                          color: "#202020",
                                          marginRight: 10,
                                          flex: 2
                                        }}
                                      >
                                        {language === "en" ? "Rejected" : "مرفوض"}
                                      </Text>
                                      <Text
                                        style={{
                                          paddingTop: 7,
                                          paddingBottom: 7,
                                          fontWeight: "bold",
                                          color: "#202020",
                                          marginRight: 10,
                                          flex: 2
                                        }}
                                      >
                                        {language === "en"
                                          ? "Pending with requestor"
                                          : "في انتظار مع الطالب"}
                                      </Text>
                                      <Text
                                        style={{
                                          paddingTop: 7,
                                          paddingBottom: 7,
                                          fontWeight: "bold",
                                          color: "#202020",
                                          marginRight: 10,
                                          flex: 2
                                        }}
                                      >
                                        {language === "en"
                                          ? "Pending with approver"
                                          : "في انتظار مع الموافقة"}
                                      </Text>
                                    </View>
                                    {true &&
                                      statsList?.length !== 0 &&
                                      statsList?.map((every, index) => (
                                        <TouchableWithoutFeedback key={index}>
                                          <View
                                            style={{
                                              flexDirection:
                                                language === "en"
                                                  ? "row"
                                                  : "row-reverse",
                                              borderWidth: 1,
                                              borderColor: "#ccc",
                                              borderStyle: "solid",
                                              width: "100%"
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
                                                flex: 4
                                              }}
                                            >
                                              {every.workflowTitle}
                                            </Text>
                                            <View
                                              style={{
                                                flex: 2,
                                                alignItems:
                                                  language === "en"
                                                    ? "flex-start"
                                                    : "center"
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  paddingTop: 7,
                                                  paddingBottom: 7,
                                                  fontWeight: "bold",
                                                  color: "grey"
                                                }}
                                              >
                                                {every.totalCreated}
                                              </Text>
                                            </View>
                                            <View
                                              style={{
                                                flex: 2,
                                                alignItems:
                                                  language === "en"
                                                    ? "flex-start"
                                                    : "center"
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  paddingTop: 7,
                                                  paddingBottom: 7,
                                                  fontWeight: "bold",
                                                  color: "grey",
                                                  flex: 2
                                                }}
                                              >
                                                {every.approvedOrReviewed}
                                              </Text>
                                            </View>

                                            <View
                                              style={{
                                                flex: 2,
                                                alignItems:
                                                  language === "en"
                                                    ? "flex-start"
                                                    : "center"
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  paddingTop: 7,
                                                  paddingBottom: 7,
                                                  fontWeight: "bold",
                                                  color: "grey",
                                                  flex: 2
                                                }}
                                              >
                                                {every.rejected}
                                              </Text>
                                            </View>

                                            <View
                                              style={{
                                                flex: 2,
                                                alignItems:
                                                  language === "en"
                                                    ? "flex-start"
                                                    : "center"
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  paddingTop: 7,
                                                  paddingBottom: 7,
                                                  fontWeight: "bold",
                                                  color: "grey",
                                                  flex: 2
                                                }}
                                              >
                                                {every.pending}
                                              </Text>
                                            </View>
                                            <View
                                              style={{
                                                flex: 2,
                                                alignItems:
                                                  language === "en"
                                                    ? "flex-start"
                                                    : "center"
                                              }}
                                            >
                                              <Text
                                                style={{
                                                  paddingTop: 7,
                                                  paddingBottom: 7,
                                                  fontWeight: "bold",
                                                  color: "grey",
                                                  flex: 2
                                                }}
                                              >
                                                {every.pendingWithApprovar}
                                              </Text>
                                            </View>
                                          </View>
                                        </TouchableWithoutFeedback>
                                      ))}
                                  </View>
                                </ScrollView>
                              </ScrollView>
                            )}
                            {statsList?.length === 0 && (
                              <View
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center"
                                }}
                              >
                                <Text>
                                  {language === "en"
                                    ? "No Record Found"
                                    : "لا يوجد سجلات"}
                                </Text>
                              </View>
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                              marginTop: -15
                            }}
                          >
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
                                  {language === "en"
                                    ? "Create/Edit Category"
                                    : "خلق/تعديل الفئة"}
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
                            {language === "en"
                              ? "Creating Category"
                              : "إنشاء الفئة"}
                          </Text>

                          <View
                            style={{ flexDirection: "column", width: "100%" }}
                          >
                            {categoryCrud && (
                              <View
                                style={{
                                  flexDirection:
                                    language === "en" ? "row" : "row-reverse",
                                  backgroundColor: "#000"
                                }}
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
                                  {language === "en" ? "Title" : "عنوان"}
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
                                  {language === "en" ? "Description" : "وصف"}
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
                                  {language === "en" ? "Edit" : "تعديل"}
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
                                  {language === "en" ? "Delete" : "حذف"}
                                </Text>
                              </View>
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              width: "100%",
                              height: 250
                            }}
                          >
                            <ScrollView>
                              {categoryCrud &&
                                categoryList.map((every, index) => (
                                  <TouchableWithoutFeedback key={index}>
                                    <View
                                      style={{
                                        flexDirection:
                                          language === "en"
                                            ? "row"
                                            : "row-reverse",
                                        backgroundColor: "#ddd"
                                      }}
                                    >
                                      <View
                                        style={{
                                          flex: 2,
                                          alignItems:
                                            language === "en"
                                              ? "flex-start"
                                              : "flex-end"
                                        }}
                                      >
                                        <Text
                                          style={{
                                            paddingTop: 7,
                                            paddingBottom: 7,
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                            fontWeight: "bold",
                                            color: "grey"
                                          }}
                                        >
                                          {every.title}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          alignItems:
                                            language === "en"
                                              ? "flex-start"
                                              : "flex-end",
                                          flex: 3,
                                          paddingTop: 7,
                                          paddingBottom: 7,
                                          paddingLeft: 10,
                                          paddingRight: 10
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontWeight: "bold",
                                            color: "grey"
                                          }}
                                        >
                                          {every.description}
                                        </Text>
                                      </View>
                                      <Icon
                                        name="edit"
                                        size={20}
                                        color="#ccc"
                                        // onPress={() => {
                                        //   setTitle(every.title);
                                        //   setDescription(every.description);
                                        //   setEditId(every.id);
                                        //   setEditCategory(false);
                                        // }}
                                        style={
                                          language === "en"
                                            ? {
                                              color: "#d2942f",
                                              marginRight: 0,
                                              paddingTop: 7,
                                              paddingBottom: 7,
                                              flex: 1
                                            }
                                            : {
                                              color: "#d2942f",
                                              marginLeft: 0,
                                              paddingTop: 7,
                                              paddingBottom: 7,
                                              flex: 1
                                            }
                                        }
                                      />

                                      <Icon
                                        name="trash"
                                        size={20}
                                        color="#ccc"
                                        onPress={() => DeleteCategory(every.id)}
                                        style={
                                          language === "en"
                                            ? {
                                              color: "#d2942f",
                                              flex: 1,
                                              paddingTop: 7,
                                              paddingBottom: 7
                                            }
                                            : {
                                              color: "#d2942f",
                                              flex: 1,
                                              paddingTop: 7,
                                              paddingBottom: 7,
                                              marginLeft: 30
                                            }
                                        }
                                      />
                                    </View>
                                  </TouchableWithoutFeedback>
                                ))}
                            </ScrollView>
                          </View>

                          <View
                            style={{ flexDirection: "column", width: "100%" }}
                          >
                            {categoryCrud && (
                              <View
                                style={{ flexDirection: "column", marginTop: 30 }}
                              >
                                <Text>
                                  {" "}
                                  {language === "en" ? "Title" : "عنوان"} *
                              </Text>
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
                                <Text>
                                  {" "}
                                  {language === "en" ? "Description" : "وصف"} *
                              </Text>
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
                                  <View
                                    style={{
                                      alignSelf: "flex-end",
                                      marginRight: 10
                                    }}
                                  >
                                    <Button
                                      title={language === "en" ? "Save" : "حفظ"}
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
                                        } else
                                          alert("Please fill required fields");
                                      }}
                                    />
                                  </View>
                                  <View>
                                    <Button
                                      title={
                                        language === "en" ? "Cancel" : "إلغاء"
                                      }
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


                  </ScrollView>
                )}
              </Overlay>
            )}

            {showCategories && (
              <Categories
                open={showCategories}
                onClose={() => onCloseCategories()}
              />
            )}
          </View>
        </Tab>

        <Tab>
          <View>
            <Notification setCurrentTab={setCurrentTab} language={language} />
          </View>
        </Tab>
        <Tab>
          <View>
            {userDataPayload ? (
              userDataPayload.session !== null &&
                userDataPayload.session !== undefined ? (
                  <Search
                    setCurrentTab={setCurrentTab}
                    language={language}
                    keyy={userDataPayload.session}
                  />
                ) : null
            ) : null}
          </View>
        </Tab>
        <Tab>
          <View>
            {
              userDataPayload?.session ? (
                <Account
                  setCurrentTab={setCurrentTab}
                  navigate={props.navigation}
                  language={language}
                />
              ) : null
            }

          </View>
        </Tab>
      </TabView>
    </View>
  );
};
export default MyScreen;

const styles = StyleSheet.create({
  containerTable: {
    backgroundColor: "#fff"
  },
  header: { height: 50, backgroundColor: "#d2942f" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },

  container: {
    paddingTop: 40,
    height: "100%"
  },
  image: {
    width: 30,
    height: 30
  },
  secondaryContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    paddingHorizontal: 15
  },
  secondaryContainera: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    paddingHorizontal: 15
  },
  thirdContainer: {
    flexDirection: "row",
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    marginTop: 20,
    paddingHorizontal: 15
  },
  inbox: {
    fontSize: 15,
    paddingLeft: 5
  },
  icon: {
    flex: 1
  },
  iconText: {
    textAlign: "right"
  },
  iconTexta: {
    textAlign: "left"
  },
  number: {
    borderRadius: 100,
    color: "#fff",
    backgroundColor: "red",
    paddingHorizontal: 5,
    position: "absolute",
    right: 0,
    top: -7,
    fontSize: 10
  },
  numbera: {
    borderRadius: 100,
    color: "#fff",
    backgroundColor: "red",
    paddingHorizontal: 5,
    position: "absolute",
    left: 0,
    top: -7,
    fontSize: 10
  },
  searchIcon: {
    fontSize: 20,
    fontWeight: "normal"
  },
  iconSearch: {
    textAlign: "right",
    transform: [{ rotate: "90deg" }],
    position: "absolute",
    top: 0,
    right: 20,
    fontSize: 20,
    zIndex: 999
  },

  times: {
    position: "absolute",
    right: 20,
    top: 10,
    height: 60,
    width: 60,
    zIndex: 999
  },

  times2: {
    position: "absolute",
    left: 0,
    right: 20,
    top: 10,
    height: 60,
    width: 60,
    zIndex: 999
  },

  iconSearch2: {
    textAlign: "right",
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 20
  },
  bottom: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 999,
    backgroundColor: "#fff"
  },
  bottomContent: {
    borderRightWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    alignItems: "center",
    paddingBottom: 7
  },
  mid: {
    flexDirection: "row",
    display: "flex"
  }
});
