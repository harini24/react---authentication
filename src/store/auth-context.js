import React, { useCallback, useEffect, useState } from "react";

let logutTimer;
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

const retrieveStoredToken = () => {
    const initialToken = localStorage.getItem('token')
    const expiration = localStorage.getItem('expiration')
    const remainingTime = calculateRemainingTime(expiration)
    if (remainingTime <= 60000) {
        localStorage.removeItem("token")
        localStorage.removeItem("expiration")
        return null
    }
    return {
        token: initialToken,
        duration: remainingTime
    }
}

export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken()
    let initalToken
    if (tokenData) {
        initalToken = tokenData.token
    }
    const [token, setToken] = useState(initalToken)
    const userIsLoggedIn = !!token;

    const logOutHander = useCallback(() => {
        setToken(null)
        localStorage.removeItem("token")
        localStorage.removeItem("expiration")
        if (logutTimer) {
            clearTimeout(logutTimer)
        }
    }, [])

    const loginHander = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem("token", token)
        localStorage.setItem("expiration", expirationTime)
        const remainingTime = calculateRemainingTime(expirationTime)

        logutTimer = setTimeout(logOutHander, remainingTime)
    }

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration)
            logutTimer = setTimeout(logOutHander, tokenData.duration)
        }
    }, [tokenData, logOutHander])

    const contextValue = {
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHander,
        logout: logOutHander
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext