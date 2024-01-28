import React, {useContext} from 'react'
import { useNavigate } from "react-router-dom"
import {UserContext} from '../contexts/UserContext'

export default function LogOutButton() {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    function handleButtonClick() {
        setUser(null)
        navigate('/')
    }

    return (
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleButtonClick}>Log Out</button>
    )
}