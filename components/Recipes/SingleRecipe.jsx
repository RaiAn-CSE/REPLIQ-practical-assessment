import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const SingleRecipe = ({ recipeId, setIsOpen }) => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", recipeId],
    queryFn: () => HttpKit.getRecipeDetails(recipeId),
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  if (error) return <p className="text-center text-lg text-red-500">Error fetching data</p>;

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="text-lg font-semibold text-gray-600 hover:text-gray-900"
        >
          Close
        </button>
      </div>

      <div className="flex flex-col items-center">
        <Image
          src={data?.strMealThumb}
          width={500}
          height={500}
          alt={data?.strMeal}
          className="rounded-lg shadow-lg"
        />
        <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800">{data?.strMeal}</h2>
        <p className="text-sm text-gray-500">{data?.strCategory} - {data?.strArea}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Ingredients</h3>
        <ul className="list-inside list-disc mt-2 space-y-2 text-gray-600">
          {data?.strIngredient1 && <li>{data.strMeasure1} {data.strIngredient1}</li>}
          {data?.strIngredient2 && <li>{data.strMeasure2} {data.strIngredient2}</li>}
          {data?.strIngredient3 && <li>{data.strMeasure3} {data.strIngredient3}</li>}
          {data?.strIngredient4 && <li>{data.strMeasure4} {data.strIngredient4}</li>}
          {data?.strIngredient5 && <li>{data.strMeasure5} {data.strIngredient5}</li>}
          {data?.strIngredient6 && <li>{data.strMeasure6} {data.strIngredient6}</li>}
          {data?.strIngredient7 && <li>{data.strMeasure7} {data.strIngredient7}</li>}
          {/* Continue for all ingredients... */}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Instructions</h3>
        <p className="text-gray-600 mt-2">{data?.strInstructions}</p>
      </div>

      {data?.strSource && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Recipe Source</h3>
          <a href={data.strSource} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 block">
            {data.strSource}
          </a>
        </div>
      )}

      {data?.strYoutube && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Video Instructions</h3>
          <a href={data.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 block">
            Watch the recipe video
          </a>
        </div>
      )}
    </div>
  );
};

export default SingleRecipe;
