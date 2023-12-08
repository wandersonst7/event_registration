import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';

const useEvent = () => {

  const { url } = api();
  const [loading, setLoading] = useState(false);
  
  const redirect = useNavigate();

  const getEvent = useCallback(async (id, authorization) => {

    setLoading(true)
    return await fetch(`${url}/events/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authorization}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if(response.status !== 200){
        setLoading(false)
        return;
      }
      return response.json();
    }).then((responseJson) => {
      setLoading(false)
      return responseJson;
    }).catch((error) => {
      setLoading(false)
    })

  }, [url, ])

  const getAllEvents = useCallback(async () => {
    setLoading(true)
    return await fetch(`${url}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if(response.status !== 200){
        setLoading(false)
        return;
      }
      return response.json();
    }).then((responseJson) => {
      setLoading(false)
      return responseJson;
    }).catch((error) => {
      setLoading(false)
    })

  }, [url])

  const postEvent = async (event, authorization) => {
    setLoading(true)
    return await fetch(`${url}/events`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authorization}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }).then((response) => {
      if(response.status !== 201){
        setLoading(false)
        return;
      }
      setLoading(false)
      redirect("/")
    }).catch((error) => {
      setLoading(false)
    })
  
  }

  const putEvent = async (event, id, authorization) => {
    setLoading(true)
    return await fetch(`${url}/events/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${authorization}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }).then((response) => {
      if(response.status !== 200){
        setLoading(false)
        return;
      }
      setLoading(false)
      redirect("/")
    }).catch((error) => {
      setLoading(false)
    })

  }

  const deleteEvent = async (id, authorization) => {
    setLoading(true)
    return await fetch(`${url}/events/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${authorization}`,
        "Content-Type": "application/json"
      },
    }).then((response) => {
      if(response.status !== 200){
        setLoading(false)
        return;
      }
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
    })
  }

  return { getEvent, getAllEvents, postEvent, putEvent, deleteEvent, loading }

}

export default useEvent;
