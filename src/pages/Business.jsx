import {TextField } from '@mui/material'
import React from 'react';
import Card from '../components/card/Card';
import "./Design/business.scss";

function Business() {
  return (
    <>
    <h3 className="--mt">Add New Business</h3>
    <div className="inputCtr">
      <Card cardClass={"card"}>
        <form >
        <div className="inputs_ctr">
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
  )
}

export default Business