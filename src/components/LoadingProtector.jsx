import React, { useEffect } from "react";
import LoadingCircle from "./LoadingCircle";

function LoadingProtector() {

    useEffect(() => {

        document.body.style.overflowY = 'hidden';

        // Cleanup function to restore scroll behavior when component unmounts
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    return <div className="w-screen h-screen absolute bg-gray-400/60 z-50 flex justify-center items-center">

        <LoadingCircle />

    </div>;
}

export default LoadingProtector;
