import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/slider.css"
const Card = ({ image, title, date, description }) => {
  return (
    <div className=" sli flex h-50  bg-white shadow-md rounded-lg overflow-hidden">
      {/* Left Side: Image */}
      <div className="w-1/3">
        <img src={image} alt={title} className="card w-full h-30 object-cover" />
      </div>
      
      {/* Right Side: Content */}
      <div className="w-2/3 p-4 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-purple-600">{title}</h2>
        <p className="text-gray-500 mb-2">{date}</p>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const Cardslider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const cardsData = [
    {
      image: './fees.jpg',
      title: 'FEES PAYMENT',
      date: '27/06/24',
      description: 'We are excited to announce that our college will be hosting its Hostel Day celebrations...',
    },
    {
        image: './room.jpg',
        title: 'HOSTEL DAY',
        date: '27/06/24',
        description: 'We are excited to announce that our college will be hosting its Hostel Day celebrations...',
      },
    // Add more cards as needed
  ];

  return (
    <Slider {...settings}>
      {cardsData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          date={card.date}
          description={card.description}
        />
      ))}
    </Slider>
  );
};

export default Cardslider;
