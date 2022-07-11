import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import UserContext from "./contexts/UserContext.js"
import GlobalStyle from "./styles/GlobalStyles.js"
import Home from "./pages/Home.js"
import User from "./pages/User.js"
import SignIn from "./pages/SignIn.js"
import SignUp from "./pages/SignUp.js"
import Cart from "./pages/Cart.js"   




export default function App () {

    const [ config, setConfig ] = useState({headers: {Authorization: `Bearer ${localStorage.getItem("config")}`}} || "")
    const [ loading, setLoading ] = useState(false)

    return (
        <UserContext.Provider value={{ config, setConfig, loading, setLoading }}>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/minha-conta" element={<User />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route path="/carrinho" element={<Cart />} />
            </Routes>
        </UserContext.Provider>
    )
}