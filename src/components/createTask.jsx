import { useState } from "react"
import ButtonFS from "./ButtonFS.jsx"
import "./createTask.css"

function CreateTask() {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  const agregar = () => {
    if (texto.trim() === "") return;
    setTareas([...tareas, { id: Date.now(), texto: texto, cumplida: false }]);
    setTexto("");
  };

  const marcar = (id) => {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, cumplida: !t.cumplida } : t)));
  };

  return (
    <div>
      <h1>Mis actividades diarias</h1>
      <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      <ButtonFS text="Agregar meta del día" onClick={agregar} />

      <ul>
        {tareas.map((t) => (
          <li key={t.id} className={t.cumplida ? "cumplida" : ""} onClick={() => marcar(t.id)}>
            {t.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CreateTask;