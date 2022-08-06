import { Record } from "./Record.component";

export interface IRecord {
    id?: string,
    type: string,
    amount: number,
    description: string,
    date: string
}

export const RecordList = ({...props}) => {
    const { records, trigger } = props;

    return (
        <>
            <table className="border border-separate border-spacing-1 min-w-full border-indigo-200">
                <thead>
                    <tr>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Date
                        </th>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Type
                        </th>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Amount
                        </th>
                        <th className="text-left px-6 border-b bg-sky-800 text-indigo-200">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.length < 1 ?
                        (
                            <tr key={1}>
                                <td className="text-center font-medium" colSpan={4}>No Data ...</td>
                            </tr>
                        )
                        :
                        records.map((record: any) => {
                            return <Record key={record.id} trigger={trigger} record={record} />
                        })
                    }
                </tbody>
            </table>
            
        </>
    )
}
