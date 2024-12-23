"use client";
import React, { useEffect, useState } from "react";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

// Modal component
const Modal = ({ isOpen, onClose, fullDescription }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Category Description</h2>
        <p className="text-gray-700">{fullDescription}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// AllRecipes component
const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getCategories,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setRecipes(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  const handleSeeMore = (description) => {
    setModalDescription(description);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center my-5">All Recipe Categories</h1>
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:mx-10 my-5">
          {
            recipes.map((recipe) => (
              <div
                key={recipe.idCategory}
                className="max-w-sm overflow-hidden nm_Container rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <Image
                  className="w-full h-40 object-cover"
                  src={recipe.strCategoryThumb || "/placeholder.png"}
                  alt={recipe.strCategory}
                  width={640}
                  height={160}
                  priority
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{recipe.strCategory}</h2>
                  <p className="text-gray-700 mt-2">
                    {recipe.strCategoryDescription && recipe.strCategoryDescription.length > 100
                      ? `${recipe.strCategoryDescription.slice(0, 100)}...`
                      : recipe.strCategoryDescription || "No description available"}
                  </p>
                  {recipe.strCategoryDescription && recipe.strCategoryDescription.length > 100 && (
                    <button
                      onClick={() => handleSeeMore(recipe.strCategoryDescription)}
                      className="text-blue-500 mt-2"
                    >
                      See More
                    </button>
                  )}
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullDescription={modalDescription}
      />
    </div>
  );
};

export default AllRecipes;
