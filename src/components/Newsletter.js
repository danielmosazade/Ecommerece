import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Newsletter = () => {
const[email,setEmail]=useState("");
<script src="https://smtpjs.com/v3/smtp.js"></script>

let XDomainRequest="roung";
const Email = {
  send: function(a) {
    return new Promise(function(n, e) {
      a.nocache = Math.floor(1e6 * Math.random() + 1);
      a.Action = "Send";
      const t = JSON.stringify(a);
      Email.ajaxPost(
        "https://smtpjs.com/v3/smtpjs.aspx?",
        t,
        function(e) {
          n(e);
        }
      );
    });
  },
  ajaxPost: function(e, n, t) {
    const a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    a.onload = function() {
      const e = a.responseText;
      null != t && t(e);
    };
    a.send(n);
  },
  ajax: function(e, n) {
    const t = Email.createCORSRequest("GET", e);
    t.onload = function() {
      const e = t.responseText;
      null != n && n(e);
    };
    t.send();
  },
  createCORSRequest: function(e, n) {
    const t = new XMLHttpRequest();
    return "withCredentials" in t
      ? t.open(e, n, !0)
      : "undefined" != typeof XDomainRequest
      ? ((t = new XDomainRequest()), t.open(e, n))
      : (t = null), t;
  },
};

function sendEmail() {
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "danielmosezede@gmail.com",
    Password : "E95781E11BDEF06A1D3C4FCC61BB73E3DAC5",
    To : email,
    From : "danielmosezede@gmail.com",
    Subject : "NETA",
    Body : "היי חבר תודה רבה ששנרשמת לחנות שלנו נטע ירושלים אנחנו נעדכן את כתובת האיממיל הזאת בהטבות ובמבצעים שווים. "
}).then(
  // message => alert(message)
);
}

  return (
    <>
    <div className="NewsletterCon">
         <h1 className='NewsTitle'> New Updates !</h1>
         <div className="NewsDesc"> Get new updates on your favorite products</div>
          <div className="Newsnputcon">
          <input className='NewsText' placeholder='your email' type="text" onChange={(e) => setEmail(e.target.value)}/>
          <Link to={"/SentEmail"}>
          <button className='NewsBut' onClick={sendEmail()} ><SendIcon/></button>
          </Link>
          </div>
    </div>
</>

  )
}

export default Newsletter