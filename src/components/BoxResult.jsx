import React from "react";


function BoxResult({ game, logos, home_name, visitor_name }) {

    return <div className='flex justify-center px-2'>
        <div className='pt-[24px] flex flex-col items-center '>
            <div className=' bg-white border-2 border-black  rounded-full flex items-center justify-center w-[95px] h-[95px] md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'>
                <img loading="eager" className='w-[80px] md:w-[90px]' src={logos[game.home_team] || "/public/images/placeholder_logo.png"} />
            </div>
            <p className='text-xl pt-1.5' style={{ fontWeight: game.home_won ? 'bold' : 'normal' }}>{home_name}</p>
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

            <div className='bg-white border-2 border-black w-[95px] h-[95px] rounded-full flex justify-center items-center md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]'>
                <img loading="eager" className='w-[80px] md:w-[90px]' src={logos[game.visitor_team] || "/public/images/placeholder_logo.png"} alt={`${game.visitor_team} logo`} />
            </div>

            <p className='text-xl pt-1.5' style={{ fontWeight: game.home_won ? 'normal' : 'bold' }}>{visitor_name}</p>
        </div>
    </div>

}

export default BoxResult;
