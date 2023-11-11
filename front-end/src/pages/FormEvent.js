import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useEvent from '../hooks/useEvent';

const FormEvent = () => {

  const { postEvent, putEvent, getEvent, loading } = useEvent();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const { id } = useParams();

  useEffect(() => {

    (async() => {

      if(id){
        const data = await getEvent(id);

        if(data){
          setName(data.name)
          setDescription(data.description)
          setDate(data.date)
        }
      }

    })()

  }, [id, getEvent])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = {
      name,
      description,
      date
    }

    if(id){
      await putEvent(event, id)
    }else{
      await postEvent(event)
    }
    
  }

  return (
    <div className="container-app container-fluid d-flex flex-column align-items-center justify-content-center">
        { id ? (<h1>Editar Evento</h1>) : (<h1>Cadastrar Evento</h1>) }
        <form onSubmit={handleSubmit} className='w-50 my-4'>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome do Evento: </label>
          <input name="name" type="text" className="form-control" id="name" placeholder="Digite o nome para o evento" onChange={(e) => setName(e.target.value)} value={name ? name : ""}/>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrição: </label>
          <textarea name="description" type="text" className="form-control" id="description" placeholder="Digite uma descrição para o evento" rows="5" onChange={(e) => setDescription(e.target.value)} value={description ? description : ""}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Data: </label>
          <input name="date" type="date" className="form-control" id="date" onChange={(e) => setDate(e.target.value)} value={date ? date : ""}/>
        </div>

          {loading && (<button className="btn btn-secondary w-100" type="button" disabled>Aguarde...</button>)}
          {!loading && (<button className="btn btn-success w-100" type="submit">Enviar</button>)}
        </form>
    </div>
  )
}

export default FormEvent