import { useEffect, useState } from 'react';
import { db } from '../libs/firebase';
import { doc, getDoc } from 'firebase/firestore';

//指定したデータを取得する
const useGetItemData = (itemId, image, setImage) => {
  const [productName, setProductName] = useState("");
  const [shopName, setShopName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [season ,setSeason] = useState("");
  const [memo, setMemo] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [editItem, setEditItem] = useState({
    image: '',
    productName: '',
    shopName: '',
    category: '',
    amount: '',
    season: '',
    memo: '',
    itemStatus: '',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "items", itemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setImage(data.image || imageURL);
        setProductName(data.productName);
        setShopName(data.shopName);
        setCategory(data.category);
        setAmount(data.amount);
        setSeason(data.season);
        setMemo(data.memo);
        setItemStatus(data.itemStatus);
        setCreateDate(data.createDate.toDate());
        setUpdateDate(data.updateDate.toDate());
        setEditItem({
          image: data.image || "", 
          productName: data.productName,
          shopName: data.shopName,
          category: data.category,
          amount: data.amount,
          season: data.season,
          memo: data.memo,
          itemStatus: data.itemStatus,
        });
      } 
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId]);
  return {
    productName,
    setProductName,
    shopName,
    setShopName,
    category,
    setCategory,
    amount,
    setAmount,
    season,
    setSeason,
    memo,
    setMemo,
    itemStatus,
    setItemStatus,
    createDate,
    updateDate,
    editItem,
    setEditItem,
  };
};

export default useGetItemData
