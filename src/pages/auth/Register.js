import React, { useState, useEffect } from "react";
import "./register.scss";
import { Base64 } from "js-base64";
import { TiUserAddOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import user from "..//../app.config";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import FormsApi from "../../api/api";
import Home from "../Home/Home";

const Register = () => {
  const nav = useNavigate();

  const [apiFeedBackError, setApiFeedBackError] = useState(false);
  const [samePassword, setSamePassword] = useState(true);
  const [apiPhoneUsed, setApiPhoneUsed] = useState(false);
  const [termsCheckBox, setTermsCheckBox] = useState(false);
  const [submit, setSubmit] = useState(false);

  const form_submit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    if (_fcontent.repeat_password !== _fcontent.password) {
      setSamePassword(false);
      setApiFeedBackError(true);
      setSubmit(false);
      return;
    }
    let api = new FormsApi();
    let res = await api.post("/new", _fcontent);
    if (res === "Error") {
      setApiFeedBackError(true);
      setSubmit(false);
      return;
    }
    if (res.status === false) {
      if (res.data === "phone") {
        setApiPhoneUsed(true);
        setSubmit(false);
        return;
      } else {
        setApiFeedBackError(true);
        setSubmit(false);
        return;
      }
    } else {
      const data = Base64.encode(JSON.stringify({ ...res.result }));
      localStorage.setItem("token", data);
      setSubmit(false);
      window.location.replace("/");
    }
  };
  // useEffect(() => {
  //   if (user) {
  //     nav(-1);
  //   }
  // }, []);

  // if (user) return <Home />;
  return (
    <>
      <div>
      <div className="register-ctr card">
        <form onSubmit={form_submit}>
        <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
            <h2 style={{textAlign:"center", color:"red"}}>Register</h2>
          <div className="register-inputs-ctr-divided">
            <TextField
              label="Username"
              name="name"
              variant="outlined"
              color="primary"
              style={{ width: "48%" }}
            />
            <TextField
              label="Email Address"
              name="email"
              variant="outlined"
              color="primary"
              style={{ width: "48%" }}
            />
          </div>
          <div className="register-inputs-ctr-half-width">
            <TextField
              label="Telephone"
              name="tel"
              variant="outlined"
              color="primary"
              style={{ width: "100%", margin: "10px 0px" }}
              helperText={
                apiPhoneUsed ? "Phone already used" : ""
              }
            />
          </div>
          <div className="register-inputs-ctr-divided">
            <TextField
              label="Set Password"
              name="password"
              type="password"
              variant="outlined"
              color="primary"
              style={{ width: "48%" }}
              helperText={samePassword ? "" : "Passwords Don't Match"}
              error={!samePassword}
            />
            <TextField
              label="Confirm Password"
              name="repeat_password"
              type="password"
              variant="outlined"
              color="primary"
              style={{ width: "48%" }}
              helperText={
                samePassword
                  ? "Making sure, you dont go wrong"
                  : "Passwords Don't Match"
              }
              error={!samePassword}
            />
          </div>
          <div>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox color="primary" name="terms_and_conditions"
                  checked={termsCheckBox}
                  onChange={() => {
                    setTermsCheckBox(!termsCheckBox);
                  }} />
                }
                label="I agree to the Terms & Conditions of this System "
              />
            </FormGroup>
          </div>
          <div>
            <Button
              variant="outlined"
              type="submit"
              style={{ width: "100%", margin: "15px 0px" }}
              color={apiFeedBackError ? "secondary" : "primary"}
              disabled={!termsCheckBox}

            >
              <CircularProgress
                size={15}
                thickness={10}
                style={{
                display: submit ? "inline-block" : "none",
                marginRight: "20px",
                }}
              />
              {submit
                ? "Please Wait..."
                : apiFeedBackError
                ? "Something Went Wrong, Try again"
                : "Submit"}
            </Button>
          </div>
          <div style={{ width: "100%", marginBlock: "10px" }}>
            Already having an account?
            <Link to="/login">
              <span
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  marginLeft: "5px",
                }}
              >
                Sign in here
              </span>
            </Link>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default Register;
