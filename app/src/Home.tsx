import React, { useState, useEffect } from "react";
import "./App.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Task = {
  _id: string;
  title: string;
  dateEnd: string;
  description: string;
  status: "Pending" | "Active";
};

export function Home() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const idUser = "6744e5671b4fa961efc34a81"; // Ejemplo de ID

  useEffect(() => {
    // Obtener tareas al cargar el componente
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/gettasks");
        console.log("Tareas obtenidas:", response.data.tasks);
        setTasks(response.data.tasks || []); // Asegurar que siempre se pase un array
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

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
        idUser,
      });

      setTasks((prevTasks) => (data.task ? [...prevTasks, data.task] : prevTasks));
      Swal.fire(data.msg, "", "success");

      setTitle("");
      setDateEnd("");
      setDescription("");
    } catch (error: any) {
      console.error("Error al guardar la tarea:", error.message);
      Swal.fire("Error", "No se pudo guardar la tarea", "error");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`http://localhost:4000/deletetasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      Swal.fire("Error", "No se pudo eliminar la tarea", "error");
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, status: "Pending" | "Active") => {
    try {
      await axios.put(`http://localhost:4000/updatetasks/${taskId}`, { status });
      setTasks(tasks.map((task) =>
        task._id === taskId ? { ...task, status } : task
      ));
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      Swal.fire("Error", "No se pudo actualizar la tarea", "error");
    }
  };

  const SeeTasks = () => {
    navigate("/Tasks");
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
        {tasks.map((task) =>
          task && task._id && task.status ? (
            <li
              key={task._id}
              className={`todo-item ${task.status === "Active" ? "Active" : ""}`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={task.status === "Active"}
                  onChange={() => handleUpdateTaskStatus(task._id, task.status === "Pending" ? "Active" : "Pending")}
                />
                <span>
                  {task.title} - <small>{task.dateEnd}</small>
                </span>
              </label>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task._id)}
              >
                Delete
              </button>
            </li>
          ) : null
        )}
      </ul>
      <button type="button" onClick={SeeTasks}>
        Ver Tareas Almacenadas
      </button>
    </div>
  );
}

export default Home;
