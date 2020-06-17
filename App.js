/** @format */

import React, { useEffect } from "react";
import AppState from "./AppState";
import { StateProvider } from "./state";
import { SplashScreen } from "expo";

const App = function () {
  const initialState = {
    theme: { primary: "red" },
    calResponse: { primary: {} },
    calSentPayload: { primary: {} },
    addSheetPayload: { primary: {} },
    SheetDataForEditPayload: {},
    userDataPayload: {},
    taskDetailPayload: {},
    currentInboxListForPayload: "allTasks",
    languagePayload: "en",
    dialogProps: {
      open: false,
      varient: "info",
      mainHeading: "",
      message: "",

    }
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "Dialog":

        return {
          ...state,
          dialogProps: action.payload
        };
      case "language":

        return {
          ...state,
          languagePayload: action.languagePayload
        };

      case "changeTheme":
        return {
          ...state,
          theme: action.newTheme
        };

      case "userData":
        return {
          ...state,
          userDataPayload: action.userDataPayload
        };
      case "taskDetail":
        return {
          ...state,
          taskDetailPayload: action.taskDetailPayload
        };

      case "currentInboxListFor":
        return {
          ...state,
          currentInboxListForPayload: action.currentInboxListForPayload
        };
      case "calculateResponse":
        return {
          ...state,
          calResponse: action.calResponse
        };
      case "calculateSent":
        return {
          ...state,
          calSentPayload: action.calSentPayload
        };
      case "addSheet":
        return {
          ...state,
          addSheetPayload: action.addSheetPayload
        };

      case "SheetDataForEdit":
        return {
          ...state,
          SheetDataForEditPayload: action.SheetDataForEditPayload
        };

      default:
        return state;
    }
  };
  useEffect(() => {

    SplashScreen.hide();
  }, []);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppState />
    </StateProvider>
  );
};

export default App;
