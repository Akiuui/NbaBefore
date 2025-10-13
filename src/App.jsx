import React from "react";
import { useState, useEffect } from "react";
//PAGES
import Results from "./pages/Results";
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
  const [from, setFrom] = useState()
  const [elementToDisable, setElementToDisable] = useState()

  //Think about context
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
      <link rel="preload" href="placeholder_logo.png" as="image" />
      <ToastContainer />

      <NavBar
        date={date}
        isPlayoff={isPlayoff}
        isOffseason={isOffseason}
        setDate={setDate}
        setElementToDisable={setElementToDisable}
      />

      <Routes>
        <Route path="/" element={<Results
          date={date}
          // games={games}
          // setGames={setGames}
          logos={logos}
          setLogos={setLogos}
          isOffseason={isOffseason}
          isPlayoff={isPlayoff}
          setIsOffseason={setIsOffseason}
          setIsPlayoff={setIsPlayoff}
          elementToDisable={elementToDisable}
        />}
        />
      </Routes>

    </>
  )
}

export default App;
