import { useState, Fragment, ChangeEvent } from "react"
import { Dialog, Transition } from '@headlessui/react'


export const Task = ({...props}) => {
    const { record, trigger } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [formValue, setFormValue] = useState({
        date: record.date,
        task: record.task,
        assignee: record.assignee,
        done: record.done
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let { name, value } = event.target;
        setFormValue((prevState) => {
            if (name === "done") {
                return {
                    ...prevState,
                    [name]: !done
                }
            }
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const resetState = () => {
        setIsOpen(false);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const respData = await fetch(`https://task-expense-tracker-backend.herokuapp.com/api/v1/tasks/${record.id}`, {
            method: "PUT",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(formValue)
        });
        if(respData.ok) {
            resetState();
            trigger(true);
        }
    }

    const handleDelete =async (e: any) => {
        e.preventDefault();
        const respData = await fetch(`https://task-expense-tracker-backend.herokuapp.com/api/v1/tasks/${record.id}`, {
            method: "DELETE",
            headers: { 'Content-Type': "application/json" },
        });
        if (respData.ok) {
            resetState();
            trigger(true);
        }
    }

    const { date, task, assignee, done } = formValue;

  return (
    <>
        <tr onClick={() => setIsOpen(true)} className={done ? "bg-green-400 bg-opacity-90 text-gray-900 font-medium cursor-pointer" : "bg-red-400 bg-opacity-90 text-gray-900 font-medium cursor-pointer"}>
            <td className="px-6">{date}</td>
            <td className="px-6">{task}</td>
            <td className="px-6">{assignee}</td>
            <td className="px-6">{done ? "Done" : "On Progress"}</td>
        </tr>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Task Details
                    </Dialog.Title>
                    <div className="mt-2">
                    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="date">
                                Date
                            </label>
                            </div>
                            <div className="md:w-2/3">
                                <input onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="date" id="date" type="date" value={date} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="task">
                                Task
                            </label>
                            </div>
                            <div className="md:w-2/3">
                                <input type="text" name="task" value={task} onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="assignee">
                                Assignee
                            </label>
                            </div>
                            <div className="md:w-2/3">
                                <input type="text" name="assignee" value={assignee} onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="done">
                                Mark as Done
                            </label>
                            </div>
                            <div className="md:w-2/3">
                                <input type="checkbox" name="done" checked={done} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="md:flex md:items-end justify-between">
                            <button onClick={handleDelete} className="shadow bg-red-700 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                Delete
                            </button>
                            <div className="space-x-3">
                                <button className="shadow bg-gray-50 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-indigo-800 hover:text-indigo-600 font-bold py-2 px-4 rounded" type="button" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                                <button className="shadow bg-indigo-800 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                    Edit
                                </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    </>
  )
}
