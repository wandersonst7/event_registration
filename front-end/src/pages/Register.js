import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const { register, message, setToken, loading } = useAuth();

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
    <div className={styles.register}>
        <h2 className="text-center">Cadastro</h2>
        {
            message && message.type === "register" && (
                <p className="alert alert-danger">{message.msg}</p>
            )
        }
        <form onSubmit={handleSubmit} className="w-100">
            <div className="my-2">
                <label className="form-label" htmlFor="username">Username:</label>
                <input className="form-control"  type="text" name="username" id="username"
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Digite seu nome de usuário"
                    required
                />
            </div>
            <div className="my-2">
                <label className="form-label" htmlFor="email">E-mail:</label>
                <input className="form-control" type="email" name="email" id="email"
                    onChange={(e) => setEmail(e.target.value) } 
                    placeholder="Digite seu email"
                    required
                />
            </div>
            <div className="mt-2">
                <label className="form-label" htmlFor="password">Senha:</label>
                <input className="form-control" type="password" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value) } 
                    placeholder="Digite sua senha"
                    required
                />
            </div>
            <div className="my-4">
                {
                    loading ? (
                        <button className="w-100 btn btn-secondary" type="button">Aguarde...</button>
                    ) : (
                        <button className="w-100 btn btn-success" type="submit">Cadastrar-se</button>
                    )
                }
            </div>
            <div className="text-center">
                <p>Já possui conta?</p>
                <Link to="/login"><strong> Fazer Login </strong></Link>
            </div>
        </form>
    </div>
  )
}

export default Register