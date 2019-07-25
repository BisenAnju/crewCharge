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
            const data = jsonData.notification.payload.additionalData;
            localStorage.setItem(
              "navigationNotification",
              JSON.stringify({ route: data.route, id: data.id })
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
    document.addEventListener("contextmenu", event => event.preventDefault());
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
