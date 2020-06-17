import React from "react"
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Inbox from "./Inbox";
import Notification from "./Notification";
// import InnerMail from "./InnerMail";
import InnerMail from "./Innermails"
import Account from "./Account";
import TaskDetailsHeader from "./TaskDetailsHeader"
import AuthLoadingScreen from "./AuthLoadingScreen";
const AppStack = createStackNavigator({
  Inbox: {
    screen: Inbox,
    navigationOptions: {
      header: null
    }
  },
  Notification: {
    screen: Notification,
    navigationOptions: {
      header: null
    }
  },

  InnerMail: {
    screen: InnerMail,
    navigationOptions: {
      header: null
    }
  },

  Account: {
    screen: Account,
    navigationOptions: {
      header: null
    }
  }
});

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null
    }
  }
});

const AppState = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default AppState;
