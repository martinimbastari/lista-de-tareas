import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (id: number) => {
    const newTasks = [...tasks];
    newTasks[id].done = !newTasks[id].done;
    setTasks(newTasks);
  };

  const removeTask = (id: number) => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(id,1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Lista de tareas</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">
                  Agregar
                </button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, id: number) => (
            <div className="card card-body mt-2">
              <h2
                style={{ textDecoration: t.done ? "line-through" : "" }}
                key={id}
              >
                {t.name}
              </h2>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => toggleDoneTask(id)}
                >
                  {t.done ? "✓" : "✕"}
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeTask(id)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
