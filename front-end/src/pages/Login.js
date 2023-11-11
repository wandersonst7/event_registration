import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import styles from './Login.module.css';

const Login = () => {

    const { login, message, setToken } = useAuth();
    const redirect = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username,
            password
        }
        
        const response = await login(data);

        if(response){
            setToken(JSON.stringify(response))
            localStorage.setItem('token', JSON.stringify(response))
            redirect("/")
        }
    }

  return (
    <div className={styles.login} >
        <h2 className="text-center">Login</h2>
        {
            message && message.type === "login" && (
                <p className="alert alert-danger">{message.msg}</p>
            )
        }
        <form onSubmit={handleSubmit}>
            <div className="my-2">
                <label className="form-label" htmlFor="username">Username:</label>
                <input className="form-control"  type="text" name="username" id="username"
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Digite seu nome de usuário"
                    required
                />
            </div>
            <div className="my-2">
                <label className="form-label" htmlFor="password">Senha:</label>
                <input className="form-control" type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value) } 
                    placeholder="Digite sua senha"
                    required
                />
            </div>
            <div className="my-4">
                <button className="w-100 btn btn-success" type="submit">Login</button>
            </div>
            <div className="text-center">
                <p>Ainda não possui conta?</p>
                <Link to="/register"><strong> Cadastrar-se </strong></Link>
            </div>
            
        </form>
    </div>
  )
}

export default Login