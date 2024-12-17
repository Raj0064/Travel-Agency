import React from "react";
import { CalendarRangeIcon, IndianRupeeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const PackageCard = ({pack}) => {
  const navigate=useNavigate();
  return (
    <div className="shadow-2xl bg-card-background p-4 mx-auto w-10/12 max-w-md rounded-lg">
      {/* Image Section */}
      <img
        className="w-full h-[200px] object-cover rounded-t-lg"
        src={pack.imageUrl}
        alt="Scenic view of Shillong"
      />

      {/* Title Section */}
      <h1 className="font-bold text-xl mt-4 text-foreground">{pack.title}</h1>

      {/* Description Section */}
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
        {pack.description}
      </p>

      {/* Date and Price Section */}
      <div className="flex justify-between items-center my-4">
        {/* Date Range */}
        <div className="flex items-center gap-2 text-sm text-foreground">
          <CalendarRangeIcon className="w-5 h-5 text-muted-foreground" />
          <span>{new Date(pack.startDate).toLocaleDateString("en-GB")} {" - "}
            {new Date(pack.endDate).toLocaleDateString("en-GB")}</span>
        </div>

        {/* Price */}
        <div className="font-semibold text-xl">₹ {pack.price} </div>
      </div>

      {/* Button Section */}
      <Button onClick={()=>navigate(`/book/${pack._id}`)} className="w-full mt-2">
        Book Now
      </Button>
    </div>
  );
};

export default PackageCard;
