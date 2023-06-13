import React from "react";
import notFound from "assets/images/PageNotFound.png"
const PageNotFound = () => {
  return (
    <div className="w-full h-screen">
      <img src={notFound} className=" h-screen w-full object-contain" alt="" />
    </div>
  );
};

export default PageNotFound;
