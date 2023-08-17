import React from "react";
import { useEffect } from "react";

function Standings({ setLinkTo, setFrom, logos }) {

    useEffect(() => {

        console.log("Prebacen u Results")
        setFrom("Standings")
        setLinkTo("Results")

    }, [setLinkTo]);


    return <div className="w-full h-full bg-red-300 px-10 py-4">
        <div className="bg-gray-300 grid grid-cols-1">

            <div className=" border-b-1 border-black">
                <h2>Western Conference</h2>
                <p>asd</p>
            </div>
            <div className="border-b-1 border-black">
                <h2>Eastern Conference</h2>

            </div>



        </div>

    </div>;
}

export default Standings;
