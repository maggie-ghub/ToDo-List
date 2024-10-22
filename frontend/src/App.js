import React, { useEffect, useState } from 'react';
import List from './components/List';
import axios from 'axios';
import { baseURL } from './utils/constant';
const App = () => {

  const [ input, setInput] = useState("");
  const [ tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false)
  const [updateId, setUpdateId] = useState(null)

  useEffect(() => {
    axios.get(`${ baseURL }/get`)
    .then((res) => {
      console.log(res.data);
      setTasks(res.data)
    })
  }, [updateUI]);

 /*const baseURL = 'http://localhost:5000/api';*/
const addTask = () => {
  axios.post(`${ baseURL }/save`, {task: input}).then((res) => {
    console.log(res.data);
    setInput("")
    setUpdateUI((prevState)=> !prevState)
  })
}

const updateMode = (id,text) => {
  console.log(text)
  setInput(text)
  setUpdateId(id)
};
const updateTask = () => {
  axios.put(`${ baseURL}/update/${updateId}`, {task: input}).then((res) => {
    console.log(res.data);
    setUpdateUI((prevState) => !prevState)
    setUpdateId(null);
    setInput("");
  })
}

  return (
    <main>
      <h1 className="title">CRUD Operations</h1>  

      <div className="input_holder">
        <label className="username">USER NAME: </label> <input classname="taskname"
          type="text" placeholder="Enter Task To Add"
          
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update Task" : "Add Task"}  
        </button>
      </div>
      
  <ul>
  
  <h1>List of Tasks</h1>
    {tasks.map(task => (
      <List
      key={task._id} 
      id={task._id} 
      task={task.task} 
      setUpdateUI={setUpdateUI}
      updateMode={updateMode}
      />
    ))}
  </ul>


    </main>
  );

  
};

export default App