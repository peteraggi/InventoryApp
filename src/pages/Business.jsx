import { Snackbar, TextField } from "@mui/material";
import React, { useState } from "react";
import Card from "../components/card/Card";
import "./Design/business.scss";
import { Alert as MuiAlert, Slide } from "@mui/material";
import FormsApi from "../api/api";
import user from "../app.config";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Business() {

  console.log(user);
  const navigate = useNavigate();
  const [state, setState] = useState({
    fieldsError: false,
    hostel_id: null,
    mui: {
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarStatus: "info",
      snackBarPosition: { vertical: "top", horizontal: "right" },
    },
  });

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
    let res = await api.post("/newbss", form_contents);
    if (res.data === "Business") {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: res.data,
          snackBarStatus: "warning",
          snackBarOpen: true,
        },
      });
    } else if (res.status === false) {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: res.data,
          snackBarStatus: "warning",
          snackBarOpen: true,
        },
      });
    } else {
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
        navigate("/dashboard");
      }, 2000);
    }
  };

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
        autoHideDuration={4000}
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
      <h3 className="--mt">Add New Business</h3>
      <div className="inputCtr">
        <Card cardClass={"card"}>
          <form onSubmit={submitProduct}>
            <div className="inputs_ctr">
              <input
                type="text"
                name="bss_owner_id"
                value={user.id}
                hidden
                onChange={() => {}}
              />
              <div className="inpts_on_left">
                <TextField
                  variant="outlined"
                  color="primary"
                  label="Business Name"
                  name="bss_name"
                  style={{
                    width: "75%",
                    margin: "15px",
                  }}
                />
                <TextField
                  required
                  variant="outlined"
                  color="primary"
                  label="Business Owner"
                  name="bss_owner"
                  style={{
                    width: "75%",
                    margin: "15px",
                  }}
                />
              </div>
              <div className="inpts_on_right">
                <TextField
                  required
                  variant="outlined"
                  color="primary"
                  label="Type of the Business"
                  name="bss_type"
                  style={{
                    width: "75%",
                    margin: "15px",
                  }}
                />
                <TextField
                  required
                  variant="outlined"
                  color="primary"
                  label="Business Location"
                  name="bss_location"
                  style={{
                    width: "75%",
                    margin: "15px",
                  }}
                />
              </div>
            </div>
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Create Business
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Business;
