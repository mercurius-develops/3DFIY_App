import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Profile } from "../components/Profile";
import { Navlinks } from "../components/Navlinks";
import { Footer } from "../components/Footer";
import {
  faArrowLeft,
  faArrowLeftRotate,
  faArrowUpFromBracket,
  faHeart,
  faImage,
  faImagePortrait,
  faRankingStar,
  faStar,
  faStarHalfStroke,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

export const ModelDetail1 = () => {
  const { modelId } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkToken, setCheckToken] = useState("");
  const [sellerType, setSellerType] = useState("");

  const nav = useNavigate();
  // console.log(sellerType)
  //  useEffect(() => {
  //    const token = window.sessionStorage.getItem("token");
  //    console.log(token);
  //    setCheckToken(token || "");
  //    try {
  //      if (token) {
  //        const decodedToken = jwtDecode(token);

  //        const sellerType = decodedToken.sellerType;

  //        setSellerType(sellerType);
  //      }
  //    } catch (error) {
  //      if (error instanceof InvalidTokenError) {
  //        console.error("Invalid token");
  //      }
  //    }
  //  }, []);

  // useEffect(() => {
  //   const fetchModelDetail = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/modelApi/modelDetail/${modelId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch model details");
  //       }
  //       const data = await response.json();
  //       setModel(data);

  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchModelDetail();
  // }, [modelId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  // if (!model) {
  //   return <div>No model found</div>;
  // }
  const updateModelBtn = () => {
    nav(`/updateModel/${modelId}`, { state: { model } });
  };
  const delModelBtn = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this model?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(
          `http://localhost:8000/modelApi/deleteModel/${modelId}`
        );
        console.log("Model deleted successfully!");
        // Optionally, you can navigate away or refresh the page after deletion
        nav("/some-path"); // Adjust the path as necessary
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [image, setImage] = useState("image1");

  const images = {
    image1: "/models/nade.jpg",
    image2: "/models/nade2.jpg",
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{model.user_name}</h1>
            <div className="flex items-center">
              {model.profile_pic && (
                <img
                  src={`http://localhost:8000/uploads/${model.profile_pic
                    .split("\\")
                    .pop()}`}
                  alt={model.user_name}
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <h2 className="text-lg">{model.user_location}</h2>
            </div>
            <h1>{model.tags}</h1>
          </div>
          <h1 className="text-2xl font-bold mb-4">{model.model_name}</h1>
          <p className="text-gray-700 mb-4">{model.description}</p>
          <div className="mb-4">
            {model.image && (
              <img
                src={`http://localhost:8000/uploads/models/${model.image
                  .split("\\")
                  .pop()}`}
                alt={model.name}
                className="w-40 h-auto rounded-lg"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            {model.isFree === false ? (
              <>

                <h3 className="text-xl font-bold">{model.price}</h3>
              </>
            ) : (
              ""
            )}

            <div>
              {sellerType !== "Designer" ? (
                <>
                  <button>Save 3D Model</button>
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              {sellerType === "Designer" ? (
                <>

                  <button onClick={updateModelBtn}>Update Model</button>
                  <button onClick={delModelBtn}>Delete Model</button>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div> */}

        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between">
            <Navbar />
            <Profile />
          </div>
          <Navlinks />
        </div>

        <div className="max-w-7xl mx-auto mt-4">
          <div className="flex">
            <div className="w-1/2 mr-4">
              <a href="/ViewModels" className="font-medium">
                <FontAwesomeIcon
                  className="w-3 text-gray-600"
                  icon={faArrowLeft}
                />{" "}
                Back
              </a>

              <div className="mt-14 flex w-full">
                <div className="flex flex-col gap-4 w-fit">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage("image1");
                    }}
                    className={`w-44 rounded-lg ${
                      image === "image1" ? "border-blue-500" : ""
                    }`}
                  >
                    <img
                      src="/models/nade.jpg"
                      className="object-cover rounded-lg opacity-50 hover:opacity-100 duration-300"
                      alt="Car 1"
                    />
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage("image2");
                    }}
                    className={`w-44 rounded-lg ${
                      image === "image2" ? "border-blue-500" : ""
                    }`}
                  >
                    <img
                      src="/models/nade2.jpg"
                      className="object-cover rounded-lg opacity-50 hover:opacity-100 duration-300"
                      alt="Car 2"
                    />
                  </a>
                </div>

                <div className="flex ml-4 w-full justify-center items-center">
                  <img
                    className="object-contain rounded-lg w-fit h-fit"
                    src={images[image]}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 ml-4 mt-14">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold">
                  M26 Grenade Game Weapon
                </h1>
                <p className="text-xl font-semibold text-gray-800 bg-gray-300 py-1 px-5 rounded-full">
                  $25
                </p>
              </div>
              <div className="flex">
                <div className="flex items-center">
                  <img
                    src="/logo192.png"
                    className="h-14 -mt-1 rounded-full border-2 border-green-600"
                    alt=""
                  />
                  <div className="pt-4">
                    <div className="ml-2">
                      <p className="font-medium">Ahmed</p>
                      <p className="font-normal">Wah Cantt, PK</p>
                    </div>
                    <div className="ml-2 -mt-1">
                      <FontAwesomeIcon
                        className="w-3 text-gray-300"
                        icon={faStar}
                      />
                      <FontAwesomeIcon
                        className="w-3 text-gray-300"
                        icon={faStar}
                      />
                      <FontAwesomeIcon
                        className="w-3 text-gray-300"
                        icon={faStar}
                      />
                      <FontAwesomeIcon
                        className="w-3 text-gray-300"
                        icon={faStar}
                      />
                      <FontAwesomeIcon
                        className="w-3 text-gray-300"
                        icon={faStar}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-justify">
                  It is designed to be thrown by hand and explode upon impact,
                  releasing shrapnel that can injure or kill enemy personnel.
                  The M26 has a lethal radius of approximately 15 meters and can
                  be used in both offensive and defensive operations. For
                  explosive military weapons, anti-tank operations, landmine
                  weapons, and grenade weapons promotional or advertising
                  projects. M26 Grenade Game Weapon is a high quality, photo
                  real 3d model that will enhance detail and realism to any of
                  your rendering projects. The model has a fully textured,
                  detailed design that allows for close-up renders, and was
                  originally modeled in 3ds Max 2014 and rendered with V-Ray.
                  Renders have no postprocessing! Hope you like it! 
                  <br />
                  Features: - High quality polygonal model, has real dimensions.
                  Easy to merge into your scene. - Units: cm - The model was
                  created with the optimal number of polygons. (The Meshsmooth
                  modifier is assigned to the original mesh. Easy to increase
                  mesh resolution if necessary.) - All the objects come with
                  complete UVs - All textures and materials are included and
                  mapped. (All colors can be easily modified.) - All objects are
                  logically named and grouped for ease of objects selection and
                  scene management. - No part-name confusion when importing
                  several models into a scene. - No cleaning up necessary (Model
                  does not include any backgrounds or scenes used in preview
                  images.) - just drop model into your scene. - No special
                  plugin needed to open scene. ***** File Formats: - 3ds Max
                  2014 V - Ray and standard materials scenes - Blender 2.8 Eevee
                  materials scene - Maya 2016 V-Ray, Hardware and Redshift
                  materials scenes - Cinema 4D R17 V-Ray and Standard materials
                  scene - Modo 10.2 Standard materials scene - OBJ, 3DS, FBX
                  (Multi Formats)
                </p>
              </div>

              <a href="#" className="flex items-center gap-2 mt-6">
                <button className="w-48 bg-[#539e60] text-white font-medium py-2 rounded-lg ">
                  Buy Now
                </button>
                <div className="w-10 h-10 bg-gray-600 flex items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    className="w-4 h-4 text-gray-200"
                    icon={faHeart}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};
