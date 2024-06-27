import React, { useEffect, useState } from "react";

const Container = ({ children }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (window.innerWidth > 1024) {
            setWidth(window.innerWidth - 240);
            return;
        }

        setWidth(window.innerWidth - 56);
    }, []);

    return (
        <div style={{ maxWidth: width }} className={`w-full h-screen overflow-y-scroll ml-auto dark:bg-black-600`} >
            {children}
        </div>
    );
};

export default Container;
