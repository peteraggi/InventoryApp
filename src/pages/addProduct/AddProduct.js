import { Button, Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import FormsApi from "../../api/api";
import Card from "../../components/card/Card";
import "../Design/product.scss";
import { Alert as MuiAlert, Slide } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    mui: {
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarStatus: "info",
      snackBarPosition: { vertical: "top", horizontal: "right" },
    },
  });




  const url_params = new URLSearchParams(window.location.search);
  const bss_id = url_params.get("businesss");
  console.log(bss_id);

  const submitProduct = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      mui: {
        ...state.mui,
        snackBarMessage: "Please Wait...",
        snackBarStatus: "info",
        snackBarOpen: true,
      },
    });
    let fd = new FormData(e.target);
    let form_contents = {};
    fd.forEach((value, name) => {
    form_contents[name] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/newpdt", form_contents);
    if(res.data ==="product already exists"){
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: res.data,
          snackBarStatus: "warning",
          snackBarOpen: true,
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }else if(res.status === false){
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: res.data,
          snackBarStatus: "warning",
          snackBarOpen: true,
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }else{
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: res.data,
          snackBarStatus: "success",
          snackBarOpen: true,
        },
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
}

const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setState({
    ...state,
    mui: {
      ...state.mui,
      snackBarMessage: "",
      snackBarOpen: false,
      snackBarStatus: "info",
    },
  });
};
  return (
    <>
        <Snackbar
        open={state.mui.snackBarOpen}
        anchorOrigin={state.mui.snackBarPosition}
        autoHideDuration={6000}
        onClose={handleClose}
        message={state.mui.snackBarMessage}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={handleClose}
          severity={state.mui.snackBarStatus}
          sx={{ width: "100%" }}
        >
          {state.mui.snackBarMessage}
        </Alert>
      </Snackbar>
      <div className="pdts-header-btns">
        <div>
      <h3 className="--mt">Add New Product</h3>
      </div>
      <div>
          {/* <Link to="/new-product"> */}
          <Button
            variant="contained"
            color="primary"
            style={{ marginInline: 10, padding: "10px" }}
            onClick={() => {
            navigate(`/new-product?businesss=${params.id}`);
            }}
            >
            Back
          </Button>
            {/* </Link> */}
              </div>
      </div>
      <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={submitProduct}>
         <div className="inputs_ctr_fullwidth">
         <input
            type="text"
            name="bss_id"
            value={bss_id}
            hidden
            onChange={() => {}}
            />
          <TextField
            variant="outlined"
            color="primary"
            label="Product Name"
            name="pdt_name"
            style={{ width: "100%" }}
            />
            </div>
         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Description"
            name="pdt_description"
            style={{ width: "100%" }}
            />
            </div>
         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Quantity"
            name="pdt_quantity"
            style={{ width: "100%" }}
            />
            </div>

         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Brand"
            name="pdt_brand"
            style={{ width: "100%" }}
            />
            </div>
            
         <div className="inputs_ctr_fullwidth">
          <TextField
            required
            variant="outlined"
            color="primary"
            label="Product Price"
            name="pdt_price"
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

    </>
  );
};

export default AddProduct;