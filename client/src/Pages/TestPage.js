import React from "react";
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/User/UserCurrentTable";
import UserPastTable from "../Components/Table/User/UserPastTable";
import BookingSummaryCard from "../Components/Checkout/BookingSummaryCard";
import PaymentSummaryCard from "../Components/Checkout/PaymentSummaryCard";
import SuccessfulPaymentCard from "../Components/Checkout/SuccessfulPaymentCard";

export default function TestPage() {
    console.log("test page rendered");
    return (
        <div className="flex flex-col justify-center w-full items-center align-middle gap-5">
            TestPage
            <BookingSummaryCard />
            <PaymentSummaryCard />
            <SuccessfulPaymentCard />
            Test123
           
        </div>
    );
}
