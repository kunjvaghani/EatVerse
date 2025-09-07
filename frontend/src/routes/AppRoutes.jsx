import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from  '../pages/auth/HomePage'
import FoodPartnerLoginPage from '../pages/auth/FoodPartnerLoginPage'
import FoodPartnerRegisterPage from '../pages/auth/FoodPartnerRegisterPage'
import UserLoginPage from '../pages/auth/UserLoginPage'
import UserRegisterPage from '../pages/auth/UserRegisterPage'
import Footer from '../pages/footer/Footer'
import Saved from '../pages/auth/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import FeedPage from '../pages/auth/FeedPage';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/user/register" element={<UserRegisterPage/>}>  </Route>
                <Route path="/user/login" element={<UserLoginPage/>}>  </Route>
                <Route path="/food-partner/login" element={<FoodPartnerLoginPage/>}>  </Route>
                <Route path="/food-partner/register" element={<FoodPartnerRegisterPage/>}>  </Route>
                <Route path="/" element={<> <HomePage/><BottomNav /> </>}>  </Route>
                <Route path="/saved" element={<><Saved /><BottomNav /></>} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/food-partner/:id" element={<Profile />} />
                <Route path="/feed" element={<><FeedPage /><BottomNav /></>} />

            </Routes>
            {/* <Footer/> */}
        </Router>
    )
}

export default AppRoutes