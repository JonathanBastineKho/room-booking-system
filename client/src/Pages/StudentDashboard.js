// Imported libraries
import React, { useRef } from "react";

// Imported local dependencies
import SearchCard from "../Components/Search/SearchCard";
import UserCurrentTable from "../Components/Table/User/UserCurrentTable";
import UserPastTable from "../Components/Table/User/UserPastTable";
import { Button } from "flowbite-react";

function StudentDashboard() {
    const ref = useRef(null);

    const handleScroll = () => {
        ref.current?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div className="w-full mt-20">
            <div className="flex flex-col items-center max-w-[85rem] mx-auto">
                <div className="w-full flex flex-wrap mt-8 mb-8">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
							Welcome to Your Booking Adventure
                        </h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
						Immerse Yourself in a Captivating Selection of Rooms, Each Offering a Distinctive Blend of Elegance and Comfort.
                        </p>
                        <Button
                            onClick={handleScroll}
                            class="inline-flex items-center justify-center px-2 py-1.5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                        >
                            View Booking
                            <svg
                                class="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </Button>
                    </div>
                    <SearchCard className="md:w-[36rem]" />
                </div>
                <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
                <div
                    ref={ref}
                    id="current_booking"
                    className="flex flex-col m-5 md:m-10 mt-10 overflow-x-auto w-full"
                >
                    <span className="text-white text-4xl font-bold mb-5">
                        Your Current Bookings
                    </span>
                    <UserCurrentTable />
                </div>
                <div
                    id="past_booking"
                    className="flex flex-col m-5 md:m-10 mt-10 overflow-x-auto w-full"
                >
                    <span className="text-white text-4xl font-bold mb-5">
                        Your Past Bookings
                    </span>

                    <UserPastTable />
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
