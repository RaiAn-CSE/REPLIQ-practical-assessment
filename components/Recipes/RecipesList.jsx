"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import Modal from "../Modal";
import SingleRecipe from "./SingleRecipe";

const RecipesList = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // for the search query
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Query to get top recipes
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: HttpKit.getTopRecipes,
  });

  useEffect(() => {
    if (data) {
      setRecipes(data);
      setFilteredRecipes(data); // Initially show all recipes
    }
  }, [data]);

  useEffect(() => {
    if (searchInput) {
      // Filter recipes based on search input
      const filtered = recipes.filter((recipe) => {
        // Check if search input is found in either the recipe name or ingredients
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

  const handleSearch = (e) => {
    setSearchInput(e.target.value); // Update search query on input change
  };

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  if (isLoading) return <div>Loading recipes...</div>;
  if (error) return <div>Error loading recipes: {error.message}</div>;

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto grid items-center">
        <h1 className="text-2xl font-bold text-center">Top Recipes</h1>

        {/* Search form */}
        <form action="" className="mt-5 lg:mt-7 mx-5 lg:mx-10">
          <div className="relative flex p-1 rounded-full bg-white border border-yellow-200 shadow-md md:p-2">
            <input
              placeholder="Search by name or ingredient"
              className="w-full p-4 rounded-full outline-none bg-transparent "
              type="text"
              value={searchInput}
              onChange={handleSearch}
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

        {/* Recipe Grid */}
        <div className="relative py-16">
          <div className="container relative m-auto px-6 text-gray-500 md:px-12">
            <div className="grid gap-6 md:mx-auto md:w-8/12 lg:w-full lg:grid-cols-3">
              {filteredRecipes?.map((recipe) => (
                <RecipeCard
                  key={recipe?.id}
                  recipe={recipe}
                  handleDetailsOpen={handleDetailsOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={openDetails} recipeId={recipeId} setIsOpen={setOpenDetails}>
        <SingleRecipe recipeId={recipeId} setIsOpen={setOpenDetails} />
      </Modal>
    </div>
  );
};

export default RecipesList;
