import {BrowserRouter, Route, Routes} from "react-router-dom"
import { IJoke } from "./models/Joke"

import './App.css'

// components
import Header from "./components/Header"
import FrontPage from "./components/FrontPage"
import SavedPage from "./components/SavedPage"

// hooks
import { useJokes } from "./hooks/useJokes"


function App() {
  const { savedJokes, saveJoke, deleteJoke } = useJokes();

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element = {
            <>
              <FrontPage saveJoke={saveJoke} />
            </>
          } />
          <Route path="/saved" element = {
            <>
              <SavedPage savedJokes={savedJokes} deleteJoke={deleteJoke} />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
