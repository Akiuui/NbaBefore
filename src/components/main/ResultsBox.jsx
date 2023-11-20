import React from "react";
import useGetDarkerColor from "../../hooks/useGetDarkerColor";
import TeamsColor from "../../controllers/TeamsColor";
import BoxResult from "../BoxResult";

function ResultsBox({ games, logos, setShowDetails, setClickedBoxData, setIndexOfGame }) {

    return <ul className='mx-2 mt-16 grid gap-y-20 grid-cols-1 md:grid-cols-2 sm:gap-x-10 sm:mx-6 '>
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

                <BoxResult key={index} game={game} logos={logos} SetStateWhenLastElementLoaded={SetStateWhenLastElementLoaded} index={index} home_name={game.home_team_abbreviation} visitor_name={game.visitor_team_abbreviation} />
            </li>

        })}


    </ul>
}

export default ResultsBox;
