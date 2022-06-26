import Form from "./Form";
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from "../hook/useAuth";
import Lists from "./Lists";

function Container() {
  const {user} = useAuth();
  const [lists, setLists] = useState([]);

  let { id } = useParams();
  useEffect( () => {
       fetch(`http://localhost:3001/${id}/dashboard`, {
       credentials: "include",
     }).then((response) => response.json())
     .then((data) => console.log(data))
  }, [id])
  //fetch the lists from database
  useEffect( () => {
    const fetchLists = async () => {
      await fetch(`http://localhost:3001/${id}/lists`)
      .then((res) => res.json()
      .then((data) => setLists(data)))
    }
    fetchLists();
  }, [])
  // add to-do list 
  const addLists = async (list) => {
    const res = await fetch(`http://localhost:3001/${id}/api/list/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(list)
    })
    const data = await res.json();
    setLists([...lists, list])
  }

  // delete to-do list form server
  const onDelete = async (id) => {
    await fetch(`http://localhost:3001/api/list/delete/${id}`, {
      method: 'DELETE',
    })
    setLists(lists.filter((list) => list.id !== id))
  }

  return (
    <section className="layout container">
      <div className="form-layout mt-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <p>{user}</p>
            <Form addLists={addLists} />
          </div>
          <div className="col-12 col-md-6">
          {lists.map((list, index) => {
            return <div className="card list" key={index}>
              <h3 className='note'>{list.note}</h3>
              <span className='small'>{list.day}</span>
              <button onClick={() => onDelete(list.id)} className='bt-dlt'>X</button>
          </div>
          })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Container