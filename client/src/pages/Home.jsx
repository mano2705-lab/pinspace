import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Home() {
  const [pins, setPins] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchPins = async () => {
    try {
      const response = await API.get("/pins");
      setPins(response.data.pins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  const handleLike = async (pinId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await API.post(
        `/likes/${pinId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchPins();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#121212] p-5">

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
          {pins.map((pin) => {
            const isLiked = pin.likes?.some(
              (like) => like.userId === currentUser?.id
            );

            return (
              <div
                key={pin.id}
                className="bg-[#1e1e1e] text-white rounded-2xl overflow-hidden shadow-lg mb-5 break-inside-avoid hover:scale-105 transition-all duration-300"
              >
                <img
                  src={pin.imageUrl}
                  alt={pin.title}
                  className="w-full"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold">
                    {pin.title}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {pin.description}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm text-gray-400">
                      By @{pin.user.username}
                    </p>

                    <button
                      onClick={() => handleLike(pin.id)}
                      className="font-semibold text-lg"
                    >
                      {isLiked ? "❤️" : "🤍"}{" "}
                      {pin.likes?.length || 0}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;