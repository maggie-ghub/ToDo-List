import React from 'react'
import axios from 'axios'
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { baseURL } from '../utils/constant';


const List = ({ id, task, setUpdateUI, updateMode }) => {
  const deleteTask = () =>{
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };
  return (
    <li>
       {task}
       <div className="icon_hoder" >
            <BiEditAlt className="icon" onClick={() => updateMode(id, task)}/>
            <BsTrash className="icon" onClick={deleteTask} />
        </div> 
    </li>
  )
}

export default List