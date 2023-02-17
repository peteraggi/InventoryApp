import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormsApi from "../api/api";
import user from "../app.config";
function Businesses() {
  const [state, setState] = useState({
    businesses: [],
    mui: {
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarStatus: "info",
      snackBarPosition: { vertical: "top", horizontal: "right" },
    },
  });
  console.log(user);
  useEffect(() => {
    (async () => {
      const bsses = await new FormsApi().get("/bss");
      // console.log(bsses);
      if (bsses !== "Error") {
        if (bsses.status !== false) {
          setState({
            ...state,
            businesses: bsses.result,
          });
        }
      }
    })();
  }, []);
  

  return (
    <>
      <div className="recent_project_ctr">
        <div className="card">
          <div className="card-header">
            <h3>Businesses</h3>
          </div>
          <div className="card-body">
            <table width="100%">
              <thead>
                <tr>
                  <td>Business Name</td>
                  <td>Business Owner</td>
                  <td>Business Location</td>
                  <td>Business type</td>
                  <td>Navigate</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                {state.businesses.length === 0 ? (
                  <tr>
                    <td>No Businesses to display...</td>
                  </tr>
                ) : (
                  state.businesses.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.bss_name}</td>
                        <td>{v.bss_owner}</td>
                        <td>{v.bss_location}</td>
                        <td>{v.bss_type}</td>
                        <td>
                          <Link to={`/dashboard/${v.id}`}>
                            <Button variant="outlined" color="primary">
                              Go to Dashboard
                            </Button>
                          </Link>
                        </td>
                        <td>
                        <Link to="/bss/edit">
                            <Button variant="contained" color="primary">
                              Edit
                            </Button>
                          </Link>
                        </td>
                        <td>
                        <Link to="/bss/edit">
                            <Button variant="contained" color="primary">
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
    </>
  );
}

export default Businesses;
