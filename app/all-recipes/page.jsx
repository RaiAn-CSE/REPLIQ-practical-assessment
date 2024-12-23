"use client";
import React, { useState, useEffect } from "react";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Modal from "@/components/Modal";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeID, setRecipeID] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setRecipes(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  const handleSeeMore = (idMeal) => {
    setRecipeID(idMeal);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center mt-10">All Recipes</h1>
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:mx-10 my-5">
          {recipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="max-w-sm overflow-hidden nm_Container rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Image
                className="w-full h-auto object-cover aspect-w-16 aspect-h-9"
                src={recipe.strMealThumb || "/placeholder.png"}
                alt={recipe.strMeal}
                width={640}
                height={160}
                priority
              />
              <div className="p-4">
                <button
                  onClick={() => handleSeeMore(recipe.idMeal)}
                  className="mt-2 px-4 py-2 text-black bg-gradient-to-r from-yellow-300 to-[#fefce8] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                >
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        recipeId={recipeID}
      />
    </div>
  );
};

export default AllRecipes;
