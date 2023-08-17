import React, { useEffect } from "react";
import LoadingCircle from "./LoadingCircle";

function LoadingProtector() {

    useEffect(() => {

        const body = document.querySelector('html')
        body.classList.add('noscroll')

        // Cleanup function to restore scroll behavior when component unmounts
        return () => {
            body.classList.remove('noscroll')
        };
    }, []);

    return <div className="w-screen h-screen absolute bg-gray-400/90 z-50 flex justify-center items-center">

        <LoadingCircle />

    </div>;
}

export default LoadingProtector;
