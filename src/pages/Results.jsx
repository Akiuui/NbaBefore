import React from "react";

import { useState, useEffect } from "react";
//CONTROLERS
import GetGames from '../controllers/formatData/FormatGames'
import ifOffseason from "../controllers/ifOffseason";
import ifPlayoff from "../controllers/ifPlayoff";
import TeamsColor from "../controllers/TeamsColor";
import FetchFormatAndSaveLogos from "../routes/FetchFormatAndSaveLogos"
//HOOKS
import useCalendar from '../hooks/useCalendar'
import Scroll from '../events/Scroll.js'
import useGetDarkerColor from "../hooks/useGetDarkerColor"
//COMPONENTS
import DetailsWindow from "../components/main/DetailsWindow";
import LoadingProtector from "../components/loading/LoadingProtector"
import LoadingCircle from "../components/loading/LoadingCircle"
import ResultsBox from "../components/main/ResultsBox"
import PageFooter from "../components/main/PageFooter"
import Offseason from "../components/main/Offseason";
import BoxResult from "../components/BoxResult";
import useToast from "../hooks/useToast.js"

function Results({ date, setIsPlayoff, setIsOffseason, isPlayoff, isOffseason, setLinkTo, from, setFrom,
    games, setGames, logos, setLogos, elementToDisable }) {

    const [pages, setPages] = useState()

    const [loading, setLoading] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    // const [clickedBoxData, setClickedBoxData] = useState()
    const [indexOfGame, setIndexOfGame] = useState()

    const [showLoadingCircle, setShowLoadingCircle] = useState(true)

    const [gamesId, setGamesId] = useState([])

    useEffect(() => {
        setLinkTo("Standings")
    }, [setLinkTo]);


    useEffect(() => {
        if (date && (from !== "Standings")) {   //This code is executed when we change dates
            setShowLoadingCircle(true)
            setLoading(true)
            setGamesId([])
            setIsPlayoff(false)
            setIsOffseason(false)
            setPages()
            setGames([])
            setLogos({})
            FetchData(date, 1, true)
        }
        else { //This code is being executed if the user is coming from react router  
            setLoading(false)

            setFrom(null)
        }

    }, [date]);

    useEffect(() => {

        if (pages && date)
            Scroll(FetchData, date, pages, setShowLoadingCircle)

    }, [pages])

    const FetchData = async (date, page, first_fetch) => {

        try {
            //Get all information related to games
            const [games_ids, formattedGames, pages] = await GetGames(date, page, first_fetch)

            if (pages) setPages(pages)
            console.log(pages)

            setGames(games => [...games, ...formattedGames])
            setGamesId(gamesId => [...gamesId, ...games_ids])

            let timer
            if (first_fetch) {
                timer = setTimeout(
                    () => useToast('Our logos are taking a bit to load, they will come soon!', "top-left", 2000)
                    , 2000
                )
            }
            //Get logos for the games
            const year = date.split('-')[0]
            FetchFormatAndSaveLogos(formattedGames, Number(year), setLogos, timer)

            if (first_fetch) {
                setIsOffseason(
                    ifOffseason(formattedGames)
                )
                setIsPlayoff(
                    ifPlayoff(formattedGames)
                )
            }

            setTimeout(() => {
                setLoading(false) && loading
            }, [250])

        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch games");
        }
    }

    function WhenToShowLoadingCricle() {
        let content
        if (showLoadingCircle) {
            if (pages == 1)
                content = <PageFooter />
            else
                content = <LoadingCircle />
        } else {
            content = <PageFooter />
        }

        if (loading)
            content = <></>

        return content
    }

    return (
        <>
            {loading ? <LoadingProtector elementToDisable={elementToDisable} /> : null}


            {isOffseason ? <Offseason />
                :
                <>
                    <ul className='mx-2 mt-16 grid gap-y-20 grid-cols-1 md:grid-cols-2 sm:gap-x-10 sm:mx-6'>
                        {games.map((game, index) => {

                            let bg_color
                            if (game.home_won)
                                bg_color = TeamsColor(game.home_team_abbreviation)
                            else
                                bg_color = TeamsColor(game.visitor_team_abbreviation)

                            return <li key={game.id} id="parentElement" className="px-4 border-2 border-black relative rounded-lg" style={{ backgroundColor: `#${bg_color}` }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `#${useGetDarkerColor(bg_color, 20)}`}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `#${bg_color}`}
                                onClick={(e) => {
                                    setShowDetails(true)
                                    // setClickedBoxData(e)
                                    setIndexOfGame(index)
                                }}
                            >

                                <div className='w-5 h-5 bg-gray-300/50 rounded-full absolute right-2 top-2 flex justify-center items-center cursor-pointer hover:bg-gray-300/75'>
                                    <p className='bold text-bg italic'>i</p>
                                </div>

                                <BoxResult
                                    game={game}
                                    logos={logos}
                                    home_name={game.home_team_abbreviation}
                                    visitor_name={game.visitor_team_abbreviation} />
                            </li>

                        })}

                    </ul>

                    {showDetails ?
                        <DetailsWindow
                            setShowDetails={setShowDetails}
                            showDetails={showDetails}
                            currentGameId={gamesId[indexOfGame]}
                            currentGame={games[indexOfGame]}
                            logos={logos}
                        />
                        : null}

                    <WhenToShowLoadingCricle />

                </>
            }
        </>
    )
}


export default Results;
