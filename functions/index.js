const functions = require("firebase-functions");
const admin = require("firebase-admin");
const QuickEncrypt = require("quick-encrypt");
var serviceAccount = require("./serviceAccountKey.json");

const serverPublicKey = `-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAKdS6VvGOaaaWfwypqDiWHt+44PNY6vt/fAGvknPi1A4NE4VH117dLOCBe6kZFz/
7lecvMvwGchGSPFZAZ1qlrZWjUlgovnC6KTC/qUb/f84xmdezZAH2u0/I++ezyCwp5pE+TcT
KaJNsYZMWOIjZ3+d7/RmEB3EegP4cUaj5/UTAgMBAAE=
-----END RSA PUBLIC KEY-----`;

const serverPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCnUulbxjmmmln8Mqag4lh7fuODzWOr7f3wBr5Jz4tQODROFR9de3SzggXu
pGRc/+5XnLzL8BnIRkjxWQGdapa2Vo1JYKL5wuikwv6lG/3/OMZnXs2QB9rtPyPvns8gsKea
RPk3EymiTbGGTFjiI2d/ne/0ZhAdxHoD+HFGo+f1EwIDAQABAoGANDyiNdCQtv6BEUcO1jNT
xFo81S0N7OMD4Cd6yLhOmeCyE55siFa+fDwfdf1Eh/QuiJOaLWDr66Zlp1NOOcLJAeh9zv2h
d0+ozC21vclFw3zcVbR52ZIcMrgyPweopb0dR7Q2lqe9ePuSJoxFI2M4nqig/k4IA3tqhNcD
U8SPuAECQQD3iZwsPtTG2WtM08bIavrevRH28Rc42kc8IHMFtXaAsY8EuUAZmVRyiRCscGKU
OF6eQAuauzJoi4jLwtDQeZ4TAkEArQtKXXnA+Q4gGwEiTh/lI29zhmWHuUJaLstXcB1ANjrA
NYK+fZdNSuDDUfxsCScymbEftcgc6iU7PjJN42ctAQJAVHtLqLIc7my/uS3B9x7D1gcTPYNU
2Jtumm+8seMXuZ5f4E3VOadh8eEjpqaIjmuap0nWbA2di56rplcr6yrGrwJAZ+Zdkl6mhWP7
1vsJVAtGk845eTrBEXVLnMkvCPwnL+h6vCZypgoQuKLX5ARCAgTtFucI+SbcZaJRPfkKVz3+
AQJBAJiFdWqKBXeXV9Nz0vmDorGpIE6uneQLkHxCPtqVNWsN+n1m41aNd56QxdoNFamPHfYm
Q82i/aCZ0i+OtxRq+CY=
-----END RSA PRIVATE KEY-----`;

exports.encPrac = functions.https.onCall(async (data, context) => {
  var encryptedKeyForServer = data.encryptedKeyForServer;
  var docId = data.docId;
  var requesterId = data.requesterId;

  var firstMethod = await function() {
    var promise = new Promise(function(resolve, reject) {
      let decryptedKey = QuickEncrypt.decrypt(
        encryptedKeyForServer,
        serverPrivateKey
      );
    });
  };

  var recieverPublicKey = new Promise((resolve, rej) => {
    db.collection("users")
      .doc(requesterId)
      .get()
      .then(doc => {
        let docData = doc.data();
        return docData.publicKey;
      })
      .catch(e => {
        return e;
      });

    // CHECK IF THE DATA BEING REQUESTED IS FOR THE REQUESTED USER OR NOT
  })
    .then(recPubKey => {
      let encryptedKey = QuickEncrypt.encrypt(decryptedKey, recPubKey);
      return encryptedKey;
    })
    .then(encryptedKey => {
      return { data: encryptedKey };
    })
    .catch(err => {
      return err;
    });
});
