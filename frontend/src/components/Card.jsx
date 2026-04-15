import React from "react";

const Card = () => {
  return (
    <>
      <div className="flex items-center justify-center w-72 m-16 ">
        <div className="py-5 px-5 bg-amber-500 rounded-md">
          <div>
            <h1 className="text-2xl font-semibold mt-1">Name</h1>
          </div>
          <div>
            <p className="text-1xl font-normal mt-1">howimeet</p>
            <p className="text-1xl font-normal mt-1">when i meet </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
