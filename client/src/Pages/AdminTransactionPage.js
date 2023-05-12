import React from "react";
import AdminRoomChart from "../Components/Table/Admin/AdminRoomChart";
import AdminRoomTransactionTable from "../Components/Table/Admin/AdminTransactionTable";

function AdminTransactionPage() {
    return (
    <div>
        <AdminRoomChart />
        <AdminRoomTransactionTable />
    </div>
    );
}

export default AdminTransactionPage;
