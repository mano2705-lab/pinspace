import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/api";

function CreatePin() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("BUTTON CLICKED");
    console.log(title);
    console.log(description);
    console.log(image);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append(
        "description",
        description
      );

      formData.append("image", image);

      const token = localStorage.getItem("token");

        console.log("SENDING REQUEST");

      await API.post("/pins", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Pin created successfully");

      navigate("/");
    } 
    
    catch (error) {
      console.log("FULL ERROR:", error);

      console.log("RESPONSE:", error.response);

      console.log("DATA:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Upload failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-[450px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Create Pin
        </h1>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded-lg mb-4"
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <button className="w-full bg-black text-white p-3 rounded-lg">
          Upload Pin
        </button>
      </form>
    </div>
  );
}

export default CreatePin;