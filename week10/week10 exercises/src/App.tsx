import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

// components
import About from "./components/About"
import Header from "./components/Header"
import MyContainer from "./components/MyContainer"



function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element = {
              <>
                <MyContainer />
              </>
            } />
            <Route path='/About' element={
              <>
                <About />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
