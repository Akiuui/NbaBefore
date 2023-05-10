import GetGames from './controllers/FormatGames'
import FormatDate from './controllers/FormatDate'
import GetStats from './controllers/FormatStats'
import { useEffect, useState } from 'react'

function App() {
  const [date, setDate] = useState('')
  const [games, setGames] = useState([])
  const [stats, setStats] = useState([])
  const [gamesId, setGamesId] = useState([])
  // const id = "29554"
  useEffect(() => {

    const date = FormatDate(); //Formats todays Date
    setDate(date);

    GetGames(date)  //Gets Todays Games
      .then((res) => {

        const [games_ids, formattedGames] = res
        setGames(formattedGames)
        setGamesId(games_ids)

        //When we get Games, we run a function to get Stats 
        GetStats(games_ids)
          .then((res) => setStats(res))
          .catch((err) => console.log(err))


      })
      .catch((err) => console.log(err))



  }, []);

  return (
    <>
      <button onClick={GetStats}>Get stats</button>
    </>
  )
}

export default App
