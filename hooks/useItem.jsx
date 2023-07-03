import { useState } from "react";
import { db } from "../libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";

//items一覧を取得するhooks
export const useItem = () => {
  const [items, setItems] = useState([]);

  const readData = async () => {
    const itemData = collection(db, "items");
    onSnapshot(itemData, (snapshot) => {
      const newItems = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log(data)
        return {
          id: doc.id,
          image: data.image || "/images/top.jpg",
          productName: data.productName || "",
          shopName: data.shopName || "",
          category: data.category || "",
          amount: data.amount || "",
          season: data.season || "",
          memo: data.memo || "",
          itemStatus: data.itemStatus || "",
          salesStatus: data.salesStatus || "",
          createDate: data.createDate ? data.createDate.toDate().toString() : null,
          updateDate: data.updateDate ? data.updateDate.toDate().toString() : null,
        };
      });
      setItems(newItems);
    }, (error) => {
      console.log("エラーです",error);
    });
  };
  return { items, readData };
};