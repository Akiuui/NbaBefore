import GetTeams from './controllers/GetTeams'
import GetDate from './controllers/GetDate'
import { useEffect, useState } from 'react'

function App() {
  const [date, setDate] = useState('')
  const [games, setGames] = useState([])

  useEffect(() => {

    const date = GetDate();
    setDate(date);

    GetTeams(date)
      .then((res) => setGames(res))
      .catch((err) => console.log(err))

  }, []);

  return (
    <>

    </>
  )
}

export default App
