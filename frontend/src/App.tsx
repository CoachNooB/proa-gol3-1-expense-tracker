import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Record, Task } from "./pages"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Record />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
