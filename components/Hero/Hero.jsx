import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div>
      {/* BANNER */}
      <div className="relative bg-yellow-50 z-10">
        <div className=" container m-auto flex flex-wrap flex-col-reverse lg:flex-row px-2 md:px-2">
          {/* Text Section */}
          <div className="relative flex flex-col justify-center basis-full lg:basis-3/5 lg:py-24 xl:py-32 pl-10 pr-10 lg:pr-0 lg:pl-20 mb-16 lg:mb-0">
            <h1 className="font-bold text-yellow-900 text-3xl md:text-4xl lg:text-6xl">
              Your favorite dishes, <br /> right at your door
            </h1>
            <p className="mt-4 text-gray-700 text-sm md:text-base lg:text-lg lg:w-10/12">
              Order food and groceries online from the largest online food
              delivery platform.
            </p>
          </div>
          {/* Image Section */}
          <div className="relative basis-full lg:basis-2/5 mb-6 lg:mb-0">
            <Image
              src="/images/home/food.webp"
              className="relative w-full object-contain"
              alt="food illustration"
              loading="lazy"
              width={850}
              height={700}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
