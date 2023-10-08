import React from "react";
import { useState, useEffect } from "react";
//PAGES
import Results from "./pages/Results";
import Standings from "./pages/Standings";
//COMPONENTS
import NavBar from "./components/main/NavBar";
//DEPENDENCY
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [date, setDate] = useState('');
  const [isPlayoff, setIsPlayoff] = useState(false)
  const [isOffseason, setIsOffseason] = useState(false)

  //States related to NavBar
  const [linkTo, setLinkTo] = useState("Standings")
  const [from, setFrom] = useState()
  const [elementToDisable, setElementToDisable] = useState()



  //Think about context
  const [games, setGames] = useState([]);
  const [logos, setLogos] = useState({})



  useEffect(() => {
    /*
    const date = FormatDate();
    setDate(date);
    */
    setDate("2013-03-30");
  }, [])

  return (

    <>
      <ToastContainer />

      <NavBar
        date={date}
        isPlayoff={isPlayoff}
        isOffseason={isOffseason}
        linkTo={linkTo}
        setDate={setDate}
        setElementToDisable={setElementToDisable}
      />

      <Routes>
        <Route path="/" element={<Results
          date={date}
          games={games}
          setGames={setGames}
          logos={logos}
          setLogos={setLogos}
          isOffseason={isOffseason}
          isPlayoff={isPlayoff}
          setIsOffseason={setIsOffseason}
          setIsPlayoff={setIsPlayoff}
          setLinkTo={setLinkTo}
          from={from}
          setFrom={setFrom}
          // showLoadingCircle={showLoadingCircle}
          // setShowLoadingCircle={setShowLoadingCircle}
          elementToDisable={elementToDisable}
        />}
        />
        <Route path="/standings" element={<Standings
          setLinkTo={setLinkTo}
          setFrom={setFrom}
          logos={logos} />} />
      </Routes>

    </>
  )
}

export default App;
