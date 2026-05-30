import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import API from "../api/api";
import Navbar from "../components/Navbar";

function Search() {
  const [pins, setPins] = useState([]);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await API.get(
          `/pins/search?q=${query}`
        );

        setPins(response.data.pins);
      } catch (error) {
        console.log(error);
      }
    };

    if (query) {
      fetchPins();
    }
  }, [query]);

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">
          Results for "{query}"
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pins.map((pin) => (
            <div
              key={pin.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={pin.imageUrl}
                alt={pin.title}
              />

              <div className="p-4">
                <h3 className="font-bold">
                  {pin.title}
                </h3>

                <p>{pin.description}</p>

                <p className="text-gray-500 mt-2">
                  @{pin.user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;