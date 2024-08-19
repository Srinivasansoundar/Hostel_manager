import React from 'react';
import { FaUsers, FaBuilding, FaCheckCircle, FaBullseye } from 'react-icons/fa';

const InfoCard = ({ icon, label, value }) => {
    return (
            <div className="flex items-center p-4 border-r-2 border-gray-200 rounded shadow-sm w-50 h-16">
                <div className="w-10 h-10 flex items-center justify-center rounded bg-blue-100 text-blue-500 mr-3">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-bold text-lg">{value}</span>
                </div>
            </div>
        
    );
};

const InfoCardList = () => {
    const cardData = [
        { icon: <FaUsers />, label: 'Sharing', value: '2' },
        { icon: <FaBuilding />, label: 'No of floors', value: '6' },
        { icon: <FaCheckCircle />, label: 'Available floor', value: '5' },
        { icon: <FaBullseye />, label: 'Currently vacant', value: '4' },
    ];

    return (
        <div className="flex space-x-2 border-2 mt-2">
            {cardData.map((card, index) => (
                <InfoCard key={index} icon={card.icon} label={card.label} value={card.value} />
            ))}
        </div>
    );
};

export default InfoCardList;
