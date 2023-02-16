import { TextField } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = () => {
 return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form >
         <div className="inputs_ctr_fullwidth">

          <TextField
            variant="outlined"
            color="primary"
            label="Product Description"
            name="seller_phone"
            style={{ width: "100%" }}
            />
            </div>
         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Description"
            name="product_description"
            style={{ width: "100%" }}
            />
            </div>
          {/* <label>Product Price:</label> */}
         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Description"
            name="product_description"
            style={{ width: "100%" }}
            />
            </div>

         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Description"
            name="product_description"
            style={{ width: "100%" }}
            />
            </div>
            
         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Description"
            name="product_description"
            style={{ width: "100%" }}
            />
            </div>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
    );
};
export default ProductForm;
