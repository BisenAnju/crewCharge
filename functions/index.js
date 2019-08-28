const functions = require("firebase-functions");
const admin = require("firebase-admin");
var db = admin.firestore();
var batch = db.batch();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.holidays = functions.firestore
  .document("holiday_master/{holiday}")
  .onCreate(event => {
    const masterData = event.data();
    const userRef = db.collection("users");

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(query => {
        query.forEach(docs => {
          if (docs.exists) {
            batch.set(db.collection("demo").doc(), {
              addedOn: new Date(),
              from: masterData.start,
              to: masterData.end,
              leaveStatus: "Approved",
              leaveType: "Full",
              reason: masterData.title,
              status: "official",
              userId: docs.id
            });
          }
        });
        return batch.commit();
        // return transaction.update(analyticsRef, { updatedArray });
      });
    });
  });
