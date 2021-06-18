import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});
export const AuthContextProvider = (props) => {
    const initalToken = localStorage.getItem('token')
    const [token, setToken] = useState(initalToken)
    const userIsLoggedIn = !!token;
    const loginHander = (token) => {
        setToken(token)
        localStorage.setItem("token", token)
    }

    const logOutHander = () => {
        setToken(null)
        localStorage.removeItem("token")
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