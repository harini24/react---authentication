import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});

const calculateRemainingTime = expirationTime => {
    const currentTime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()
    const remainingTime = adjExpirationTime - currentTime
    return remainingTime
}

export const AuthContextProvider = (props) => {
    const initalToken = localStorage.getItem('token')
    const [token, setToken] = useState(initalToken)
    const userIsLoggedIn = !!token;

    const logOutHander = () => {
        setToken(null)
        localStorage.removeItem("token")
    }

    const loginHander = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem("token", token)
        const remainingTime = calculateRemainingTime(expirationTime)

        setTimeout(logOutHander, 3000)
    }
    const contextValue = {
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHander,
        logout: logOutHander
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext