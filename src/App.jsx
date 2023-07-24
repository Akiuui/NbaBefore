import { useState, useEffect } from 'react'
import React from 'react';

import GetGames from './controllers/formatData/FormatGames'
import FormatDate from './controllers/formatData/FormatDate'
import useDate from './hooks/useDate'
import Scroll from './listeners/Scroll.js'
import LoadingProtector from './components/LoadingProtector';
import ResultsBox from './components/ResultsBox';
import LoadingCircle from './components/LoadingCircle';
import PageFooter from './components/PageFooter.jsx'
import NavBar from './components/NavBar.jsx'

import ifPlayoff from './controllers/ifPlayoff';
import ifOffseason from './controllers/ifOffseason'
import FormatLogos from './controllers/formatData/FormatLogos';

function App() {
  const [date, setDate] = useState('');
  const [games, setGames] = useState([]);
  const [logos, setLogos] = useState({})

  const [pages, setPages] = useState()

  const [isPlayoff, setIsPlayoff] = useState(false)
  const [isOffseason, setIsOffseason] = useState(false)

  const [loading, setLoading] = useState(true)
  const [showLoadingCircle, setShowLoadingCircle] = useState(true)

  const [stats, setStats] = useState([])
  const [gamesId, setGamesId] = useState([])
  const [mpoints, setMpoints] = useState([])

  let logos_let
  useEffect(() => {
    /*
    const date = FormatDate();
    setDate(date);
    */
    setDate("2013-03-30");
    logos_let = {}
  }, [])

  useEffect(() => {

    // console.log("Promenio si datum!!!")
    setGames([])
    setGamesId([])
    setLoading(true)
    setShowLoadingCircle(true)
    setIsPlayoff(false)
    setIsOffseason(false)
    setPages()

    if (date)
      FetchData(date, 1, true)

  }, [date]);

  useEffect(() => {
    if (pages && date)
      Scroll(FetchData, date, pages, setShowLoadingCircle)

  }, [pages])

  useEffect(() => {
    console.log("Logos changed!!!");
  }, [logos]);

  const FetchData = async (date, page, first_fetch) => {

    try {

      //Get all information related to games
      const [games_ids, formattedGames, pages] = await GetGames(date, page, first_fetch)

      if (pages) setPages(pages)
      setGames(games => [...games, ...formattedGames])
      setGamesId(gamesId => [...gamesId, ...games_ids])

      //Get logos for the games 

      const formattedLogos = await FormatLogos(formattedGames, logos)

      // logos_let = { ...logos_let, ...formattedLogos }
      // console.log("Logos let: ", logos_let)


      setLogos(logos => ({ ...logos, ...formattedLogos }))


      // logos_let = { ...logos_let, ...formattedLogos }
      // console.log(logos_let)





      if (first_fetch) {
        console.log("Proverava se da li je prvi put")
        setIsOffseason(
          ifOffseason(formattedGames)
        )
        setIsPlayoff(
          ifPlayoff(formattedGames)
        )
      }

      // console.log("Logos: ", logos_let)

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
      <NavBar date={date} setDate={setDate} isPlayoff={isPlayoff} isOffseason={isOffseason} />

      {isOffseason ?
        <>
          <p>ITS OFFSEASON</p>
        </>
        :
        <>
          < ResultsBox games={games} logos={logos} />

          {showLoadingCircle ? (loading ? null : <LoadingCircle />) : <PageFooter />}

          {loading ? <LoadingProtector /> : null}
        </>
      }
    </>
  )
}

export default App
