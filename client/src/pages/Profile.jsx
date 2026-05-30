import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Profile() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await API.get(
          `/pins/user/${user.id}`
        );

        setPins(response.data.pins);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPins();
  }, []);

  const handleDelete = async (pinId) => {
    try {
        const token = localStorage.getItem("token");

        await API.delete(`/pins/${pinId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    setPins(
        pins.filter((pin) => pin.id !== pinId)
    );

    alert("Pin deleted successfully");
  } catch (error) {
    console.log(error);

    alert("Delete failed");
  }
};

  return (
    <>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold">
          👤 {user.username}
        </h1>

        <p className="text-gray-600 mt-2">
          {user.email}
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-6">
          📌 My Pins ({pins.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full"
              />

              <div className="p-4">
                <h3 className="font-bold">
                    {pin.title}
                </h3>

                <p className="text-gray-600">
                    {pin.description}
                </p>

                <button
                    onClick={() => handleDelete(pin.id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Delete
                </button>
            </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;