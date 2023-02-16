import React, { useState, useEffect } from "react";
import "./login.scss";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, TextField } from "@mui/material";
import FormsApi from "../../api/api";
import { Base64 } from "js-base64";
import user from "..//..//app.config";
import Home from "../Home/Home";

const Login = () => {
  const nav = useNavigate();
  // useEffect(() => {
  //   if (user) {
  //     nav(-1);
  //   }
  // });
  const [submit, setSubmit] = useState(false);
  const [apiFeedBackError, setApiFeedBackError] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);



  const form_submit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/user", _fcontent);
    if (res === "Error") {
      setApiFeedBackError(true);
      setSubmit(false);
      return;
    }
    if (res.status === false) {
      setApiFeedBackError(true);
      setSubmit(false);
    } else {
      if (rememberMe) {
        const data = Base64.encode(JSON.stringify(res.user));
        localStorage.setItem("token", data);
        setSubmit(false);
      } else {
        const data = Base64.encode(JSON.stringify(res.user));
        sessionStorage.setItem("token", data);
        setSubmit(false);
      }
      nav(0);
    }
  };
  // if (user) return <Home />;

  return (
    <>
      <div className="login_ctr card">
        <div className="--flex-center">
          <BiLogIn size={35} color="#999" />
        </div>
        <h2 style={{ textAlign: "center", color: "red" }}>Login</h2>
        <form onSubmit={form_submit}>
          <div className="login-inputs-ctr-divided">
            <TextField
              label="Telphone"
              name="tel"
              variant="outlined"
              color="primary"
              style={{ width: "48%" }}
              error={apiFeedBackError}
              helperText={
                apiFeedBackError
                  ? "Wrong Telephone or some network error"
                  : ""
              }
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              color="primary"
              style={{ width: "48%" }}
              error={apiFeedBackError}
              helperText={
                apiFeedBackError
                  ? "Wrong Password or some network error"
                  : ""
              }
            />
          </div>
          <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="rem_me"
                      checked={rememberMe}
                      onChange={() => {
                      setRememberMe(!rememberMe);
                      }}
                    />
                  }
                  label="Remember Me"
                />
              </FormGroup>
          <div className="lgin_btn_ctr">
              <Button
                color="primary"
                type="submit"
                variant={submit ? "outlined" : "contained"}
                style={{ width: "100%" }}
              >
                <CircularProgress
                  size={15}
                  thickness={10}
                  style={{
                    display: submit ? "inline-block" : "none",
                    marginRight: "20px",
                  }}
                />
                {submit ? "Please Wait..." : "Sign In"}
              </Button>
            </div>
        </form>
        <Link to="/forgot">Forgot Password</Link>
        <span
          className="register"
          style={{
            color: "blue",
            marginLeft: "5px",
          }}
        >
          <Link to="/">Home</Link>
          <p> &nbsp; Don't have an account? &nbsp;</p>
          <Link to="/register">Register</Link>
        </span>
      </div>
    </>
  );
};

export default Login;
