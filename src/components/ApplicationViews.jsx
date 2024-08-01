
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import Chores from "../pages/Chores"
// import Household from '../pages/Household.jsx'
import HouseholdDetails from './HouseholdDetails.jsx'
// import Feed from '../pages/Feed.jsx'
import FeedByHouse from '../pages/FeedByHouse.jsx'


export const ApplicationViews = () => {


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/:householdId">
                    <Route index element={<Chores />}/>
                    <Route path="/:householdId/household" element={<HouseholdDetails />}/>
                    <Route path="/:householdId/feed" element={<FeedByHouse />} />
                </Route>
            </Route> 
        </Routes>
    </BrowserRouter>
}