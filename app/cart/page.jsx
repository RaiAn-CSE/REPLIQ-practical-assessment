"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Button from "../shared/Button";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveItem = (idMeal) => {
    // Remove item from cart
    const updatedCart = cartItems.filter((item) => item.idMeal !== idMeal);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDetails = (idMeal) => {
    // Open the modal and set the selected recipe ID
    setSelectedRecipeId(idMeal);
    setIsModalOpen(true);
  };

  const handleContinueShopping = () => {
    router.push("/all-recipes");
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <button
            onClick={handleContinueShopping}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:mx-10 my-5">
          {cartItems.map((item) => (
            <div
              key={item.idMeal}
              className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <Image
                className="w-full h-auto object-cover"
                src={item.strMealThumb || "/placeholder.png"}
                alt={item.strMeal}
                width={640}
                height={160}
              />
              <h2 className="p-4 text-lg font-semibold mb-12">{item.strMeal}</h2>
              <div className="pt-4 px-4 w-full absolute bottom-4 flex justify-between">
                <button
                  onClick={() => handleRemoveItem(item.idMeal)}
                  className="mt-2 px-4 py-2 text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                >
                  Remove
                </button>
                {/* <button
                  onClick={() => handleDetails(item.idMeal)}
                  className="mt-2 px-4 py-2 text-black bg-gradient-to-r from-yellow-300 to-[#fefce8] rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                >
                  Details
                </button> */}

                <Button
                  onClick={() => handleDetails(item.idMeal)}
                  text="Details"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          {/* <button
            onClick={handleContinueShopping}
            className="mt-2 px-4 py-2 text-black bg-yellow-300 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          >
            Continue Shopping
          </button> */}

          <Button
            onClick={handleContinueShopping}
            text="Continue Shopping"
          />
        </div>
      </div>

      {/* Modal for showing recipe details */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        recipeId={selectedRecipeId}
      />
    </div>
  );
};

export default Cart;
