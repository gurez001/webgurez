import React from "react";
import Logo from "../../header/assets/Logo";
import { NavLink } from "react-router-dom";


export const FootLeft = () => {
  return (
    <>
      <div className="foot-left-row foot">
        <div className="foot-left-col">
          <div className="foot-logo">
            {/* <Logo /> */}
            <h4>Contact Info</h4>
          </div>
          <div className="contacts">
            <p><strong>Email:</strong> <br/>
            <NavLink to={"/"}>ecom@gurez.com</NavLink></p>
            <p>
              <strong>Working Hour:</strong><br/>
              Monday - Sunday
              <br />
              10:00 AM to 7:00 PM
            </p>
            <p>
             <strong> Our Store Address:</strong>
              <br />
              Near Church, Anand Vihar Colony, Karnal, Haryana 132001
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};
