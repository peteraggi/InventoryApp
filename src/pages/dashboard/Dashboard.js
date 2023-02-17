import React, { useEffect, useState } from "react";
import "../Design/dashbord.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import axios from "axios";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../components/infoBox/InfoBox";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Search from "..//..//components/search/Search";
import FormsApi from "../../api/api";
import user from "..//../app.config";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;


const Dashboard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    business: [],
    products: [],
    open: false,
    dialog: false,
  });

 const handleClose = () => {
    setState({ ...state, dialog: false });
  };
//   useEffect(()=>{
//     (async () => {
//         let pdtt = await new FormsApi().get(`/onepdt/${params.id}`);
//         if (pdtt !== "Error") {
//           if (pdtt.status !== false) {
//             setState({
//               ...state,
//               pdt: pdtt.result.pdt || {},
//             });
//           }
//         }
//       })();
//       return () => {
//         setState({
//           pdt: {},
//           files: [],
//           filesChanged: false,
//           mui: {
//             snackBarOpen: false,
//             snackBarMessage: "",
//             snackBarStatus: "info",
//             snackBarPosition: { vertical: "top", horizontal: "right" },
//           },
//         });
//       };
// }, []);

//delete product
const DeleteProduct = (id, e) => {
  e.preventDefault();
  axios
    .delete(`http://localhost:5050/api/v6/delete-pdt/${id}`)
    .then((res) => alert("Product Deleted"))
    .catch((err) => console.log(err));
};





  useEffect(() => {
    (async () => {
      const bss = await new FormsApi().get("/bss");
      const pdts = await new FormsApi().get("/pdt");
      if (bss === "Error" & pdts === "Error") {
      } else {
        if (bss.status) {
          let business = [];
          let products = [];
          bss.result.forEach((el) => {
            business.push(el);
          });
          pdts.result.forEach((i) =>{
            products.push(i);
          });
          setState({ ...state, business, products, });
        }
      }
    })();
  }, []);
// console.log(state.products);
const bssns = state.business.filter((v)=>{
   return v.id === params.id;
})
const bs = bssns ? bssns[0] : {};
const prods = state.products.filter((n)=>{
  return n.bss_id === params.id;
  setState({...state,})
  
})

const EditProduct = async (e) => {
  e.preventDefault();
  setState({
    ...state,
    mui: {
      ...state.mui,
      snackBarMessage: "Please Wait....",
      snackBarStatus: "info",
      snackBarOpen: true,
    },
  });
  let formDataInstance = new FormData(e.target);
  let form_contents = {};
  formDataInstance.forEach((el, i) => {
  form_contents[i] = el;
  });
  form_contents["confirmed"] = true;
  let res = await new FormsApi().put(`/pdt/${params.id}`,form_contents);
  if (res !== "Error") {
    if (res.status !== false) {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: "Product Edited Successfully....",
          snackBarStatus: "success",
          snackBarOpen: true,
        },
      });
      setTimeout(() => {
        navigate("/hostels");
      }, 2000);
    } else {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: " Failed to Edit Product, Server Error....",
          snackBarStatus: "warning",
          snackBarOpen: true,
        },
      });
    }
    
  } else {
    setState({
      ...state,
      mui: {
        ...state.mui,
        snackBarMessage:
          "Failed to Edit, Check your internet....",
        snackBarStatus: "warning",
        snackBarOpen: true,
      },
    });
  }
}

return (
    <>
      <div className="product-summary">
      <h4 className="--mt">{bs? bs.bss_name : ""} Inventory Statistics</h4>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={prods? prods.length : ""}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
        //   count={`$${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count="9"
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count="9"
          bgColor="card4"
        />
      </div>
    </div>
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h4>Inventory Items</h4>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        <div className="recent_project_ctr">
        <div className="card">
          <div className="pdts-header-btns">
              <div>
                <h4>Products</h4>
              </div>
              <div>
                {/* <Link to="/new-product"> */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginInline: 10, padding:"9px" }}
                    onClick={() => {
                    navigate(`/new-product?businesss=${params.id}`);
                    }}
                  >
                    Add Product
                  </Button>
                {/* </Link> */}
              </div>
            </div>
          <div className="card-body">
            <table width="100%">
              <thead>
                <tr>
                  <td>Product Name</td>
                  <td>Product Brand</td>
                  <td>Product Des</td>
                  <td>Product Quantity</td>
                  <td>Product Price</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {prods.length === 0 ? (
                  <tr>
                    <td>No Products to display...</td>
                  </tr>
                ) : (
                  prods.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.pdt_name}</td>
                        <td>{v.pdt_brand}</td>
                        <td>{v.pdt_description}</td>
                        <td>{v.pdt_quantity}</td>
                        <td>{v.pdt_price}</td>
                        <td>
                          <Link to={`/dashboard/${v.id}`}>
                            <Button variant="outlined" color="primary">
                              Sell
                            </Button>
                          </Link>
                        </td>
                        <td>
                            <Button variant="contained" color="primary"
                               onClick={() => {
                                setState({ ...state, dialog: true });
                              }}>
                              Edit
                            </Button>
                        </td>
                        <td>
                        <Link to="/bss/edit">
                            <Button variant="contained" color="primary"
                               onClick={() => {
                                let arr = prods;
                                arr.splice(i, 1);
                                setState({
                                  ...state,
                                  prods: arr,
                                });
                              }}
                              >
                              Delete
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>

    <Dialog
          open={state.dialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit product</DialogTitle>
          <form autoComplete="off" onSubmit={EditProduct}>
          <input
            type="text"
            name="bss_id"
            value={params.id}
            hidden
            onChange={() => {}}
            />
            <DialogContent>
              <DialogContentText>
                <TextField
                  name="pdt_name"
                  variant="standard"
                  label="Product Name"
                  style={{
                  width: "85%",
                  margin: "20px",
                  }}
                  // value={state.pdt.pdt_name || " "}
                  // onChange={(e) => {
                  //   setState({
                  //     ...state,
                  //     pdt: {
                  //       ...state.pdt,
                  //       pdt_name: e.target.value,
                  //     },
                  //   });
                  // }}
                />
                <TextField
                  name="pdt_description"
                  variant="standard"
                  label="Product Description"
                  style={{
                  width: "85%",
                  margin: "20px",
                  }}
                />
                <TextField
                  name="pdt_quantity"
                  variant="standard"
                  label="Product Quantity"
                  style={{
                  width: "85%",
                  margin: "20px",
                  }}
                />
                <TextField
                  name="pdt_brand"
                  variant="standard"
                  label="Product Brand"
                  style={{
                  width: "85%",
                  margin: "20px",
                  }}
                />
                <TextField
                  name="pdt_price"
                  variant="standard"
                  label="Product Price"
                  style={{
                  width: "85%",
                  margin: "20px",
                  }}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
    </>
  );
};

export default Dashboard;