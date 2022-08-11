import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { TaskList, AddTask } from "../components";


export const Task = () => {
  const [tasks, setTasks] = useState([]);
  // eslint-disable-next-line
  const [newRequest, setNewRequest] = useState(false);

  const getTasks = async () => {
    const respData = await fetch(`https://task-expense-tracker-backend.herokuapp.com/api/v1/tasks`, { method: "GET" })
    if(respData.ok) {
      const data = await respData.json();
      console.log(data);
      data.tasks ? setTasks(data.tasks) : setTasks([])
      setNewRequest(false);
    }
  }

    useEffect(() => {
        getTasks();
    }, [newRequest])

  return (
    <div className="bg-indigo-900 text-sky-100 min-h-screen flex justify-center">
        <div className="container flex flex-col justify-start w-1/2 py-10 space-y-5">
          <h1 className="text-center mb-10 text-5xl font-semibold italic">Manage Your Team Tasks</h1>
          <div className="flex justify-center">
            <Link className="bg-sky-100 text-indigo-700 py-3 px-8 rounded-md font-medium shadow-sm hover:bg-sky-50 hover:text-indigo-500 transition-all ease-in-out" to={"/"}>
              Home
            </Link>
          </div>
          <div className="flex justify-between my-3 px-6">
            <h1 className={`py-2 text-xl`}>Total Tasks :  <span className={"text-green-400"}>{tasks.length}</span></h1>
            <AddTask trigger={setNewRequest} />
          </div>
          <TaskList trigger={setNewRequest} tasks={tasks} />
        </div>
    </div>
  )
}
