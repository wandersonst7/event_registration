import { Routes,Route } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

// pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import FormEvent from '../pages/FormEvent';
import NotFound from "../pages/NotFound";

const RoutesApp = () => {

  const { token } = useAuth();

  return (
    <Routes>
      { token ? (
          <>
              <Route path="/form-event" element={<FormEvent />}/>
              <Route path="/form-event/:id" element={<FormEvent />}/>
          </>
          ): (
          <>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
          </>
          )
      }
      <Route path="/*" element={<NotFound />}/>
      <Route path="/" element={<Home />}/>
    </Routes>
  )
}

export default RoutesApp