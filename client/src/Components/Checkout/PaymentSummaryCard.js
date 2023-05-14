import { react } from "react";
import { Card } from "flowbite-react";

export function PaymentSummaryCard() {


  const booking = {
    price: 15.00,
    discount: 3.00
  }

  const moneySyntax = (money) => {
    const formattedValue = `$${money.toFixed(2)}`;
    return formattedValue;
  };

  

  return (
    <Card href="#" className="w-96 rounded">
      <div className="flex flex-col gap-1 font-bold">
        <div className="flex w-full justify-between">
          <span className="text-white text-2xl pb-2">Price summary </span>
        </div>
        <div>
          <div className="flex w-full justify-between">
            <span className="text-white">Subtotal </span>{" "}
            <span className="text-zinc-400">{moneySyntax(booking.price)}</span>
          </div>
          <div className="flex flex-row w-full justify-between">
            <span className="text-white">Discount amount</span>{" "}
            <span className="text-zinc-400 pb-2">{moneySyntax(booking.discount)} </span>
          </div>
        </div>
        <div className="border-t-2">
          <div className="flex flex-row w-full justify-between text-2xl pt-2">
            <span className="text-white">Total </span>{" "}
            <span className="text-zinc-400">{moneySyntax(booking.price - booking.discount)} </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PaymentSummaryCard;
