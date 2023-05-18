import React, { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../Components/Authentication/AuthContext";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Card, Label, Modal, Spinner, TextInput } from "flowbite-react";
import axios from "axios";
import StaffPromoTable from "../Components/Table/Staff/StaffPromoTable";
import StaffCreatePromoModal from "../Components/Modal/StaffCreatePromoModal";
import { AiOutlinePlus } from "react-icons/ai";

function StaffPromosPage() {
    const [filter, setFilter] = useState(null);
    const [promos, setPromos] = useState(null);
    const [createShow, setCreateShow] = useState(false);

    const { token } = useContext(AuthContext);

    const getPromos = useCallback(() => {
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
                            startDate: new Date(rows.startDate),
                            endDate: new Date(rows.endDate),
                            discount: rows.discountPercentage,
                        };
                        temp.push(temp_dict);
                    });
                    setPromos(temp);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [token]);

    useEffect(() => {
        getPromos();
    }, [getPromos]);

    return (
        <div className="mt-12 mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[100rem]">
            {promos ? (
                <div>
                    <p className="text-white text-4xl font-bold my-5">
                        List of Promos
                    </p>
                    <div className="flex justify-between mb-5">
                        <div className="w-2/5">
                            <TextInput
                                className="w-64"
                                id="name"
                                type="text"
                                icon={AiOutlineSearch}
                                placeholder="Search promo code"
                                onChange={(ev) => setFilter(ev.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                onClick={() => setCreateShow(true)}
                            >
                                <AiOutlinePlus className="mr-2" />
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
                        getPromos={getPromos}
                    />
                </div>
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default StaffPromosPage;
