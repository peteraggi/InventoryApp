import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">peter</span>
        </h3>
        <button
          className="--btn --btn-danger"
          onClick={() => {
            const token_stored = localStorage.getItem("token");
            if (token_stored) {
              localStorage.removeItem("token");
            } else {
              sessionStorage.removeItem("token");
            }
            window.location.replace("/");
          }}
        >
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
