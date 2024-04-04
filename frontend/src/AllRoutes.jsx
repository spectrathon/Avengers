import React from 'react'
import {Routes,Route,useParams} from 'react-router-dom';
import ContactFormPhone from './components/forms/ContactFormPhone.jsx'
import HomePage from './pages/HomePage.jsx'
import Meditation from './pages/Meditation.jsx';
import Yoga from './pages/Yoga.jsx';
import Sleep from './pages/Sleep.jsx';
import PersonalAssistant from './pages/PersonalAssistant.jsx';
import YogaRoom from './pages/Room/YogaRoom.jsx'
function AllRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/Meditation' element={<Meditation/>}/>
            <Route path='/Yoga' element={<Yoga/>}/>
            <Route path='/Yoga/:id' element={<YogaRoom />}/>
            <Route path='/Sleep' element={<Sleep/>}/>
            <Route path='/PersonalAssistant' element={<PersonalAssistant/>}/> 
            <Route path='/Contact' element={<ContactFormPhone display={"block"}/>} />
        </Routes>
    </div>
  )
}

export default AllRoutes
