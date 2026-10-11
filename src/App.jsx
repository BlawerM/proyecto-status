import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import CreateTask from './components/CreateTask'


function App() {
    const [tasks, setTasks] = useState([]);

    const addTask = (addTask) => {
        setTasks([...tasks, addTask]);
    };

// Pending eliminar las tareas creadas
  return (
    <div className='exterior'>
        <h2>LISTA DE TAREAS</h2>
        <CreateTask onCreateTask={addTask}/>

        <ul>
            {tasks.map((task, i) => (
                <li key={i}>
                    {task}
                </li>
            ))}

        </ul>
    </div>
  )
}

export default App;
