"use client";
import React, { useState, useEffect } from "react";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import cartIcon from "../../public/icon/cart.svg";
import Button from "../shared/Button";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeID, setRecipeID] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // Search input state
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setRecipes(data);
      setFilteredRecipes(data); // Initially show all recipes
    }
  }, [data]);

  useEffect(() => {
    if (searchInput) {
      // Filter recipes based on the search input
      const filtered = recipes.filter((recipe) => {
        const searchTerm = searchInput.toLowerCase();
        return (
          recipe.strMeal.toLowerCase().includes(searchTerm) ||
          (recipe.strIngredients && recipe.strIngredients.toLowerCase().includes(searchTerm))
        );
      });
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes); // Show all recipes if search input is empty
    }
  }, [searchInput, recipes]);

  const handleSeeMore = (idMeal) => {
    setRecipeID(idMeal);
    setIsModalOpen(true);
  };

  const handleAddToCart = (recipe) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...cart, recipe];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${recipe.strMeal} has been added to your cart!`);
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value); // Update search query on input change
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        {/* Search and Go to Cart block */}
        <div className="lg:flex lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0 container mx-auto px-10 pt-5">
          <form className="max-w-md w-full">
            <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
              <input
                placeholder="Search by name or ingredient"
                className="w-full p-4 rounded-full outline-none bg-transparent"
                type="text"
                value={searchInput}
                onChange={handleSearch} // Update the search input state
              />
              <button
                type="button"
                title="Start searching"
                className="ml-auto py-3 px-6 rounded-full text-center transition bg-gradient-to-b from-yellow-200 to-yellow-300 hover:to-red-300 active:from-yellow-400 focus:from-red-400 md:px-12"
              >
                <span className="hidden text-yellow-900 font-semibold md:block">Search</span>
              </button>
            </div>
          </form>

          {/* Go to Cart Button */}
          <Button onClick={handleGoToCart} text="Go to Cart" />
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:mx-10 my-5">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="relative max-w-sm overflow-hidden nm_Container rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Image
                className="w-full h-auto object-cover"
                src={recipe.strMealThumb || "/placeholder.png"}
                alt={recipe.strMeal}
                width={640}
                height={360}
                priority
              />
              <h2 className="p-4 text-lg font-semibold mb-12">{recipe.strMeal}</h2>
              <div className="pt-4 px-4 w-full absolute bottom-4 flex justify-between">
                <Button
                  onClick={() => handleSeeMore(recipe.idMeal)}
                  text="See More"
                />
                <button
                  onClick={() => handleAddToCart(recipe)}
                  className="mt-2 px-4 py-1 text-black bg-yellow-300 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none flex items-center"
                >
                  <Image
                    className="border-2 border-white rounded-full p-1 mr-1 bg-white hover:p-0 transition-all duration-300"
                    src={cartIcon}
                    alt="Add to Cart"
                    width={30}
                    height={30}
                  />
                  <span className="font-semibold">Add Cart</span>
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
