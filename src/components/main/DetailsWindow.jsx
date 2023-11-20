import React, { useState } from "react";
import { useEffect, useRef } from "react";
import GetStats from "../../controllers/formatData/FormatStats";
import StatsTable from "../StatsTable"
import BoxResult from "../BoxResult"
import useGetLastWord from "../../hooks/useGetLastWord"
import TeamsColor from "../../controllers/TeamsColor";
import SortStats from "../../controllers/SortStats";
import HeadShotsBox from "../HeadShotsBox";

function DetailsWindow({ setShowDetails, showDetails, currentGameId, currentGame, logos }) {

    const [homeStats, setHomeStats] = useState()
    const [visitorStats, setVisitorStats] = useState()

    const [whichStatsIsSelected, setWhichStatsIsSelected] = useState("home")
    const [displayedStats, setDisplayedStats] = useState()
    const [windowWidth, setWindowWidth] = useState()

    const detailsRef = useRef(null)

    const homeStatsRef = useRef(null)
    const visitorStatsRef = useRef(null)
    const playersStatsRef = useRef(null)

    useEffect(() => { //When components mount we make the page unscrollable and when we unmount we make it scrollable

        const html = document.documentElement;
        const scrollFromTop = document.documentElement.scrollTop

        html.style.setProperty('--st', -(scrollFromTop) + "px");
        html.classList.add('noscroll')


        // Cleanup function to restore scroll behavior when component unmounts
        return () => {
            html.classList.remove('noscroll')
            window.scrollTo(0, scrollFromTop)
        }
    }, [detailsRef]);

    useEffect(() => { //Controls the animation of the fade in

        setTimeout(() => { //Adds animation when mounting
            detailsRef.current.classList.remove("fade-exit")
            detailsRef.current.classList.add("fade-enter")
        }, 10)

    }, [detailsRef]);

    function ComponentUnmounted() { //When we unmount component we run this code before
        detailsRef.current.classList.remove("fade-enter")
        detailsRef.current.classList.add("fade-exit")

        setTimeout(() => setShowDetails(false), 700)
    }

    useEffect(() => {
        //Fetches, formats and sets Stats   
        FetchData()

        HandleSideEffects()

    }, []);

    useEffect(() => { //Changes color of the three menu buttons for home, vistor and players

        const statsRef = {
            home: homeStatsRef,
            players: playersStatsRef,
            visitors: visitorStatsRef
        }
        Object.values(statsRef).forEach(ref => {
            ref.current.classList.remove("bg-gray-300")
            ref.current.classList.add("hover:bg-gray-100")
        })

        if (whichStatsIsSelected) {
            const selectedStatRef = statsRef[whichStatsIsSelected]

            selectedStatRef.current.classList.add("bg-gray-300")
            selectedStatRef.current.classList.remove("hover:bg-gray-100")
        }

    }, [whichStatsIsSelected]);

    useEffect(() => { //Sets the width of the window
        detailsRef.current.style.width = `${windowWidth}px`
    }, [windowWidth]);

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

    }

    function ChangeDisplayedStats(team, stat) {
        setWhichStatsIsSelected(team)
        setDisplayedStats(stat)
    }

    function HandleSideEffects() {
        //Focuses on the div via ref so that we can unshow it when the onBlur activates
        if (currentGame)
            detailsRef.current.focus();

        setWindowWidth(detailsRef.current.offsetWidth) //Sets the window width
    }

    return <div className="w-[100%] h-[100%] z-40 fixed p-2 top-0 flex justify-center items-center">

        <div ref={detailsRef} tabIndex="0" onBlur={() => ComponentUnmounted()} className="fade-exit transition-all duration-700 bg-white flex flex-col relative h-[85%] border-2 border-black boxshadow rounded-lg z-50 p-2 sm:p-4 overflow-hidden focus:outline-none" >
            <>

                <div onClick={() => ComponentUnmounted()} className="absolute p-[2px] top-2 right-2 rounded-full cursor-pointer bg-gray-300 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>

                <BoxResult game={currentGame} logos={logos} home_name={useGetLastWord(currentGame.home_team)} visitor_name={useGetLastWord(currentGame.visitor_team)} />

                <div className="grid grid-cols-3 my-2 border-2 ">
                    <div ref={homeStatsRef} onClick={() => ChangeDisplayedStats("home", homeStats)} className="flex justify-center cursor-pointer font-medium hover:bg-gray-100">{currentGame.home_team_abbreviation}</div>
                    <div ref={playersStatsRef} onClick={() => ChangeDisplayedStats("players", homeStats)} className="flex justify-center border-x-2 cursor-pointer font-medium whitespace-nowrap breaka hover:bg-gray-100">Top performers</div>
                    <div ref={visitorStatsRef} onClick={() => ChangeDisplayedStats("visitors", visitorStats)} className="flex justify-center cursor-pointer font-medium hover:bg-gray-100">{currentGame.visitor_team_abbreviation}</div>
                </div>
            </>

            {whichStatsIsSelected === "players" ? <HeadShotsBox stats={[...homeStats, ...visitorStats]} /> : <StatsTable displayedStats={displayedStats} setDisplayedStats={setDisplayedStats} />}


        </div>
    </div >

}

export default DetailsWindow;
