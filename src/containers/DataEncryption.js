const QuickEncrypt = require("quick-encrypt");
const Cryptr = require("cryptr");

export function dataEncrypt(data) {
  return console.log(data);
}
export async function dataDecrypt(data, props) {
  let privatekey = localStorage.getItem("privatekey");
  let func = props.firebase.function.httpsCallable("encPrac");
  let encryptedKeyforReciever = await func({
    encryptedKeyForServer: data.encryptedKeyForServer,
    docId: null,
    requesterId: props.loggedInUser.uid
  }).then(res => {
    return res.data;
  });
  let decryptedKeyFromServer = QuickEncrypt.decrypt(
    encryptedKeyforReciever.toString(),
    privatekey.toString()
  );
  return new Cryptr(decryptedKeyFromServer);
}
