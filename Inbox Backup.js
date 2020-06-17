import React, { Component, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import image from "./assets//images/react.png";
import Icon from 'react-native-vector-icons/FontAwesome';
import InboxContent from './InboxContent';
import Modal from './Modal';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Inbox = function (props) {


  const [showModal, setShowModal] = React.useState(false)
  const { navigate } = props.navigation;


  const onBellClick = function () {
    setShowModal(true)
  }

 const onClose = function(){
  setShowModal(false)
 } 

  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>
        <View>
          <Image source={image} style={styles.image} style={{ width: 20, height: 20 }} />

        </View>
        <View>
          <Text style={styles.inbox}>Inbox</Text>
        </View>
        <View style={styles.icon}>
          <Icon name="bell" size={20} color="gray" style={styles.iconText} onPress={() => onBellClick()} />
        </View>
        <View>
          <Text style={styles.number} onPress={() => onBellClick()}>5</Text>
        </View>

      </View>

      <View style={styles.secondaryContainer}>
        <View>
          <Icon name="search" size={20} color="gray" />
        </View>
        <View>
          <TextInput placeholder="Search All Options" style={{ paddingLeft: 10 }} />
        </View>
        <View style={styles.icon}>
          <Icon name="search-plus" size={30} color="gray" style={styles.iconSearch} />
          <Icon name="align-center" size={30} color="gray" style={styles.iconSearch2} />
        </View>

      </View>

      {/*Bottom Content */}
      <ScrollView>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((ev, index) => (
          <TouchableOpacity key={index} onPress={() =>navigate('Notification')} ><InboxContent /></TouchableOpacity>
        ))}

      </ScrollView>
      {showModal && <Modal open={showModal} onClose={() => onClose()} />}
    </View >
  )
}

export default Inbox



const styles = StyleSheet.create({

  container: {
    paddingTop: 40,
    height: "100%",
  },
  image: {
    width: 30,
    height: 30
  },
  secondaryContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
    position: "relative",
    paddingHorizontal: 15
  },
  thirdContainer: {
    flexDirection: 'row',
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
    flex: 1,
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
    fontSize: 10,
  },
  searchIcon: {
    fontSize: 20,
    fontWeight: "normal",
  },
  iconSearch: {
    textAlign: "right",
    transform: [{ rotate: '90deg' }],
    position: "absolute",
    top: 0,
    right: 20,
    fontSize: 20,
  },
  iconSearch2: {
    textAlign: "right",
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 20,
  },
  bottom: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 999,
    backgroundColor: "#fff",
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
    display: "flex",

  }


});
