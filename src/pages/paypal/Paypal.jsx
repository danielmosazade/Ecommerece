import { CLIENT_ID } from './config'
import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = () => {
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        let currentBuyer = 'default';
       
        if(localStorage.getItem('currentEmail')) {
          currentBuyer = localStorage.getItem('currentEmail');
        }

        let currentCart = localStorage.getItem('cart-' + currentBuyer);

        currentCart = JSON.parse(currentCart);


        // The function to create an order
        var items = [];
        var total = 0;

        for (var i = 0; i < currentCart.length; i++) {
          var item = currentCart[i];

          items.push({
            name: String(item.id),
            description: item.description,
            unit_amount: {
              value: parseFloat(item.price)
            },
            quantity: item.count
          });

          total += parseFloat(item.price) * parseFloat(item.count);
        }

        // console.log(items, total);

        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: 'USD',
              value: total.toFixed(2)
            }
            // ,
            // items: items
          }],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    },[success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </div>
        </PayPalScriptProvider>
    );
}

export default Paypal;