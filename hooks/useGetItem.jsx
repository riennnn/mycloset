import { useEffect, useState } from 'react';
import { db } from '../libs/firebase';
import { doc, getDoc } from 'firebase/firestore';

//指定したitemを取得する
const useGetItem = (itemId) => {
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [season ,setSeason] = useState("");
  const [memo, setMemo] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "items", itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setImage(data.image);
        setProductName(data.productName);
        setShopName(data.shopName);
        setCategory(data.category);
        setAmount(data.amount);
        setSeason(data.season);
        setMemo(data.memo);
        setCreateDate(data.createDate.toDate());
        setUpdateDate(data.updateDate.toDate());
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId]);

  return {
    image,
    productName,
    shopName,
    category,
    amount,
    season,
    memo,
    createDate,
    updateDate,
  };
};

export default useGetItem
