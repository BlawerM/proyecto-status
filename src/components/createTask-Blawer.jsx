import './CreateTask.css'
import { useState} from 'react';

function CreateTask({onCreateTask}) {
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            onCreateTask(newTask.trim());
            setNewTask('');
        }
    }

    return (
        <div>
            <input type="text" name="text" id="text" value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='Escriba la nueva tarea'
            />

            <button onClick={addTask}>Agregar</button>
        </div>
    )
}

export default CreateTask;