import { useState, Fragment, ChangeEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Dialog, Transition } from '@headlessui/react'


export const AddTask = (props: any) => {
    const { trigger } = props
    const [isOpen, setIsOpen] = useState(false);
    const [formValue, setFormValue] = useState({
        date: "",
        task: "",
        assignee: "",
        done: false
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const resetState = () => {
        setIsOpen(false);
        setFormValue({
            date: "",
            task: "",
            assignee: "",
            done: false
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const respData = await fetch(`http://localhost:5000/api/v1/tasks`, {
            method: "POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(formValue)
        });
        if(respData.ok) {
            resetState();
            trigger(true);
        }
    }

    const { date, task, assignee } = formValue;

    return (
        <>
            <FontAwesomeIcon className="p-2 my-auto rounded-full bg-green-600 cursor-pointer" icon={faPlus} onClick={() => setIsOpen(true)} />
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
                            Add New Task
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
                            {/* <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="description">
                                    Description
                                </label>
                                </div>
                                <div className="md:w-2/3">
                                    <textarea onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="description" id="description" value={description}>
                                    </textarea>
                                </div>
                            </div> */}
                            <div className="md:flex md:items-end justify-end space-x-3">
                                <button className="shadow bg-gray-50 hover:bg-gray-200 focus:shadow-outline focus:outline-none text-indigo-800 hover:text-indigo-600 font-bold py-2 px-4 rounded" type="button" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </button>
                                <button className="shadow bg-indigo-800 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                                    Save
                                </button>
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
