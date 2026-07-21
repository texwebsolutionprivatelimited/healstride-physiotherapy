import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

/**
 * Compresses an image file and converts it to a Base64 data URL as a fail-safe fallback.
 */
export const compressToBase64 = (file, maxWidth = 1000, quality = 0.75) => {
  return new Promise((resolve) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        resolve(event.target.result || "");
      };
    };
    reader.onerror = () => {
      resolve("");
    };
  });
};

/**
 * Uploads an image file safely without throwing storage errors.
 * Multi-tiered strategy:
 * 1. ImageKit API Upload (using VITE_IMAGEKIT_PRIVATE_KEY)
 * 2. Firebase Storage (if bucket configured and permitted)
 * 3. Compressed Base64 Data URL fallback (100% reliable)
 */
export const uploadImage = async (file, folder = "uploads") => {
  if (!file) return "";

  // If passed string (already a URL or base64), return it directly
  if (typeof file === "string") return file;

  const privateKey =
    import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY ||
    "private_Hv3zD0erqaqgXfjIaRdiWsYza+U=";

  // 1. Try ImageKit API Upload
  if (privateKey) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name || `image_${Date.now()}.jpg`);
      formData.append("useUniqueFileName", "true");
      formData.append("folder", `/${folder}`);

      const authHeader = "Basic " + btoa(privateKey + ":");

      const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization: authHeader,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.url) {
          console.log("Uploaded successfully to ImageKit:", data.url);
          return data.url;
        }
      } else {
        console.warn("ImageKit API upload warning:", response.status);
      }
    } catch (err) {
      console.warn("ImageKit API upload error:", err?.message || err);
    }
  }

  // 2. Try Firebase Storage (silently handle errors)
  if (storage && storage.app && storage.app.options && storage.app.options.storageBucket) {
    try {
      const newPath = `${folder}/${Date.now()}-${file.name || "file"}`;
      const storageRef = ref(storage, newPath);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      if (downloadURL) {
        console.log("Uploaded successfully to Firebase Storage:", downloadURL);
        return downloadURL;
      }
    } catch (err) {
      console.warn("Firebase Storage upload skipped/failed:", err?.message || err);
    }
  }

  // 3. Guaranteed Fallback: Compressed Base64 Data URL
  console.log("Using compressed Base64 fallback for image");
  return await compressToBase64(file);
};
