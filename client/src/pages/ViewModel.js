import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../slices/UserData";
import { Navbar } from "../components/Navbar";
import { Navlinks } from "../components/Navlinks";
import { Profile } from "../components/Profile";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";


export const ViewModel = () => {
  const [models, setModels] = useState([]);
  const { user_id, sellerType, email } = useSelector((state) => state.userData);

  const [scrollPosition, setScrollPosition] = useState(0);
  const gridRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    gridRef.current.scrollLeft += scrollOffset;
    setScrollPosition(gridRef.current.scrollLeft);
  };

  const products = [
    {
      id: 1,
      name: "Koenigsegg Agera",
      price: "$50",
      imageUrl: "/models/car1.jpg",
      likes: 2,
    },
    {
      id: 2,
      name: "M26 Grenade Game Weapon",
      price: "$25",
      imageUrl: "/models/nade2.jpg",
      likes: 0,
    },
    {
      id: 3,
      name: "Brick Chimney Square",
      price: "$15",
      imageUrl: "/models/house2.jpg",
      likes: 4,
    },
    {
      id: 4,
      name: "Old Wooden Bench",
      price: "FREE",
      imageUrl: "/models/bench2.jpg",
      likes: 1,
    },
  ];

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/modelApi/models");
  //       const modelsData = await response.json();
  //       setModels(modelsData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between">
          <Navbar />
          <Profile />
        </div>
        <Navlinks />
      </div>
      <div className="mt-12">
        <h1 className="text-xl font-semibold mb-2">Latest Models</h1>
        {/* {models.map((model) => (
          <div
            key={model.model_id}
            onClick={() => navigate(`/model/${model.model_id}`)}
            className="border rounded-md p-2 cursor-pointer hover:bg-gray-200"
          >
            <p>{model.name}</p>
            <p>{model.price}</p>
            {console.log(model.image)}
            {model.image && (
              <img
                src={`http://localhost:8000/uploads/models/${model.image
                  .split("\\")
                  .pop()}`}
                alt={model.name}
                className="w-full h-auto"
              />
            )}
          </div>
        ))} */}
        <div className="relative ">
          <div
            ref={gridRef}
            className="flex h-56 items-center space-x-4 overscroll-x-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            {Array.from({ length: 6 }).map((_, index) => {
              const productIndex = index + scrollPosition;
              const product = products[productIndex];
              const productURL = "/model/" + productIndex;

              return (
                <a href={productURL}>
                  <div
                    key={index}
                    className={`h-40 w-54 flex-shrink-0 ${
                      product ? "" : "invisible"
                    }`}
                  >
                    {product && (
                      <div>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="rounded-lg h-40 w-64 object-cover"
                        />
                        <div className="mt-2">
                          <div className="flex flex-row items-center justify-between">
                            <p className="text-base truncate w-48">{product.name}</p>
                            <div className="flex flex-row items-center">
                              <p className="mr-1.5 text-gray-600 text-sm">{product.likes}</p>
                              <FaHeart className="text-gray-200" />
                            </div>
                          </div>

                          <p className="text-lg font-semibold">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
          <button
            className="absolute top-0 bottom-0 -left-8"
            onClick={() => handleScroll(-200)}
          >
            <FaChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            className="absolute top-0 bottom-0 -right-8 hover:drop-shadow-xl"
            onClick={() => handleScroll(200)}
          >
            <FaChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
