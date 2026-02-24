import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";

import "./index.css";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Sidebar />

        <div className="main-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/assignments" element={<Assignments />} />
          </Routes>
        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;