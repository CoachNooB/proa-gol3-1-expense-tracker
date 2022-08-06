import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Record } from "./pages"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
