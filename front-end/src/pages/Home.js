import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useEvent from "../hooks/useEvent"
import { useAuth } from "../contexts/AuthContext";

const Home = () => {

  const { deleteEvent, getAllEvents, loading } = useEvent();
  const [events, setEvents] = useState([]);
  const [deleted, setDeleted] = useState(null);

  const { token } = useAuth();
  
  useEffect( () => {

    ( async () => {
      const data = await getAllEvents();
      if(data){
        setEvents(data)
      }
    })()

    if(deleted){
      setDeleted(false)
    }


  }, [deleted, getAllEvents])

  const handleDelete = async (id) => {
    await deleteEvent(id)
    setDeleted(true)
  }

  const dateFormatter = (date) => {
    let dateArray = date.split("-")
    let dateString = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
    return dateString;
  }
  

  return (
    <div className="container-app container">

      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Cadastre um evento</h1>
            <p className="lead text-body-secondary">Gerencie seus eventos de forma descomplicada.</p>
            <div>
              {
                token ? (
                  <Link to="/form-event" className="btn btn-primary my-2">Novo Evento</Link>
                ) : (
                  <Link to="/login" className="btn btn-primary my-2">Fazer Login</Link>
                )
              }
            </div>
          </div>
        </div>
      </section>

        <h2 className="mb-5 fw-light">Todos os eventos</h2>
        { loading && (<p>Carregando...</p>)}
        { !loading &&
        <div className="row row-cols-sm-2 row-cols-md-3 g-3">
          {
            events && events.map((event) => (
              <div className="col" key={event.id}> 
                <div className="card shadow-sm">
                  <img src="/foto-evento.jpg" alt="foto do evento" />
                  <div className="card-body">
                    <h4 className="card-text">{event.name}</h4>
                    <p className="card-text">{event.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        {
                          token ? (
                            <>
                              <Link to={`/form-event/${event.id}`} className="btn btn-sm btn-outline-secondary">Editar</Link>
                              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(event.id)}>Excluir</button>
                            </>
                          ) : (
                            <></>
                          )
                        }
                      </div>
                      <small className="text-body-secondary">{dateFormatter(event.date)}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div> }

    </div>
  )
}

export default Home