import React from "react";
import useDate from "../hooks/useDate";
import useMonth from "../hooks/useMonth"

function NavBar({ date, setDate, isPlayoff, isOffseason }) {

    let [year, month, day] = date.split('-')

    month = useMonth(month)

    return <div className="px-6 py-2 flex items-center bg-gray-400 justify-between">

        <button>Standings</button>

        <h1 className="font-bold text-xl">
            {isPlayoff ? "PlayOff" : null}
            {isOffseason ? "Offseason" : null}
            {!isPlayoff && !isOffseason ? "Regular Season" : null}

        </h1>

        <div className="flex">

            <button onClick={() => setDate(useDate(date, -1))}>
                <svg className="transform rotate-180" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>

            <div className=" flex bg-black text-[#FFFF00]">
                <div className="font-bold text-xl">{day + "  "}</div>
                <div className="text-xl">{month + " "}</div>
                <div className="font-bold text-xl">{year}</div>
            </div>

            <button onClick={() => setDate(useDate(date, 1))}>
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>

        </div>

    </div>;
}

export default NavBar;
