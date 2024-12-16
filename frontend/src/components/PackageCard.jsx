import React from "react";
import { CalendarRangeIcon, IndianRupeeIcon } from "lucide-react";
import { Button } from "./ui/button";

const PackageCard = () => {
  return (
    <div className="border shadow-2xl bg-white p-4 mx-auto w-10/12 max-w-md rounded-lg">
      {/* Image Section */}
      <img
        className="w-full h-[200px] object-cover rounded-t-lg"
        src="https://s3.india.com/wp-content/uploads/2024/04/Feature-Image_-Shillong-4.jpg"
        alt="Scenic view of Shillong"
      />

      {/* Title Section */}
      <h1 className="font-bold text-xl mt-4">Explore Shillong</h1>

      {/* Description Section */}
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quam
        veritatis consequatur atque aspernatur dolorem mollitia, nobis expedita
        dicta fuga commodi omnis odio.
      </p>

      {/* Date and Price Section */}
      <div className="flex justify-between items-center my-4">
        {/* Date Range */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarRangeIcon className="w-5 h-5 text-gray-900" />
          <span>23rd Dec - 4th Jan</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 text-gray-800">
          <IndianRupeeIcon className="w-5 h-5 text-gray-500" />
          <span className="font-semibold text-xl">5500</span>
        </div>
      </div>

      {/* Button Section */}
      <Button className="w-full mt-2">Book Now</Button>
    </div>
  );
};

export default PackageCard;
