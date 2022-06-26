import Button from "./Button";
import { useState } from 'react';

function Form({addLists}) {
  const [note, setNote] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (note === "" || day === "") {
      setError("All fields are required")
    }
    addLists({note, day});
    
    setNote('');
    setDay('');
  }

  return (
    <div className="p-3 mb-5 mx-auto add-form-list">
      {error && 
    <div className="alert alert-danger" role="alert">
          {error}
    </div>}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="note" className="form-label">
            Note
          </label>
          <input type="text" className="form-control" id="note" placeholder="note" autoComplete="off" value={note || ''} onChange={(e) => setNote(e.target.value)}/>
        </div>
        <div className="col-12">
          <label htmlFor="dateTime">
            Time - Date
          </label>
          <input type="text" id="dateTime" className="form-control" placeholder="date, time" autoComplete="off" value={day || ''} onChange={(e) => setDay(e.target.value)}/>
        </div>
        <div className="col-12">
          <Button text="Add" />
        </div>
      </form>
    </div>
  )
}

export default Form