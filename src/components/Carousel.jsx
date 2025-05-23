// components/CarouselCard.jsx
import { useState, useEffect } from "react";

const carouselImages = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Media/HeroQ2/toys/MayART25/PC_Hero_Asin_3000x1200-STEM._CB795264357_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/PCA/NayanalkjllL/D239550536_PC_Hero_Asin_3000x1200._CB795077779_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/IN-Events/Shankhadip/MayART25/MAY25_GW_PC_Hero_H1_8PM_Ends-Midnight_2x._CB794858947_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img25/Camera/May-ART/event/Cam_Hero_3000x1200_Main._CB794892900_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img25/Media/PC_Hero_3000x1200_Asin-toys-2x._CB547414496_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg",
    
];

const CarouselCard = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    };

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % carouselImages.length);
    };

    return (
        <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[70vh] overflow-hidden">
            {carouselImages.map((img, i) => (
                <img
                    key={i}
                    src={img}
                    alt={`Slide ${i}`}
                    className={`absolute w-full h-full object-cover object-top transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-70"
            >
                ❮
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 sm:p-2 rounded-full hover:bg-opacity-70"
            >
                ❯
            </button>
        </div>
    );
};

export default CarouselCard;
