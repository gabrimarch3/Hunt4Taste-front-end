import Image from "next/image";
import React from "react";

const ExperienceCard = ({ title, description, imageUrl, buttonText }) => {
  return (
    <div className="max-w-full h-[300px] rounded-3xl overflow-hidden shadow-lg my-2">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          objectFit="cover"
          layout="fill"
          alt="description"
          className="rounded-t-3xl"
        />

          <button className="bg-[#485d8b] hover:bg-[#485d8b] text-white font-bold py-2 px-4 rounded-full absolute bottom-1.5 right-5 transform translate-y-1/2 group-hover:translate-y-0 transition-all duration-300">
            {buttonText}
          </button>
      </div>
      <div className="px-6 py-4">
        <div className="flex justify-between align-center">
          <div className="font-bold text-xl mb-2 text-[#365a83]">{title}</div>
        </div>
        <p className="text-[#5D5D5D] text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2"></div>
    </div>
  );
};

export default ExperienceCard;
