import { useContext, useState, useEffect, createContext } from "react";
import { UserInstance } from "../utils/AxiosAuthInstance";
import { useNavigate } from "react-router-dom";
const UserContext = createContext('');

export function UserProvider({ children }){
    const navigate = useNavigate();
    const createUser = (data) =>{

        UserInstance.post(`create/`, data).then(res => {
            if(res.status === 201){
                navigate('login/')
            }
        })
    }
    return (
        <UserContext.Provider value={{createUser}}>
            { children }
        </UserContext.Provider>
    )
}

export function useGlobalUserContext(){
    return useContext(UserContext);
}