import React, { useState } from "react";
import { Button } from "flowbite-react";
import { Navbar } from "flowbite-react";
import PaymentDetails from "../Components/Checkout/PaymentDetails";
import paynowQR from "../Assets/image/paynowQR.jpeg";


function PaymentPage(){

    return (
        <div className="w-full flex justify-center mt-24">
            <img src = {paynowQR} className="w-96 mr-10"></img>
           <PaymentDetails />
           {/* test */}
        </div>
    )

}

export default PaymentPage;