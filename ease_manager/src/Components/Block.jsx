import React from 'react'
import { Card, ListGroup } from 'flowbite-react'
import { HiCloudDownload, HiInbox, HiOutlineAdjustments, HiUserCircle } from "react-icons/hi";
import "../styles/block.css"
import InfoCardList from './InfoCardList';
import Floor from './Floor';
function Block({ b }) {
    return (
        <div className="flex flex-col mt-12 md:flex-nowrap  md:flex-row bg-block  border-2 border-blue-300 rounded-tl-3xl rounded-br-3xl min-h-96 sm:gap-1 lg:gap-4 lg:p-2 lg:mx-auto lg:w-[990px] xl:w-[1000px]">
            {/* Left Column - Custom Card */}
            <div className="flex flex-col justify-center bg-dashboard">
                <div className="flex flex-row justify-around h-36 md:h-auto md:p-0 md:block md:ml-2 md:w-[200px]  xl:w-72 rounded-md shadow-md overflow-scroll scroll-container">
                    <img
                        src="./building.jpg"
                        alt="Meaningful alt text for an image that is not purely decorative"
                        className=" flex-1  h-full  md:w-full md:h-32 lg:h-48 "
                    />
                    <div className="p-4 flex-1 md:space-y-2 lg:space-y-4 md:text-sm">
                        <InfoRow label="Washroom:" value="Western/Indian" />
                        <InfoRow label="No of fans:" value="2" />
                        <InfoRow label="No of lights:" value="2" />
                        <InfoRow label="Other Facilities:" value="Yoga hall" />
                    </div>
                </div>
            </div>

            {/* Right Column - Block Info */}
            <div className="ml-5 flex-1 md:w-[400px]  md:h-80 md:overflow-scroll scroll-container xl:w-[450px] lg:h-auto  ">
                <div className="space-y-4 lg:w-full">
                    <h1 className="md:text-xl lg:text-2xl font-bold text-blue-900">{b.blockName}</h1>

                    {/* Pass `b` to InfoCardList */}
                    
                    <InfoCardList bl={b} />
                    

                    {/* Floors map */}
                    {b.floors.map((floor, ind) => (
                        <Floor key={ind} fl={floor} blo={b} />
                    ))}
                </div>
            </div>
        </div>
    )
}
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-blue-600 font-medium">{label}</span>
    <span className="text-gray-700 text-center">{value}</span>
  </div>
);
export default Block