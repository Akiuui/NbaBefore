import { useState, useEffect } from 'react'
import React from 'react';

import GetGames from './controllers/FormatGames'
import FormatDate from './controllers/FormatDate'
import FetchLogo from './routes/FetchLogo'
import useDate from './hooks/useDate'
import Scroll from './listeners/Scroll.js'
import LoadingProtector from './components/LoadingProtector';
import ResultsBox from './components/ResultsBox';
import LoadingCircle from './components/LoadingCircle';
import PageFooter from './components/PageFooter.jsx'
import NavBar from './components/NavBar.jsx'


function App() {
  const [date, setDate] = useState('');
  const [games, setGames] = useState([]);
  const [logosHome, setLogosHome] = useState([]);
  const [logosAway, setLogosAway] = useState([]);
  const [pages, setPages] = useState()

  const [isPlayoff, setIsPlayoff] = useState(false)
  const [isOffseason, setIsOffseason] = useState(false)

  const [loading, setLoading] = useState(true)
  const [showLoadingCircle, setShowLoadingCircle] = useState(true)

  const [stats, setStats] = useState([])
  const [gamesId, setGamesId] = useState([])
  const [mpoints, setMpoints] = useState([])

  useEffect(() => {
    /*
    const date = FormatDate();
    setDate(date);
    */
    setDate("2013-03-29");

  }, [])

  useEffect(() => {

    setGames([])
    setGamesId([])
    setLogosHome([])
    setLogosAway([])
    setLoading(true)
    setShowLoadingCircle(true)
    setIsPlayoff(false)
    setIsOffseason(false)
    // setPages()

    if (date)
      FetchData(date, 1, true)

  }, [date]);

  useEffect(() => {

    if (pages)
      Scroll(FetchData, date, pages, setShowLoadingCircle)

  }, [pages])


  const FetchData = async (date, page, first_fetch) => {

    try { //Gets data about games played, and saves them

      const [games_ids, formattedGames, pages] = await GetGames(date, page, first_fetch)
      if (formattedGames == []) {
        setIsOffseason(true)
        return
      }
      if (!isPlayoff)
        formattedGames[0].postseason && setIsPlayoff(true)

      if (pages)
        setPages(pages)


      setGames(games => [...games, ...formattedGames])
      setGamesId(gamesId => [...gamesId, ...games_ids])




      const home_logo = await Promise.all(
        formattedGames.map(game => {
          return FetchLogo(game.home_team_abbreviation)
        }),
      )
      setLogosHome(logosHome => [...logosHome, ...home_logo])

      const away_logo = await Promise.all(
        formattedGames.map(game => {
          return FetchLogo(game.visitor_team_abbreviation)
        })
      )
      setLogosAway(logosAway => [...logosAway, ...away_logo])


      setTimeout(() => {
        setLoading(false) && loading
      }, [250])


    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch games");
    }
  }

  return (
    <>

      <NavBar date={date} setDate={setDate} isPlayoff={isPlayoff} />

      {!isOffseason && loading ? <LoadingProtector /> : null}

      {!isOffseason && <ResultsBox games={games} logosHome={logosHome} logosAway={logosAway} />}



      {showLoadingCircle ? (loading ? null : <LoadingCircle />) : <PageFooter />}

    </>
  )
}

export default App
