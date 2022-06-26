import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Lists = ({onDelete, lists}) => {

  return (
    <>
      {/* {lists.map((list, index) => {
        return <div className="card list" key={index}>
            <h3 className='note'>{list.note}</h3>
            <span className='small'>{list.day}</span>
            <button onClick={() => onDelete(list.id)} className='bt-dlt'>X</button>
        </div>
      })} */}
    </>
  )
}

export default Lists