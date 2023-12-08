import { useEffect, useState, useCallback } from "react";
import { createContext, useContext } from "react";
import api from "../services/api"

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [token, setToken] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    
    const { url } = api();

    const tokenVerify = useCallback(async (token) => {
        
        const response = await fetch(`${url}/token/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(token)
        })

        const status = await response.status;
        return status;

    }, [url])

    const login = async (login) => {
        setLoading(true)
        setMessage("")
        const response = await fetch(`${url}/auth/login`, {
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
        setMessage("")
        const response = await fetch(`${url}/auth/register`, {
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

    useEffect(() => {
        const tokenStoraged = JSON.parse(localStorage.getItem('token'));

        if(tokenStoraged){

           (async() => {
                setLoading(true)

                try{
                    const response = await tokenVerify(tokenStoraged)

                    if(response === 200){
                        setToken(tokenStoraged.token)
                    }else{
                        throw Error("Token inválido")
                    }

                }catch(error){
                    setMessage({msg: "Token expirado ou inválido", type: "token"})
                    logout();
                }
                setLoading(false)
            })()

        }
    }, [tokenVerify])

  return (
    <AuthContext.Provider value={{ login, register, logout, token, setToken, message, setMessage, loading }}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext);
}