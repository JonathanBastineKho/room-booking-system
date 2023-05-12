import React from "react";
import AdminRoomTable from "../Components/Table/Admin/AdminRoomTable";

function AdminRoomPage() {
    return (
        <div className="mt-12 mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:max-w-[120rem]">
            <p className="text-white text-4xl font-bold mb-5">UOW Room List</p>
            <AdminRoomTable />
        </div>
    );
}

export default AdminRoomPage;
