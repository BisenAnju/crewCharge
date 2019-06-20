import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./firebase";
const startApp = () => {
  if (window.cordova) {
    document.addEventListener(
      "deviceready",
      () => {
        localStorage.removeItem("navigationNotification");
        window.plugins.OneSignal.startInit(
          "323e54fd-ee29-4bb2-bafc-e292b01c694f"
        )
          .handleNotificationOpened(jsonData => {
            console.log(jsonData);
            const tempRoute =
              jsonData.notification.payload.additionalData.Route;
            const tempId = jsonData.notification.payload.additionalData.Id;
            localStorage.setItem(
              "navigationNotification",
              JSON.stringify({ route: tempRoute, id: tempId })
            );
          })
          .endInit();
        window.plugins.OneSignal.setSubscription(true);

        window.plugins.OneSignal.getPermissionSubscriptionState(status => {
          localStorage.setItem(
            "playerId",
            JSON.stringify({ id: status.subscriptionStatus.userId })
          );
        });
      },
      true
    );
    ReactDOM.render(
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>,
      document.getElementById("root")
    );
    serviceWorker.unregister();
  } else {
    ReactDOM.render(
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>,
      document.getElementById("root")
    );
    serviceWorker.unregister();
  }
};

startApp();
