import { Inter } from "next/font/google";
import React, { useState, useEffect, use } from "react";

const inter = Inter({
    weight: ["300", "400", "500", "600", "700", "900"],
    subsets: ["latin"]
});

const Countdown = ({ targetDateStr }) => {
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(true);
    const [tempoPrincipal, setTempoPrincipal] = useState(0);

    useEffect(() => {
        // Parse targetDateStr into seconds
        const targetTimeArray = targetDateStr.split(':');
        const targetSeconds = parseInt(targetTimeArray[0]) * 3600 + parseInt(targetTimeArray[1]) * 60 + parseInt(targetTimeArray[2]);

        // Initialize tempoPrincipal from localStorage on component mount
        setTempoPrincipal(parseInt(localStorage.getItem("time")) || targetSeconds);
    }, []);

    const handleTime = () => {
        let tempo1 = 1;

        let timer = setInterval(() => {
            let tempo = 0;

            if (tempoPrincipal > 0) {
                tempo = tempoPrincipal - tempo1;
                tempo1 = tempo1 + 1;
                setTempoPrincipal(tempo); // Update state
                localStorage.setItem("time", JSON.stringify(tempo));
            } else {
                tempo = time - tempo1;
                tempo1 = tempo1 + 1

                setTempoPrincipal(tempo)
                localStorage.setItem("time", JSON.stringify(tempo));
            }

            if (tempo <= 0) {
                setStart(false);
                clearInterval(timer);
            }
        }, 1000);
    };

    useEffect(() => {
        if (start) {
            handleTime();
        }
    }, [start, tempoPrincipal]); // Include tempoPrincipal in the dependency array

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        let formatterTimeArray = formattedTime.split(':')
        return formatterTimeArray;
    };

    return (
        <div className="mb-8" style={{paddingTop:20}}>
            <div className="flex items-center m-auto w-max">

                <div className="flex flex-col items-center gap-1">
                    <p className={`${inter.className} text-xs font-medium text-white-400`} >
                        Horas
                    </p>
                    <span className={`${inter.className} text-3xl lg:text-6xl font-normal text-white-400 p-3 bg-primary-400 rounded-[5px] min-w-[60px] lg:min-w-[100px] flex items-center justify-center`} >
                        {formatTime(tempoPrincipal)[0]}
                    </span>
                </div>
                <span className={`${inter.className} text-4xl lg:text-6xl font-medium text-white-400 mt-4`} >
                    :
                </span>
                <div className="flex flex-col items-center gap-1">
                    <p className={`${inter.className} text-xs font-medium text-white-400`} >
                        Minutos
                    </p>
                    <span className={`${inter.className} text-3xl lg:text-6xl font-normal text-white-400 p-3 bg-primary-400 rounded-[5px] min-w-[60px] lg:min-w-[100px] flex items-center justify-center`} >
                        {formatTime(tempoPrincipal)[1]}
                    </span>
                </div>
                <span className={`${inter.className} text-4xl lg:text-6xl font-medium text-white-400 mt-4`} >
                    :
                </span>
                <div className="flex flex-col items-center gap-1">
                    <p className={`${inter.className} text-xs font-medium text-white-400`} >
                        Segundos
                    </p>
                    <span className={`${inter.className} text-3xl lg:text-6xl font-normal text-white-400 p-3 bg-primary-400 rounded-[5px] min-w-[60px] lg:min-w-[100px] flex items-center justify-center`} >
                        {formatTime(tempoPrincipal)[2]}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Countdown;
