import React, { useState } from "react";
import ProductForm from "../../components/product/productForm/ProductForm";


const AddProduct = () => {
  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
      />
    </div>
  );
};

export default AddProduct;