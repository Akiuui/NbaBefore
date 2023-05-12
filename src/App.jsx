import GetGames from './controllers/FormatGames'
import FormatDate from './controllers/FormatDate'
import GetStats from './controllers/FormatStats'
import FetchHeadshot from './routes/FetchHeadshot';
import React from 'react';



import { useEffect, useState } from 'react'

function App() {
  const [date, setDate] = useState('')
  const [games, setGames] = useState([])
  const [stats, setStats] = useState([])
  const [gamesId, setGamesId] = useState([])

  useEffect(() => {
    FetchData()
  }, []);

  const FetchData = async () => {
    try {

      //Formats todays Date
      const date = FormatDate();
      setDate(date);

      //Gets data about games played, and saves them
      const [games_ids, formattedGames] = await GetGames(date)
      setGames(formattedGames)
      setGamesId(games_ids)

      //When we get Games, we run a function to get Stats 
      const stats = await GetStats(games_ids)
      setStats(stats)

      const playerHeadshot = await FetchHeadshot(`lebron`, `james`);
      console.log(playerHeadshot)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch games");
    }
  }

  return (
    <>
      {games.map((game, index) => {

        return <li key={game}>

          <h2>{`Game ${index + 1}`}</h2>
          <p>Home team:</p>
          <p>{game.home_team}</p>
          <p>{game.home_team_score}</p>
          <p>{game.visitor_team_score}</p>
          <p>Visitor team:</p>
          <p>{game.visitor_team}</p>

          {/* 
          {stats[index].map((player) => {
            return <li key={player}>
              <p>{player.name} {player.pts}</p>
            </li>



          })} */}
          {/* {console.log("Stats: ", stats[index])} */}
        </li>

      })}

    </>
  )
}

export default App
