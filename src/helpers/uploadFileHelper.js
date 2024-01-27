import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { failureNotification, successNotification } from "./notificationHelper";
import { storage } from "../firebase/firebaseConfiguration";
import { v4 } from "uuid";

// Refactor the function
export const uploadFile = async (files, setLoading) => {
  try {
    if (files.length <= 0) {
      failureNotification(`No images uploaded yet`);
      return []; // Return an empty array if no files
    }

    setLoading(true);
    const uploadedFiles = [];

    for (const file of files) {
      console.log("This is the file about to be uploaded: ", file);
      if (typeof file == "string") {
        console.log("String");
        uploadedFiles.push(file);
        continue;
      } else {
        const imageRef = ref(storage, `fileUpload/${v4()}_${file.name}`);

        try {
          const uploadTask = uploadBytes(imageRef, file);
          const uploadSnapshot = await uploadTask;
          const downloadURL = await getDownloadURL(uploadSnapshot.ref);

          uploadedFiles.push(downloadURL);
        } catch (error) {
          console.log("Error uploading file:", error);
          failureNotification(`Failed to upload ${file.name}`);
        }
      }
    }

    successNotification(`Images uploaded successfully`);
    setLoading(false);

    return uploadedFiles;
  } catch (error) {
    console.log(error);
    return [];
  }
};
