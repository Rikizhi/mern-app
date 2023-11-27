import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "./config";

const uploadFile = (file, filePath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filePath);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteFile = (fileUrl) => {
  const storageRef = ref(storage, fileUrl);
  return deleteObject(storageRef);
};

export { uploadFile, deleteFile };

export default uploadFile;
