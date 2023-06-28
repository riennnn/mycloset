import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { db } from "../libs/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export const DeleteButton = ({ id }) => {
  // console.log(id)
  const handleClickDelete = async () => {
    if (confirm("削除しますがよろしいですか？")) {
      await deleteDoc(doc(db, "items", id)).then(() => {
        alert("削除が完了しました");
      }).catch((error) => {
        console.error("failed", error);
        alert("削除に失敗しました");
      });
    } else {
      alert("キャンセルしました");
    }
  }

  return (
    <DeleteOutlineIcon
      size="small"
      onClick={handleClickDelete}
      style={{ cursor: "pointer"}}
    />
  );
}