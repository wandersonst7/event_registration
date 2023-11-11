import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  
  const { token, logout } = useAuth();
  const redirect  = useNavigate();

  const handleSubmit = () => {
    logout();
    redirect("/")
  }

  return (
  <nav data-bs-theme="dark">
    <div className="collapse text-bg-dark" id="navbarHeader">
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-md-7 py-4">
            <h4>Sobre</h4>
            <p className="text-body-secondary" style={{letterSpacing: 1.5}}>EventRegistration é uma plataforma definitiva para simplificar e aprimorar a gestão de eventos! Oferece uma experiência intuitiva e eficiente para criar, visualizar, atualizar e excluir eventos.</p>
            {
              token && (
                <button onClick={ () => handleSubmit() }className="btn btn-outline-warning">Logout</button>
              )
            }
          </div>
        </div>
      </div>
    </div>
    <div className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <strong>EventRegistration</strong>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </nav>
  )
}

export default NavBar