import React from "react";
import useCalendar from "../hooks/useCalendar";
import useConvertMonth from "../hooks/useConvertMonth"
import { Link } from "react-router-dom";

function NavBar({ date, setDate, isPlayoff, isOffseason, linkTo }) {

    let [year, month, day] = date.split('-')

    month = useConvertMonth(month)

    let link
    if (linkTo == "Standings")
        link = "standings"
    else if (linkTo == "Results")
        link = '/'

    return <div className="px-2 py-2 grid grid-cols-3 bg-gray-400">
        {/* px-10 py-2 */}
        <div className="flex items-center">
            <Link to={link}>{linkTo}</Link>
        </div>

        <div className="flex justify-center">
            <h1 className="font-bold text-l">
                {isPlayoff ? "PlayOff" : null}
                {isOffseason ? "Offseason" : null}
                {!isPlayoff && !isOffseason ? "Regular Season" : null}

            </h1>
        </div>

        <div className="flex justify-end items-center">
            <div className="flex">

                <button onClick={() => setDate(useCalendar(date, -1))} aria-label="Left">
                    <svg className="transform rotate-180" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>

                <div className="flex bg-black text-[#FFFF00]">
                    <div className="font-bold text-md">{day + "  "}</div>
                    <div className="text-md">{month + " "}</div>
                    <div className="font-bold text-md">{year}</div>
                </div>

                <button onClick={() => setDate(useCalendar(date, 1))} aria-label="Right">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>

            </div>
        </div>

        {/* <Link to={link}>{linkTo}</Link>

        <h1 className="font-bold text-xl">
            {isPlayoff ? "PlayOff" : null}
            {isOffseason ? "Offseason" : null}
            {!isPlayoff && !isOffseason ? "Regular Season" : null}

        </h1>

        <div className="flex">

            <button onClick={() => setDate(useDate(date, -1))} aria-label="Left">
                <svg className="transform rotate-180" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>

            <div className=" flex bg-black text-[#FFFF00]">
                <div className="font-bold text-xl">{day + "  "}</div>
                <div className="text-xl">{month + " "}</div>
                <div className="font-bold text-xl">{year}</div>
            </div>

            <button onClick={() => setDate(useDate(date, 1))} aria-label="Right">
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>

        </div> */}

    </div>;
}

export default NavBar;
