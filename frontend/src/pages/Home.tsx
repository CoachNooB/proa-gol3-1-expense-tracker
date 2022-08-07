import { Link } from "react-router-dom"


export const Home = () => {
  return (
    <div className="bg-indigo-900 text-sky-100 h-screen flex justify-center">
        <div className="container flex flex-col justify-center items-center h-screen">
            <h1 className="text-5xl font-semibold mb-5">Tasks & Expenses Tracker</h1>
            <h2 className="text-xl font-medium mb-10">Record your Team Tasks & Expenses today.</h2>
            <div className="space-x-5">
              <Link className="bg-sky-100 text-indigo-700 py-3 px-8 rounded-md font-medium shadow-sm hover:bg-sky-50 hover:text-indigo-500 transition-all ease-in-out" to={`/tasks`}>
                  Task
              </Link>
              <Link className="bg-sky-100 text-indigo-700 py-3 px-8 rounded-md font-medium shadow-sm hover:bg-sky-50 hover:text-indigo-500 transition-all ease-in-out" to={`/expenses`}>
                  Expense
              </Link>
            </div>
        </div>
    </div>
  )
}
