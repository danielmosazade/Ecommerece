import { createContext, useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";

const LoggedInContext = createContext();

export function LoggedProvider({children}) {
    

    const [user, setUser] = useState(localStorage.getItem("user")||{}); //todo
    

    function isLoggedIn(){

    }
   
    function SignOut() {
        // Clear user data from local storage and set user to an empty object
        localStorage.removeItem("user");
        localStorage.removeItem("currentEmail");
        setUser({});
    }
    
    const value = {
        user,
        setUser,
        SignOut,
        isLoggedIn
    }

    return (
        <LoggedInContext.Provider value={value}>{children}</LoggedInContext.Provider>
    )
}

export function useLoggedIn(){
    return useContext(LoggedInContext)// בתוף הקונטקסט הוא יוזר וסט יוזר
}