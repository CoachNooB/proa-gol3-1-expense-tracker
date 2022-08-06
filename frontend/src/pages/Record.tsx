import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { RecordList, AddRecord } from "../components"


export const Record = () => {
  const [records, setRecords] = useState([]);
  // eslint-disable-next-line
  const [balance, setBalance] = useState(0);
  const [newRequest, setNewRequest] = useState(false);

  const getRecords = async () => {
    const respData = await fetch(`http://localhost:5000/api/v1/expenses`, { method: "GET" })
    if(respData.ok) {
      const data = await respData.json();
      console.log(data);
      setBalance(data.balance);
      data.records ? setRecords(data.records) : setRecords([])
      setNewRequest(false);
    }
  }

    useEffect(() => {
        getRecords();
    }, [newRequest])

  return (
    <div className="bg-indigo-900 text-sky-100 min-h-screen flex justify-center">
        <div className="container flex flex-col justify-start w-1/2 py-10 space-y-5">
          <h1 className="text-center mb-10 text-5xl font-semibold italic">Your Cashflow Records</h1>
          <div className="flex justify-center">
            <Link className="bg-sky-100 text-indigo-700 py-3 px-8 rounded-md font-medium shadow-sm hover:bg-sky-50 hover:text-indigo-500 transition-all ease-in-out" to={"/"}>
              Home
            </Link>
          </div>
          <div className="flex justify-between my-3 px-6">
            <h1 className={`py-2 text-xl`}>Balance :  <span className={`${balance < 0 ?  "text-red-400" : "text-green-400"}`}>{balance}</span></h1>
            <AddRecord trigger={setNewRequest} />
          </div>
          <RecordList trigger={setNewRequest} records={records} />
        </div>
    </div>
  )
}
