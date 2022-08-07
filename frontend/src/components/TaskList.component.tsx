import { Task } from "./index";

export interface ITask {
    id?: string,
    task: string,
    assignee: string,
    done: boolean,
    date: string
}

export const TaskList = ({...props}) => {
    const { tasks, trigger } = props;

    return (
        <>
            <table className="border border-separate border-spacing-1 min-w-full border-indigo-200">
                <thead>
                    <tr>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Date
                        </th>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Task
                        </th>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Assignee
                        </th>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.length < 1 ?
                        (
                            <tr key={1}>
                                <td className="text-center font-medium" colSpan={4}>No Data ...</td>
                            </tr>
                        )
                        :
                        tasks.map((task: any) => {
                            return <Task key={task.id} trigger={trigger} record={task} />
                        })
                    }
                </tbody>
            </table>
            
        </>
    )
}
