import React from "react";

import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStateValue } from "./state";
import Overlay from "react-native-modal-overlay";
import Axios from "axios";
import { api } from "./Api";

class App extends React.PureComponent {
  state = {
    menuType: "",
    showModalOptions: false,
    categoryList: [],
    sessionKey: ""
  };
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  fetchCategories = id => {
    Axios.post(`${api}/cms/rest/inbox/category/list`, {
      sessionKey: id
    }).then(res => this.setState({ categoryList: res.data.resultList }));

    // this.setState({ categoryList: result.data.resultList });
  };

  moveTask = id => {
    Axios.post(`${api}/cms/rest/inbox/category/moveTasks`, {
      sessionKey: this.state.sessionKey,
      id: id,
      taskIdList: [this.props.taskid]
    }).then(res => alert("Moved Successfully"));
  };

  onCloseModalOptions = () => {
    this.setState({ showModalOptions: false });
  };

  componentDidMount() {
    AsyncStorage.getItem("userData").then(token => {
      this.fetchCategories(JSON.parse(token).session);
      this.setState({ sessionKey: JSON.parse(token).session });
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999
        }}
      >
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity
              onPress={this.showMenu}
              style={{
                zIndex: 999
              }}
            >
              <Icon name="ellipsis-v" color="gray" style={styles.iconSearch2} />
            </TouchableOpacity>
          }
        >
          {/* <MenuItem
            onPress={() => {
              this.hideMenu();
              this.setState({ menuType: "sync" });
            }}
          >
            Sync
          </MenuItem> */}
          <MenuItem
            onPress={() => {
              this.hideMenu();
              this.setState({ showModalOptions: true }, () =>
                this.setState({ menuType: "moveto" })
              );
            }}
          >
            Move To
          </MenuItem>
        </Menu>

        {true && (
          <Overlay
            visible={this.state.showModalOptions}
            onClose={() => {
              this.onCloseModalOptions();
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
                  width: "100%"
                }}
              >
                <TouchableOpacity
                  onPress={hideModal}
                  style={
                    this.props.language === "en"
                      ? {
                        position: "absolute",
                        right: 0,
                        top: -20,
                        color: "#000",
                        height: 40,
                        width: 40
                      }
                      : {
                        position: "absolute",
                        left: 0,
                        top: -20,
                        color: "#000",
                        height: 40,
                        width: 40
                      }
                  }
                >
                  <Icon
                    name="times"
                    size={25}
                    color="#ccc"
                    style={{ padding: 10 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    paddingBottom: 20,
                    fontWeight: "bold"
                  }}
                >
                  {this.props.language === "en" ? "Folders" : "مجلد"}
                </Text>
                <React.Fragment>
                  <ScrollView
                    style={{
                      flexDirection: "column",
                      width: "100%",
                      height: 400,
                      marginBottom: 30
                    }}
                  >
                    {this.state.categoryList?.map((every, index) => (
                      <ScrollView key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            this.moveTask(every.id);
                            this.setState({ showModalOptions: false });
                          }}
                          style={{
                            alignSelf:
                              this.props.language === "en"
                                ? "flex-start"
                                : "flex-end"
                          }}
                        >
                          <Text
                            style={{
                              marginBottom: 10,
                              fontWeight: "bold",
                              color: "grey"
                            }}
                          >
                            {every.title}
                          </Text>
                        </TouchableOpacity>
                      </ScrollView>
                    ))}
                  </ScrollView>
                </React.Fragment>
              </View>
            )}
          </Overlay>
        )}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
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
    fontSize: 20
  },
  iconSearch2: {
    fontSize: 20,
    width: 20,
    textAlign: "right",
    zIndex: 999,
    paddingLeft: 10
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
