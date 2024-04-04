import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './PagesBoilerPlate/Navbar.jsx'
import BoilerplatePage from './PagesBoilerPlate/BoilerplatePage.jsx';
import AllRoutes from './AllRoutes.jsx'
function App() {
  return (
    <div className=" w-full min-h-screen text-black">
      <CssBaseline />
      <Navbar />
      <BoilerplatePage>
        <AllRoutes />
      </BoilerplatePage>
    </div>
  )
}

export default App
