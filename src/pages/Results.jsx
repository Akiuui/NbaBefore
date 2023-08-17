import React from "react";

import { useState, useEffect } from "react";
//CONTROLERS
import GetGames from '../controllers/formatData/FormatGames'
import FormatLogos from '../controllers/formatData/FormatLogos';
import ifOffseason from "../controllers/ifOffseason";
import ifPlayoff from "../controllers/ifPlayoff";
import TeamsColor from "../controllers/TeamsColor";
//HOOKS
import useCalendar from '../hooks/useCalendar'
import Scroll from '../events/Scroll.js'
import useGetDarkerColor from "../hooks/useGetDarkerColor"
//COMPONENTS
import DetailsWindow from "../components/DetailsWindow";
import LoadingProtector from "../components/LoadingProtector"
import ResultsBox from "../components/ResultsBox"
import LoadingCircle from "../components/LoadingCircle"
import PageFooter from "../components/PageFooter"
import Offseason from "../components/Offseason";
import BoxResult from "../components/BoxResult";

function Results({ date, setIsPlayoff, setIsOffseason, isPlayoff, isOffseason, setLinkTo, from, setFrom,
    games, setGames, logos, setLogos, showLoadingCircle, setShowLoadingCircle }) {


    const [pages, setPages] = useState()

    const [loading, setLoading] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const [clickedBoxData, setClickedBoxData] = useState()
    const [indexOfGame, setIndexOfGame] = useState()

    const [stats, setStats] = useState([])
    const [gamesId, setGamesId] = useState([])
    const [mpoints, setMpoints] = useState([])

    useEffect(() => {
        console.log("Prebacen u Standings")
        setLinkTo("Standings")

    }, [setLinkTo]);


    useEffect(() => {
        console.log("Desava se")

        if (date && (from !== "Standings")) {   //This code is executed when we change dates
            setShowLoadingCircle(true)
            setLoading(true)
            setGamesId([])
            setIsPlayoff(false)
            setIsOffseason(false)
            setPages()
            setGames([])
            FetchData(date, 1, true)

        }
        else { //This code is being executed if the user is coming from react router  
            setLoading(false)

            setFrom(null)
            console.log("Dosao sam iz Standingsa")
        }

    }, [date]);

    useEffect(() => {
        if (pages && date)
            Scroll(FetchData, date, pages, setShowLoadingCircle)

    }, [pages])

    // useEffect(() => {
    //   console.log("Logos changed!!!");
    // }, [logos]);

    const FetchData = async (date, page, first_fetch) => {

        try {

            //Get all information related to games
            const [games_ids, formattedGames, pages] = await GetGames(date, page, first_fetch)

            if (pages) setPages(pages)
            setGames(games => [...games, ...formattedGames])
            setGamesId(gamesId => [...gamesId, ...games_ids])

            //Get logos for the games 

            const formattedLogos = await FormatLogos(formattedGames, logos)

            setLogos(logos => ({ ...logos, ...formattedLogos }))

            if (first_fetch) {
                console.log("Proverava se da li je prvi put")
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

            console.log("Izvrsen je FetchData")

        } catch (error) {
            console.error(error);
            throw new Error("Failed to fetch games");
        }
    }



    return (
        <>
            {loading ? <LoadingProtector /> : null}


            {isOffseason ? <Offseason />
                :
                <>
                    <ul className='mx-2 mt-16 grid gap-y-20 grid-cols-1 md:grid-cols-2 sm:gap-x-10 sm:mx-6 '>
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
                                    setClickedBoxData(e)
                                    setIndexOfGame(index)
                                }}
                            >
                                <div className='w-5 h-5 bg-gray-300/50 rounded-full absolute right-2 top-2 flex justify-center items-center cursor-pointer hover:bg-gray-300/75'>
                                    <p className='bold text-bg italic'>i</p>
                                </div>

                                <BoxResult
                                    game={game}
                                    logos={logos}
                                    index={index} home_name={game.home_team_abbreviation}
                                    visitor_name={game.visitor_team_abbreviation} />
                            </li>

                        })}

                    </ul>

                    {showDetails ?
                        <DetailsWindow
                            setShowDetails={setShowDetails}

                            currentGameId={gamesId[indexOfGame]}
                            currentGame={games[indexOfGame]}

                            logos={logos}
                        />
                        : null}

                    {showLoadingCircle ? (loading ? null : <LoadingCircle />) : <PageFooter />}


                </>
            }
        </>
    )
}


export default Results;
