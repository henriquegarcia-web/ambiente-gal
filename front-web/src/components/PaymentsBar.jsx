import React from "react";

const PaymentsBar = ({ credit, pix, bill }) => {
    return (
        <div className="flex items-center h-11 rounded-lg overflow-hidden">
            <div
                className="flex h-full bg-secondary-500 rounded-r-lg relative z-[3]"
                style={{ width: `${credit + 10}%` }}
            ></div>
            <div
                className="flex h-full bg-primary-400 rounded-r-lg ml-[-10px] relative z-[2]"
                style={{ width: `${pix + 10}%` }}
            ></div>
            <div
                className="flex h-full bg-gray-bar rounded-r-lg ml-[-10px] relative z-[1]"
                style={{ width: `${bill + 10}%` }}
            ></div>
        </div>
    );
};

export default PaymentsBar;
