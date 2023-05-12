import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Components/Authentication/AuthContext";
import StaffRoomTable from "../Components/Table/Staff/StaffRoomTable";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Card, Label, TextInput } from "flowbite-react";

function StaffRoomsPage() {
  const [filter, setFilter] = useState(null);
  const { token } = useContext(AuthContext);
  console.log(token);

  useEffect(() => {
    console.log(filter);
  }, [filter])

  return (
    <div>
      {/* search top left
      add rooms top right */}
      <Card>
      <Label htmlFor="name" value="Search Room Name" />
        <div className="flex justify-between mb-5">
          <div className="w-2/5">
            
            <TextInput
              id="name"
              type="text"
              icon={AiOutlineSearch}
              placeholder="Search room name"
              onChange={(ev) => setFilter(ev.target.value)}
            />
          </div>
          <div className="flex justify-end">
          <Button type="button" >
            Add Room
            </Button>
          </div>
        </div>

        <StaffRoomTable hoverable={false} className="mb-10" />
      </Card>
    </div>
  );
}

export default StaffRoomsPage;
