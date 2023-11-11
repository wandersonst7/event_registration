import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, message, setToken } = useAuth();

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const redirect = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username,
            email,
            password
        }

        const response = await register(data);

        if(response){
            setToken(JSON.stringify(response))
            localStorage.setItem('token', JSON.stringify(response))
            redirect("/")
        }
    }

  return (
    <div className="w-50 mx-auto my-5" >
        <h2 className="text-center">Cadastre-se</h2>
        {
            message && message.type === "register" && (
                <p className="alert alert-danger">{message.msg}</p>
            )
        }
        <form onSubmit={handleSubmit} className="w-100">
            <div className="m-2">
                <label className="form-label" htmlFor="username">Username:</label>
                <input className="form-control"  type="text" name="username" id="username"
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Digite seu nome de usuário"
                    required
                />
            </div>
            <div className="m-2">
                <label className="form-label" htmlFor="email">E-mail:</label>
                <input className="form-control" type="email" name="email" id="email"
                    onChange={(e) => setEmail(e.target.value) } 
                    placeholder="Digite seu email"
                    required
                />
            </div>
            <div className="m-2">
                <label className="form-label" htmlFor="password">Senha:</label>
                <input className="form-control" type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value) } 
                    placeholder="Digite sua senha"
                    required
                />
            </div>
            <div className="m-2">
                <button className="w-100 btn btn-success" type="submit">Cadastrar-se</button>
            </div>
        </form>
    </div>
  )
}

export default Register