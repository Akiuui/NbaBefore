import GetGames from './controllers/FormatGames'
import FormatDate from './controllers/FormatDate'
import GetStats from './controllers/FormatStats'
import FetchHeadshot from './routes/FetchHeadshot';
import FetchLogo from './routes/FetchLogo'
import MostStat from './players/MostStat';
import TeamsColor from './controllers/TeamsColor';
import { BoldStyle } from './InlineStyle';
import React from 'react';

import { useState, useEffect } from 'react'

function App() {
  const [date, setDate] = useState('')
  const [games, setGames] = useState([])
  const [stats, setStats] = useState([])
  const [gamesId, setGamesId] = useState([])
  const [mpoints, setMpoints] = useState([])
  //const [visitor, setVisitor] = useState("")
  //const [home, setHome] = useState("")


  useEffect(() => {
    FetchData()
  }, []);

  const FetchData = async () => {
    try {

      //Formats todays Date
      //Todays date doesnt show any games so we will make a hardcoded date
      const date = "2013-04-12";
      setDate("2013-04-12");
      /*
      const date = FormatDate();
      setDate(date);
      */

      //Gets data about games played, and saves them
      const [games_ids, formattedGames] = await GetGames(date)
      setGames(formattedGames)
      setGamesId(games_ids)

      //When we get Games, we run a function to get Stats 
      /*
      const stats = await GetStats(games_ids)
      setStats(stats)

      setMpoints(MostStat(stats, "pts"))
*/
      // const playerHeadshot = await FetchHeadshot(`lebron`, `james`);
      // console.log(playerHeadshot)

    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch games");
    }
  }



  return (
    <>

      <p>All Games played on: {date}</p>


      <ul className='mx-2 my-20 grid gap-y-20 grid-cols-1 sm:grid-cols-2 sm:gap-x-10 sm:mx-6 md:sm:grid-cols-3'>
        {games.map((game, index) => {

          let bg_color
          if (game.home_won)
            bg_color = TeamsColor(game.home_team_abbreviation)
          else
            bg_color = TeamsColor(game.visitor_team_abbreviation)



          let home_logo
          FetchLogo(game.home_team_abbreviation)
            .then((res) => { home_logo = res })
            .catch((err) => console.log(err.message))

          let visitor_logo
          FetchLogo(game.visitor_team_abbreviation)
            .then((res) => {
              visitor_logo = res
              //console.log(res)
            })
            .catch((err) => console.log(err.message))

          return <li id={game.id} className={`border-2 border-black`} style={{ backgroundColor: bg_color }} key={game.id}>

            {/* <h2>{`Game ${index + 1}`}</h2> */}
            <div className='flex justify-center px-2 '>
              <div className='pt-[24px] flex flex-col items-center'>
                <div className=' bg-white w-[90px] h-[90px] rounded-full'>
                  <img className='w-[100px]' src="https://loodibee.com/wp-content/uploads/memphis-grizzlies-2004-2018-350x350.png" alt="" />
                  {/* <img className='w-[100px]' src={`${home_logo}`} alt="" /> */}
                </div>
                <p className='text-xl pt-1.5' style={{ fontWeight: game.home_won ? 'bold' : 'normal' }}>{game.home_team_abbreviation}</p>
              </div>
              <div className='flex items-center'>
                <p className='pl-4 text-3xl' style={{ fontWeight: game.home_won ? 'bold' : 'normal' }}>{game.home_team_score} - </p>
                <p className='pr-4 text-3xl' style={{ fontWeight: game.home_won ? 'normal' : 'bold' }}> - {game.visitor_team_score}</p>
              </div>
              <div className='pt-[24px] pb-[15px] flex flex-col items-center'>
                <div className='bg-white w-[90px] h-[90px] rounded-full'>

                </div>

                <img className='w-[100px]' src={`${visitor_logo}`} alt="" />
                <p className='text-xl pt-1.5' style={{ fontWeight: game.home_won ? 'normal' : 'bold' }}>{game.visitor_team_abbreviation}</p>
              </div>
            </div>

          </li>

        })}
      </ul >
    </>
  )
}

export default App
