import React, { useState } from "react";
import { useEffect, useRef } from "react";
import GetStats from "../controllers/formatData/FormatStats";
import BoxResult from "../components/BoxResult"
import useGetLastWord from "../hooks/useGetLastWord"
import TeamsColor from "../controllers/TeamsColor";
import SortStats from "../controllers/SortStats";

function DetailsWindow({ setShowDetails, currentGameId, currentGame, logos }) {

    const [homeStats, setHomeStats] = useState()
    const [visitorStats, setVisitorStats] = useState()

    const [whichStats, setWhichStats] = useState()
    const [displayedStats, setDisplayedStats] = useState()


    const detailsRef = useRef(null)
    const homeStatsRef = useRef(null)
    const visitorStatsRef = useRef(null)
    const playersStatsRef = useRef(null)

    useEffect(() => {

        const body = document.querySelector('html')
        body.classList.add('noscroll')

        // Cleanup function to restore scroll behavior when component unmounts
        return () => body.classList.remove('noscroll')
    }, []);



    useEffect(() => {
        //Fetches, formats and sets Stats   
        FetchData()

        HandleSideEffects()

    }, []);

    useEffect(() => {
        let color = "transparent"
        if (whichStats === "home") {
            homeStatsRef.current.style.backgroundColor = "gray"
            playersStatsRef.current.style.backgroundColor = color
            visitorStatsRef.current.style.backgroundColor = color
        }
        else if (whichStats === "players") {
            playersStatsRef.current.style.backgroundColor = "gray"
            visitorStatsRef.current.style.backgroundColor = color
            homeStatsRef.current.style.backgroundColor = color
        }
        else if (whichStats === "visitors") {
            visitorStatsRef.current.style.backgroundColor = "gray"
            playersStatsRef.current.style.backgroundColor = color
            homeStatsRef.current.style.backgroundColor = color
        }

    }, [whichStats]);


    async function FetchData() {

        let [first_team, second_team] = await GetStats(currentGameId)

        let home_stats
        let visitor_stats

        if (first_team[1].team_abbr === currentGame.home_team_abbreviation) {
            home_stats = first_team
            visitor_stats = second_team
        }
        else {
            home_stats = second_team
            visitor_stats = first_team
        }

        setHomeStats(home_stats)
        setVisitorStats(visitor_stats)

        setDisplayedStats(home_stats)
        setWhichStats("home")

    }

    function ChangeDisplayedStats(team, stat) {
        setWhichStats(team)
        setDisplayedStats(stat)
    }

    function HandleSortedStats(stats, typeOfStat, isFalling) {

        const sortedStats = SortStats(stats, typeOfStat, isFalling)

        setDisplayedStats(sortedStats)

    }

    function HandleSideEffects() {
        //Focuses on the div via ref so that we can unshow it when the onBlur activates
        if (currentGame && displayedStats)
            detailsRef.current.focus();


    }

    return <div className="w-[100%] h-[100%] z-40 fixed  p-2 top-0 flex justify-center items-center ">

        {currentGame && displayedStats && (

            <div ref={detailsRef} tabIndex="0" className="bg-white flex flex-col relative h-[85%] border-2 border-black rounded-lg z-50 p-2 sm:p-4 overflow-hidden focus:outline-none" >
                {/* onBlur={() => setShowDetails(false)} */}
                <>
                    <h2> DETAILS</h2>

                    <BoxResult game={currentGame} logos={logos} home_name={useGetLastWord(currentGame.home_team)} visitor_name={useGetLastWord(currentGame.visitor_team)} />

                    <div onClick={() => setShowDetails(false)} className="absolute top-2 right-2 rounded-full cursor-pointer bg-gray-300 ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="butt" strokeLinejoin="bevel"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>                    </div>

                    <div className="grid grid-cols-3 my-2 border-2 ">
                        <div tabIndex="0" ref={homeStatsRef} onClick={() => ChangeDisplayedStats("home", homeStats)} className="flex justify-center cursor-pointer">{currentGame.home_team_abbreviation}</div>
                        <div tabIndex="0" ref={playersStatsRef} onClick={() => ChangeDisplayedStats("players", homeStats)} className="flex justify-center border-x-2 cursor-pointer">Players</div>
                        <div tabIndex="0" ref={visitorStatsRef} onClick={() => ChangeDisplayedStats("visitors", visitorStats)} className="flex justify-center cursor-pointer">{currentGame.visitor_team_abbreviation}</div>
                    </div>
                </>
                {/* style={{ color: `#${TeamsColor(currentGame.visitor_team_abbreviation)}` }} */}
                <>
                    <ul className="grid border overflow-auto">
                        <li className="sticky top-0 bg-white grid border boxshadow statsgrid">
                            <span className="col-span-2 grid_header">name</span>
                            <span onClick={() => HandleSortedStats(displayedStats, "pts", true)} className="grid_header">pts</span>
                            <span onClick={() => HandleSortedStats(displayedStats, "reb", true)} className="grid_header">reb</span>
                            <span onClick={() => HandleSortedStats(displayedStats, "stl", true)} className="grid_header">stl</span>
                            <span onClick={() => HandleSortedStats(displayedStats, "ast", true)} className="grid_header">ast</span>
                            <span onClick={() => HandleSortedStats(displayedStats, "blk", true)} className="grid_header">blk</span>
                            <span onClick={() => HandleSortedStats(displayedStats, "turnover", true)} className="grid_header">tov</span>
                            <span onClick={() => HandleSortedStats(displayedStats, "min", true)} className="grid_header">min</span>
                        </li>

                        {displayedStats.map((player, index) => {
                            return <li key={index} className="grid statsgrid border hover:bg-gray-200"
                                style={index % 2 == 1 ? { backgroundColor: "rgb(239, 242, 245)" } : null}
                            >

                                <span className="grid_item col-span-2 px-2">{player.first_name} {player.last_name}</span>
                                <span className="grid_item">{player.pts}</span>
                                <span className="grid_item">{player.reb}</span>
                                <span className="grid_item">{player.stl}</span>
                                <span className="grid_item">{player.ast}</span>
                                <span className="grid_item">{player.blk}</span>
                                <span className="grid_item">{player.turnover}</span>
                                <span className="flex justify-center items-center">{player.min}</span>

                            </li>
                        })}
                    </ul>
                </>

            </div>
        )}
    </div >

}

export default DetailsWindow;
