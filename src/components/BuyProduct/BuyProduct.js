import React from "react";
import Sidebar from "./Sidebar";
import imgdv from "../../Images/dev.jpeg";
import imginfo from "../../Images/buy_info.jpeg";
import "./buy.css";

const BuyProduct = () => {
  // Function to handle button click
  const handleBuyClick1 = () => {
    window.open("https://iotaii.com/id-card-tracking", "_blank");
  };
  const handleBuyClick2 = () => {
    window.open("https://iotaii.com/vehicle-telematics", "_blank");
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-start justify-start h-screen w-screen py-8 px-20">
        <h1 className="text-4xl font-bold mb-6">Buy Product</h1>
        <div className="flex flex-row justify-between w-full">
          <div className="ml-40">
            <h1 className="text-lg mb-2">Order Tracker</h1>
            <img
              src={imgdv}
              alt="Device"
              className="w-55 h-64 md:w-55  md:h-80 object-cover rounded-xl"
            />
          </div>
          <div className="mr-30">
            <h1 className="text-lg mb-8   ">Buy car device</h1>
            <img src={imginfo} alt="Buy Info" className="w-96 h-auto" />
          </div>
        </div>
        <div className="flex justify-between w-full mt-8">
          {/* Button 1 */}
          <button className="cta cta--is-11 custom-button1" onClick={handleBuyClick1}>
            <span>Buy</span>
          </button>
          {/* Button 2 */}
          <button className="cta cta--is-11 custom-button1" onClick={handleBuyClick2}>
            <span>Buy</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyProduct;
