import React from "react";
import useColor from "../hooks/useColor";
import TeamsColor from "../controllers/TeamsColor";

function ResultsBox({ games, logos }) {

    return <ul className='mx-2 mt-16 grid gap-y-20 grid-cols-1 md:grid-cols-2 sm:gap-x-10 sm:mx-6 '>
        {games.map((game) => {


            let bg_color
            if (game.home_won)
                bg_color = TeamsColor(game.home_team_abbreviation)
            else
                bg_color = TeamsColor(game.visitor_team_abbreviation)

            return <li key={game.id} className="px-4 border-2 border-black relative rounded-lg" style={{ backgroundColor: `#${bg_color}` }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `#${useColor(bg_color, 20)}`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `#${bg_color}`}
            >

                <div className='w-5 h-5 bg-gray-300/50 rounded-full absolute right-2 top-2 flex justify-center items-center cursor-pointer hover:bg-gray-300/75'>
                    <p className='bold text-bg italic'>i</p>
                </div>
                {/* <h2>{`Game ${index + 1}`}</h2> */}
                <div className='flex justify-center px-2'>
                    <div className='pt-[24px] flex flex-col items-center '>
                        <div className=' bg-white border-2 border-black  rounded-full flex items-center justify-center w-[95px] h-[95px] 
      md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'>
                            <img className='w-[80px] md:w-[90px]' src={logos[game.home_team_abbreviation]} alt="" />
                        </div>
                        <p className='text-xl pt-1.5' style={{ fontWeight: game.home_won ? 'bold' : 'normal' }}>{game.home_team_abbreviation}</p>
                    </div>

                    <div className='flex flex-col items-center justify-center'>
                        <div className='flex items-center'>
                            <p className='pl-4 text-2xl lg:text-3xl' style={{ fontWeight: game.home_won ? 'bold' : 'normal' }}>{game.home_team_score}</p>
                            <p className='mx-2 text-3xl'>-</p>
                            <p className='pr-4 text-2xl lg:text-3xl' style={{ fontWeight: game.home_won ? 'normal' : 'bold' }}>{game.visitor_team_score}</p>
                        </div>
                        <p className='text-lg'>Final score</p>
                    </div>
                    <div className='pt-[24px] pb-[15px] flex flex-col items-center'>

                        <div className='bg-white border-2 border-black w-[95px] h-[95px] rounded-full flex justify-center items-center
      md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'>
                            <img className='w-[80px] md:w-[90px]' src={logos[game.visitor_team_abbreviation]} alt="" />
                        </div>

                        <p className='text-xl pt-1.5' style={{ fontWeight: game.home_won ? 'normal' : 'bold' }}>{game.visitor_team_abbreviation}</p>
                    </div>
                </div>

            </li>

        })}


    </ul>
}

export default ResultsBox;
