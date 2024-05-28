import React, { useEffect, useState } from "react";
import {
  faArrowLeft,
  faArrowLeftRotate,
  faArrowUpFromBracket,
  faImage,
  faImagePortrait,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCookies } from "react-cookie";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { Navbar } from "../components/Navbar";
import { Navlinks } from "../components/Navlinks";
import { NavBtn } from "../components/NavBtn";
import { Footer } from "../components/Footer";

export const Model_Upload = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [customSubCategory, setCustomSubCategory] = useState("");
  const [subSubcategories, setSubSubCategories] = useState([]);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [customSubSubCategory, setCustomSubSubCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState(null);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagsInput, setTagsInput] = useState("");
  const [modelFile, setModelFile] = useState(null);
  const [designer_id, setDesigner_Id] = useState(null);
  const [category_id, setCategory_Id] = useState(null);
  const [checkToken, setCheckToken] = useState("");

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    console.log(token);
    setCheckToken(token || "");
    try {
      if (token) {
        const decodedToken = jwtDecode(token);

        const userId = decodedToken.user_id;
        const email = decodedToken.email;
        const sellerType = decodedToken.sellerType;
        console.log(userId, email, sellerType);
        setDesigner_Id(userId);
      }
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/categoryApi/category"
        );
        const categoryData = await response.json();
        setCategories(categoryData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log("Testing");
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "other") {
      const fetchSubCategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/categoryApi/subcategories/${selectedCategory}`
          );
          const subCategoryData = await response.json();
          setSubCategories(subCategoryData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedSubCategory && selectedSubCategory !== "other") {
      const fetchSubSubCategories = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/categoryApi/subcategories/${selectedSubCategory}`
          );
          const subSubCategoryData = await response.json();
          setSubSubCategories(subSubCategoryData);
        } catch (err) {
          console.log(err);
        }
      };
      fetchSubSubCategories();
    } else {
      setSubSubCategories([]);
    }
  }, [selectedSubCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("designer_id", designer_id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("is_free", isFree);
    formData.append("image", image);
    formData.append("modelFile", modelFile);

    try {
      const response = await fetch(
        "http://localhost:8000/modelApi/uploadModel",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("Model uploaded successfully:", data);
      }
    } catch (error) {
      console.error(error);
      console.log("Server Error");
    }
  };

  const handleFileChange = (e) => {
    setModelFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const Chip = ({ label, onDelete }) => (
    <div className="inline-block font-medium text-base py-0.5 px-2 w-fit text-gray-700 rounded-full bg-gray-300">
      <span>{label}</span>
      <button
        className="ml-2 mt-[1px]"
        onClick={onDelete}
      >
        <FontAwesomeIcon className="w-3  text-gray-700" icon={faXmarkCircle} />
      </button>
    </div>
  );

  const handleAddTags = (e) => {
    e.preventDefault();
    if (tagsInput.trim() !== "" && !tags.includes(tagsInput)) {
      if (tags.length < 5) {
        setTags([...tags, tagsInput]);
        setTagsInput("");
      } else {
        alert("You can only add up to 5 skills.");
      }
    }
  };

  const handleDeleteTags = (tagsToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagsToDelete);
    setTags(updatedTags);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCategory_Id(e.target.value);
    setSelectedSubCategory(""); // Reset subcategory
    setSelectedSubSubCategory(""); // Reset sub-subcategory
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    setCategory_Id(e.target.value);
    setSelectedSubSubCategory(""); // Reset sub-subcategory
  };

  const handleSubSubCategoryChange = (e) => {
    setSelectedSubSubCategory(e.target.value);
    setCategory_Id(e.target.value);
  };

  const [documents, setDocuments] = useState(["", "", ""]);
  const [activeDrag, setActiveDrag] = useState(false);

  const handleDragEnter = (event) => {
    event.preventDefault();
    setActiveDrag(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setActiveDrag(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActiveDrag(false);
    const files = event.dataTransfer.files;
    console.log(files);
    // Handle the files here
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between">
          <Navbar />
          <div className="my-auto">
            <NavBtn />
          </div>
        </div>
        <Navlinks />
      </div>
      <div className="max-w-7xl mx-auto mt-4">
        <div className="">
          <form action="" className="flex">
            <div className="w-1/2 pr-3">
              <a href="" className="font-medium">
                <FontAwesomeIcon
                  className="w-3 text-gray-600"
                  icon={faArrowLeft}
                />{" "}
                Back
              </a>

              <div className="mt-6">
                <h1 className="text-3xl font-semibold">Add Images</h1>

                <div className="border mt-6 shadow-lg rounded-lg">
                  <div className="p-8">
                    <div className=" mx-auto relative rounded-xl">
                      <div>
                        <div className="flex items-center justify-center w-full">
                          <label
                            onDrop={handleDrop}
                            onDragEnter={handleDragEnter}
                            onDragOver={(event) => event.preventDefault()}
                            onDragLeave={handleDragLeave}
                            htmlFor="dropzone-file"
                            className={`flex flex-col items-center justify-center w-full h-64 border-gray-900 border-2 border-dashed rounded-lg cursor-pointer ${
                              activeDrag
                                ? "bg-blue-50 hover:bg-blue-50 border-blue-600"
                                : "bg-zinc-50 hover:bg-zinc-100 border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
                              <svg
                                className={`w-8 h-8 mb-4 text-gray-900 dark:text-gray-900 ${
                                  activeDrag ? "text-blue-600" : ""
                                }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p
                                className={`pointer-events-none mb-2 text-sm text-gray-900 dark:text-gray-900 ${
                                  activeDrag ? "text-blue-600" : ""
                                }`}
                              >
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                          </label>
                        </div>
                        <div className="flex justify-between mt-2">
                          <p className="text-xs text-gray-900">
                            Supported Formats: SVG, PNG, JPG or GIF
                          </p>
                          <p className="text-xs text-gray-900">
                            Max size: 25MB
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-4 gap-3">
                        <div className="w-1/3 h-32 rounded-lg bg-gray-200 flex justify-center items-center">
                          <FontAwesomeIcon
                            className="w-12 text-gray-400"
                            icon={faImage}
                          />
                        </div>
                        <div className="w-1/3 h-32 rounded-lg bg-gray-200 flex justify-center items-center">
                          <FontAwesomeIcon
                            className="w-12 text-gray-400"
                            icon={faImage}
                          />
                        </div>
                        <div className="w-1/3 h-32 rounded-lg bg-gray-200 flex justify-center items-center">
                          <FontAwesomeIcon
                            className="w-16 text-gray-400"
                            icon={faImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 pl-3">
              <div className="max-w-lg mx-auto">
                <h1 className="mt-6 text-2xl font-semibold">
                  Upload your 3D Model
                </h1>

                <div className="mt-8">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Enter Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 mt-2 font-medium">
                      Select Category
                    </label>
                    <select
                      value={
                        selectedCategory === "other"
                          ? "other"
                          : selectedCategory
                      }
                      onChange={handleCategoryChange}
                      className="mb-4 p-2 border border-gray-300 rounded w-full"
                    >
                      <option value="" disabled hidden>Select Category</option>
                      {Array.isArray(categories) &&
                        categories.map((category) => (
                          <option
                            key={category.category_id}
                            value={category.category_id}
                          >
                            {category.name}
                          </option>
                        ))}
                      <option value="other">Other</option>
                    </select>
                    {selectedCategory === "other" && (
                      <>
                        <label htmlFor="customCategory" className="block mb-2 font-medium">
                          Type Category
                        </label>
                        <input
                          type="text"
                          value={customCategory}
                          onChange={(e) => setCustomCategory(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </>
                    )}
                    {selectedCategory && selectedCategory !== "other" && (
                      <div>
                        <select
                          value={
                            selectedSubCategory === "other"
                              ? "other"
                              : selectedSubCategory
                          }
                          onChange={handleSubCategoryChange}
                          className="mb-4 p-2 border border-gray-300 rounded w-full"
                        >
                          <option value="" disabled hidden>Select Sub Category</option>
                          {Array.isArray(subcategories) &&
                            subcategories.map((subCategory) => (
                              <option 
                                key={subCategory.category_id}
                                value={subCategory.category_id}
                              >
                                {subCategory.name}
                              </option>
                            ))}
                          <option value="other">Other</option>
                        </select>
                      </div>
                    )}
                    {selectedSubCategory === "other" && (
                      <>
                        <label
                          htmlFor="customSubCategory"
                          className="block mb-2 font-medium"
                        >
                          Type Sub Category
                        </label>
                        <input
                          type="text"
                          value={customSubCategory}
                          onChange={(e) => setCustomSubCategory(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </>
                    )}
                    {selectedSubCategory && selectedSubCategory !== "other" && (
                      <div>
                        <select
                          value={
                            selectedSubSubCategory === "other"
                              ? "other"
                              : selectedSubSubCategory
                          }
                          onChange={handleSubSubCategoryChange}
                          className="mb-4 p-2 border border-gray-300 rounded w-full"
                        >
                          <option value="" disabled hidden>Select Sub-Sub Category</option>
                          {Array.isArray(subSubcategories) &&
                            subSubcategories.map((subSubCategory) => (
                              <option
                                key={subSubCategory.category_id}
                                value={subSubCategory.category_id}
                              >
                                {subSubCategory.name}
                              </option>
                            ))}
                          <option value="other">Other</option>
                        </select>
                      </div>
                    )}
                    {selectedSubSubCategory === "other" && (
                      <>
                        <label
                          htmlFor="customSubSubCategory"
                          className="block mb-2"
                        >
                          Type Sub Sub Category
                        </label>
                        <input
                          type="text"
                          value={customSubSubCategory}
                          onChange={(e) =>
                            setCustomSubSubCategory(e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <label htmlFor="description" className="block mb-2 font-medium">
                      Enter Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="is_free" className="block mb-2 font-medium mt-4">
                      Is It Paid?
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={isFree}
                          onChange={() => setIsFree(true)}
                          className="mr-2"
                        />
                        Paid
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={!isFree}
                          onChange={() => setIsFree(false)}
                          className="mr-2"
                        />
                        Free
                      </label>
                    </div>
                  </div>
                  {isFree && (
                    <div>
                      <label htmlFor="price" className="block mb-2">
                        Enter Price
                      </label>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  )}
                  <div>
                    <label htmlFor="tags" className="block mb-2 font-medium">
                      Enter Tags
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 w-full ">
                        <input
                          type="text"
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                          placeholder="Enter Tag..."
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                          onClick={handleAddTags}
                          className=" text-nowrap px-4 py-2 bg-gray-600 text-white rounded-md"
                        >
                          Add Tags
                        </button>
                      </div>
                      <div className="space-x-2">
                        {tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleDeleteTags(tag)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="modelFile" className="mt-4 block mb-2 font-medium">
                      Upload Your 3D Model
                    </label>
                    <input
                      onChange={handleFileChange}
                      type="file"
                      name="modelFile"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-green-600 w-full mb-12 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Upload Model
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};
