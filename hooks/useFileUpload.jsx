import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../libs/firebase";


export const UseFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState("");

  const handleFileUpload = async(e) => {
    const file = e.target.files[0];
    const imageRef = ref(storage, "image/" + file.name );
    const uploadImage = uploadBytesResumable(imageRef, file);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        setLoading(false);
        setIsUploaded(true);
        try {
          const url = await getDownloadURL(uploadImage.snapshot.ref);
          setImageURL(url);
          setImage(file);
        } catch(error) {
          console.log(error);
        }
      }
    );
  };

  return {
    loading,
    isUploaded,
    imageURL,
    image,
    setImage,
    handleFileUpload,
  };
};