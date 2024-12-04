import React, { useState } from "react";
import "./App.css";
import Swal from "sweetalert2";
import axios from "axios";

// Define el tipo para las tareas
type Task = {
  _id: string;
  title: string;
  dateEnd: string;
  description: string;
  status: "pending" | "completed";
};

export function Home() {
  const [title, setTitle] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Este id debe obtenerse dinámicamente según el usuario autenticado
  const idUser = "6744e5671b4fa961efc34a81"; // Ejemplo estático

  const handleTasks = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !dateEnd || !description) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    try {
      Swal.fire("Guardando Tarea...");
      Swal.showLoading();

      const { data } = await axios.post("http://localhost:4000/createtask", {
        title,
        dateEnd,
        description,
        status: "Pending",
        idUser, // Enviar el id del usuario autenticado
      });

      setTasks([...tasks, data.task]); // Agregar la tarea creada al estado
      Swal.fire(data.msg, "", "success");

      // Limpiar los campos después de guardar
      setTitle("");
      setDateEnd("");
      setDescription("");
    } catch (error: any) {
      console.error("Error al guardar la tarea:", error.message);
      Swal.fire("Error", "No se pudo guardar la tarea", "error");
    }
  };

  return (
    <div className="todo-app">
      <h1 className="title">To-Do App</h1>
      <form className="todo-form" onSubmit={handleTasks}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={dateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`todo-item ${task.status === "completed" ? "completed" : ""}`}
          >
            <label>
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() =>
                  setTasks(
                    tasks.map((t) =>
                      t._id === task._id ? { ...t, status: t.status === "pending" ? "completed" : "pending" } : t
                    )
                  )
                }
              />
              <span>
                {task.title} - <small>{task.dateEnd}</small>
              </span>
            </label>
            <button
              className="delete-btn"
              onClick={() => setTasks(tasks.filter((t) => t._id !== task._id))}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
