import { db } from "../libs/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";

export const useItem = () => {
  const [items, setItems] = useState([]);

  const readData = async () => {
    const itemData = collection(db, "items");
    onSnapshot(itemData, (snapshot) => {
      const newItems = [];
      snapshot.docs.map((doc) => {
        const item = {
          id: doc.id,
          image: doc.data().image,
          productName: doc.data().productName,
          shopName: doc.data().shopName,
          category: doc.data().category,
          amount: doc.data().amount,
          season: doc.data().season,
          memo: doc.data().memo,
          itemStatus: doc.data().itemStatus,
          createDate: doc.data().createDate.toDate(),
          updateDate: doc.data().updateDate.toDate(),
          // action: "icons",
        };
        // console.log("useItemの中の",item)
        newItems.push({ ...item });
      });
      setItems(newItems);
    });
  };
  // console.log(items.map((item) => item));

  return { items, setItems, readData };
};