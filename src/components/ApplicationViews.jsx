import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import Chores from "../pages/Chores"


export const ApplicationViews = () => {


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/chores/:householdId" element={<Chores />}/>
                {/* <Route path="/chores/:householdId/addChore" element={<ChoreForm />}/> */}
            </Route> 
        </Routes>
    </BrowserRouter>
}