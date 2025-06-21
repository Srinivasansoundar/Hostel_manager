import React from 'react';
import { FaUsers, FaBuilding, FaCheckCircle, FaBullseye } from 'react-icons/fa';

const InfoCard = ({ icon, label, value }) => {
    return (
            <div className="flex items-center px-2.5 border-r-2 border-blue-200  rounded shadow-sm w-24   lg:w-44 md:h-auto md:text-md lg:h-16">
                <div className="md:w-6 md:h-6 lg:w-9 lg:h-9 flex items-center justify-center rounded bg-blue-100 text-blue-500 mr-3">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-bold text-lg">{value}</span>
                </div>
            </div>
        
    );
};

const InfoCardList = ({bl}) => {
    const cardData = [
        { icon: <FaUsers />, label: 'Sharing', value: bl.sharing },
        { icon: <FaBuilding />, label: 'No of floors', value: bl.totalFloors },
        { icon: <FaCheckCircle />, label: 'Total rooms', value: bl.totalRooms },
        { icon:<FaBuilding /> ,label: 'Vacant Rooms', value:bl.totalVacantRooms},
    ];

    return (
        <div className="flex justify-between rounded-xl border-2 p-2 flex-wrap md:flex-nowrap mt-2 md:text-sm md:w-[500px] lg:w-[600px] bg-white">
            {cardData.map((card, index) => (
                <InfoCard key={index} icon={card.icon} label={card.label} value={card.value} />
            ))}
        </div>
    );
};

export default InfoCardList;
