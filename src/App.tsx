import React from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom"
import {CardsPage, PersonalCardPage} from "./pages"
import {Login, Register} from "./auth"

function App() {
    return (
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<Register/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/cards"} element={<CardsPage/>}/>
                    <Route path={"/card/:id"} element={<PersonalCardPage/>}/>
                </Routes>
            </div>
    )}
export default App
