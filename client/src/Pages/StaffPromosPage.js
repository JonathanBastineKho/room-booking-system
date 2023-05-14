import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Authentication/AuthContext";
import StaffRoomTable from "../Components/Table/Staff/StaffRoomTable";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Card, Label, Modal, Spinner, TextInput } from "flowbite-react";
import axios from "axios";
import StaffCreateRoomModal from "../Components/Modal/StaffCreateRoomModal";
import StaffPromoTable from "../Components/Table/Staff/StaffPromoTable";
import StaffCreatePromoModal from "../Components/Modal/StaffCreatePromoModal";

function StaffPromosPage() {
  const [filter, setFilter] = useState(null);
  const [promos, setPromos] = useState(null);
  const [createShow, setCreateShow] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    getPromos();
  }, []);
  // useEffect(() => {
  //   console.log(filter)
  // }, [filter])

  //   {
  //     promoCode: "STARRAILGIFT",
  //     startDate: setHours(new Date(), 9),
  //     endDate: setHours(new Date(), 10),
  //     discount: 20,
  // },

//   {
//     "discountPercentage": 50,
//     "endDate": "Fri, 06 Oct 2023 00:00:00 GMT",
//     "promoCode": "testPromoCode2",
//     "startDate": "Sat, 06 May 2023 00:00:00 GMT"
// }

  // need list of promos route
  // TODO: change temp_dict keys according to response
  const getPromos = () => {
    if (token) {
      axios
        .get("/api/view_all_promocodes", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const temp = [];
          res.data.Promocodes.forEach((rows) => {
            let temp_dict = {
              promoCode: rows.promoCode,
              startDate: rows.startDate,
              endDate: rows.endDate,
              discount: rows.discountPercentage
            };
            temp.push(temp_dict);
          });
          console.log(temp);
          setPromos(temp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  console.log(token);

  // useEffect(() => {
  //   console.log("filter: " + filter);
  // }, [filter])

  return (
    <div>
      {promos ? (
        <Card>
          <Label htmlFor="name" value="Search Promo Code" />
          <div className="flex justify-between mb-5">
            <div className="w-2/5">
              <TextInput
                id="name"
                type="text"
                icon={AiOutlineSearch}
                placeholder="Search promo code"
                onChange={(ev) => setFilter(ev.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={() => setCreateShow(true)}>
                Add Promo Code
              </Button>
            </div>
          </div>
          <StaffPromoTable
            hoverable={false}
            className="mb-10"
            data={promos}
            getPromos={getPromos}
            filter={filter}
          />
          <StaffCreatePromoModal
            show={createShow}
            onClose={() => setCreateShow(false)}
            data={promos}
          />
        </Card>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default StaffPromosPage;
