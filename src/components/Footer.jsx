import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Twitter } from "@mui/icons-material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <div className="FooterCon">
      <div className="leftFooterCon">
        <h1 className="LeftTitle"> NETA</h1>
        <p className="FooterDesc">
          Ecommerce or electronic commerce is the trading of goods and services
          on the internet. It is your bustling city center or brick-and-morta r
          shop translated into zeroes and ones on the int ernet superhighway
        </p>
        <div className="SocialContainer">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="SocialIcon">
              <FacebookIcon />
            </div>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="SocialIcon">
              <InstagramIcon />
            </div>
          </a>

          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="SocialIcon">
              <Twitter />
            </div>
          </a>
          <a
            href="https://www.pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="SocialIcon">
              <PinterestIcon />
            </div>
          </a>
        </div>
      </div>
      <div className="centerFooterCon">
        <h3 className="CenterTitle">Useful links</h3>
        <ul className="CenterList">
          <Link
            to="Scroll-2"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <li className="CenterListItem">Home</li>
          </Link>
          <Link to="scroll" spy={true} smooth={true} offset={50} duration={500}>
            <li className="CenterListItem">Skirts</li>
            <li className="CenterListItem">Cart</li>
            <li className="CenterListItem"> Shirts</li>
            <li className="CenterListItem"> Dresess</li>
          </Link>
          <Link
            to="Scroll-3"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}
          >
            <li className="CenterListItem"> Best Product</li>
          </Link>
          <li className="CenterListItem">Terms</li>
        </ul>
      </div>

      <div className="rightFooterCon">
        <h1 className="RightTitle">contact</h1>
        <div className="RightContactItem">
          <FmdGoodIcon style={{ marginRight: "10px" }} /> King George 4
        </div>
        <div className="RightContactItem">
          <LocalPhoneIcon style={{ marginRight: "10px" }} /> 0549876321
        </div>
        <div className="RightContactItem">
          <MailIcon style={{ marginRight: "10px" }} />
          NETAContact@gmail.com
        </div>
        <a
          href="https://www.google.com/maps/place/King+George+4+Jerusalem"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="RightContactItem">View on Google Maps</div>
        </a>
        <img
          className="Payment"
          src="https://res.cloudinary.com/okay-rent-a-car/images/v1617474656/content/images/payment-method-no-credit-card-needed/payment-method-no-credit-card-needed.webp"
          alt=""
        />
      </div>
    </div>
  );
};

export default Footer;
