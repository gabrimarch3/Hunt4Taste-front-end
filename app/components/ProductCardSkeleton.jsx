import React from "react";
import Skeleton from "@mui/material/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md m-2 p-3 w-64">
      <Skeleton variant="rectangular" width="100%" height={180} />

      <div className="p-2">
        <Skeleton variant="text" height={20} style={{ marginBottom: '8px' }} />
        <Skeleton variant="text" height={20} width="80%" style={{ marginBottom: '8px' }} />
        <Skeleton variant="text" height={20} width="60%" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
