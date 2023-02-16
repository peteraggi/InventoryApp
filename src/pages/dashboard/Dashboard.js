import React, { useEffect } from "react";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";
import Business from "../Business";


const Dashboard = () => {


return (
    <div>
      <ProductSummary  />
      <ProductList/>
    </div>
  );
};

export default Dashboard;