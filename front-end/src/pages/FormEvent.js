import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import useEvent from '../hooks/useEvent';
import styles from './FormEvent.module.css';

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
    <div className={styles.formEvent}>
        { id ? (<h2 className="text-center">Editar Evento</h2>) : (<h2 className="text-center">Cadastrar Evento</h2>) }
        <form onSubmit={handleSubmit}>

          <div className="my-2">
            <label htmlFor="name" className="form-label">Nome do Evento: </label>
            <input name="name" type="text" className="form-control" id="name" placeholder="Digite o nome para o evento" onChange={(e) => setName(e.target.value)} value={name ? name : ""} required/>
          </div>

          <div className="my-2">
            <label htmlFor="description" className="form-label">Descrição: </label>
            <textarea name="description" type="text" className="form-control" id="description" placeholder="Digite uma descrição para o evento" rows="5" onChange={(e) => setDescription(e.target.value)} value={description ? description : ""} required></textarea>
          </div>

          <div className="my-2">
            <label htmlFor="date" className="form-label">Data: </label>
            <input name="date" type="date" className="form-control" id="date" onChange={(e) => setDate(e.target.value)} value={date ? date : ""} required/>
          </div>

          {loading && (<button className="btn btn-secondary w-100 my-4" type="button" disabled>Aguarde...</button>)}
          {!loading && (<button className="btn btn-success w-100 my-4" type="submit">Enviar</button>)}
        </form>
    </div>
  )
}

export default FormEvent