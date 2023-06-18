import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../libs/firebase";

// Cloud Firestoreに画像のメタデータを保存
function saveImageData(name, url) {
  return addDoc(collection(db, 'images'), {
    name: name,
    url: url,
    uploadedAt: serverTimestamp()
  });
}

export { saveImageData };
