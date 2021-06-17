import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { }
});
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)
    const userIsLoggedIn = !!token;
    const loginHander = (token) => {
        setToken(token)
    }

    const logOutHander = () => {
        setToken(null)
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