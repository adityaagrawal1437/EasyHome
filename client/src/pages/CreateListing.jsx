import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import {useNavigate} from  'react-router-dom'
export default function CreateListing() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    adress: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 499,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb per image max)");
          setUploading(false);
        });
    } else if (files.length + formData.imageUrls.length > 6) {
      setImageUploadError("You can only upload 6 images for a listing");
      setUploading(false);
    } else {
      setImageUploadError("Please select a file");
      setUploading(false);
    }
  };
  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i != index),
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: !formData[e.target.id],
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.imageUrls.length<1){
        return setError('You have to upload atleast 1 image')
      }
      if(+formData.regularPrice<+formData.discountPrice){
        return setError('Regular price can not be less than discount price')
      }
      setLoading(true);
      setError(false);
      const res = await fetch("api/listing/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser.currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.sucess === false) {
        return setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6 text-slate-700">
        Create a Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 "
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Name"
            className=" border p-3 rounded-lg "
            id="name"
            maxLength="65"
            minLength="6"
            required
          />
          <textarea
            onChange={handleChange}
            value={formData.description}
            type="text"
            placeholder="Description"
            className=" border p-3 rounded-lg "
            id="description"
            required
          />
          <input
            onChange={handleChange}
            value={formData.adress}
            type="text"
            placeholder="Adress"
            className=" border p-3 rounded-lg "
            id="adress"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className=" w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className=" w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className=" w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className=" w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className=" w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bedrooms}
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 rounded-lg border border-grey-300 "
              />
              <p className="">Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.bathrooms}
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 rounded-lg border border-grey-300 "
              />
              <p className="">Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.regularPrice}
                type="number"
                id="regularPrice"
                min="499"
                max="10000000000000"
                required
                className="p-3 rounded-lg border border-grey-300 "
              />
              <div className=" flex flex-col items-center">
                <p className="">Regular price</p>
                <span className=" text-xs">(Rs / months)</span>
              </div>
            </div>
            {formData.offer&&<div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                value={formData.discountPrice}
                type="number"
                id="discountPrice"
                min="0"
                max="10000000000000"
                required
                className="p-3 rounded-lg border border-grey-300 "
              />
              <div className=" flex flex-col items-center">
                <p className="">Discounted Price</p>
                <span className=" text-xs">(Rs / months)</span>
              </div>
            </div>}
            
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className=" font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading.." : "Upload"}
            </button>
          </div>
          <p className=" text-red-700 text-sm">
            {imageUploadError ? imageUploadError : ""}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className=" flex justify-between p-3 border items-center "
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button disabled={loading||uploading} className="p-3 bg-slate-700 text-white uppercase rounded-lg my-3 hover:opacity-95 disabled:opacity-80">
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className=" text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
