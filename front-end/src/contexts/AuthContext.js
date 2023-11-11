import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import api from "../services/api"

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [token, setToken] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    
    const { url } = api();

    useEffect(() => {
        const tokenStoraged = localStorage.getItem('token');

        if(tokenStoraged){
            setToken(tokenStoraged)
        }
    }, [])

    const login = async (login) => {
        setLoading(true)
        const response = await fetch(`${url}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login) 
        }).then((response) => {
            if(response.status !== 200){
                setMessage({msg: "Ocorreu um erro ao realizar login", type: "login"})
                return null;
            }
            
            return response.json();
        }).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.log(error)
            return;
        })

        setLoading(false)
        return response;
    }

    const register = async (data) => {
        setLoading(true)
        const response = await fetch(`${url}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) 
        }).then((response) => {
            if(response.status !== 201){
                setMessage({msg: "Ocorreu um erro ao tentar se cadastrar", type: "register"})
                return null;
            }
            return response.json();
        }).then((responseJson) => {
            return responseJson;
        }).catch((error) => {
            console.log(error)
            return;
        })

        setLoading(false)
        return response;
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null)
    }

  return (
    <AuthContext.Provider value={{ login, register, logout, token, setToken, message, setMessage, loading }}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
}