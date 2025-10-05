import {createContext, useContext, useEffect, useState} from "react";
import {apiPaths} from "../../config/apiPaths";
import {axiosInstance} from "../../config/axiosInstance";

const AuthContext = createContext({
    user: null,
    setUser: () => {}
});

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthGuard({children}) {
    const [user, setUser] = useState(null);

    useEffect( () => {
        (async function getUserData() {
            const url = apiPaths.auth.getUser()
            const response = await axiosInstance.get(url)

            setUser(response?.data)
        })()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser}}>{children}</AuthContext.Provider>
    )
}


