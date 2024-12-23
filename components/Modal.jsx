"use client";
import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SingleRecipe from "./Recipes/SingleRecipe";

const Modal = ({ isOpen, setIsOpen, recipeId }) => {  // Pass `recipeId` as a prop

  console.log(recipeId, "recipeId in modal page");

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-100"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="ease-in duration-200"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full bg-white max-w-lg lg:max-w-2xl px-4 py-4 text-left transition-all transform rounded-lg shadow-xl mt-20">
                {/* Pass `recipeId` to SingleRecipe */}
                <SingleRecipe recipeId={recipeId} setIsOpen={setIsOpen} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
