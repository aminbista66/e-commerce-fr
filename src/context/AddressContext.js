import { createContext, useContext, useState, useEffect } from "react";
import { UserInstance } from "../utils/AxiosAuthInstance";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AddressContext = createContext('');

export default function AddressProvider({ children }){
    const [ addresses, setAddresses ] = useState([]);
    const [ refreshAddressContext, setRefreshAddressContext ] = useState(false);

    useEffect(() => {
        UserInstance.get(`address/list/`).then(res => {
            if(res.status === 200){
                setAddresses(res.data.results)
            }
        }).catch(err => console.log(err))

    }, [])

    return(
        <AddressContext.Provider value={{ addresses }}>
            { children }
        </AddressContext.Provider>
    )
}
export function useGlobalAddressContext(){
    return useContext(AddressContext);
}