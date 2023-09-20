import React, { useEffect } from "react";
import LoadingCircle from "./LoadingCircle";

function LoadingProtector({ elementToDisable }) {

    useEffect(() => {

        const body = document.querySelector('html')

        body.classList.add('noscroll')

        elementToDisable && elementToDisable.forEach(ele => ele.classList.add("disable"))

        return () => {

            body.classList.remove('noscroll')

            elementToDisable && elementToDisable.forEach(ele => ele.classList.remove("disable"))
        };
    }, []);

    return <div className="w-screen h-screen absolute bg-gray-400/90 z-50 flex justify-center items-center">

        <LoadingCircle />

    </div>;
}

export default LoadingProtector;
