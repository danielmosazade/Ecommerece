import React from "react";
import { Link } from "react-router-dom";

export default function SentEmail() {
  return (
    <>
      <div className="SentEmail">
        <div className="EmailConWrapper">
          <h1 className="EmailTitle">
         
            The email was sent successfully. If you don't see it, check that you
            entered the email correctly.
          </h1>
          <div className="ReturnCon">
            <Link className="btn btn-primary" to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
              return
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


