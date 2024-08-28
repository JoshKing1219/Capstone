import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import AllTheories from "./components/AllTheories";
import SingleTheory from "./components/SingleTheory";
import "./App.css";
import { useState } from "react";
import UserAccount from "./components/UserAccount";

function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/theories" element={<AllTheories />} />
        <Route path="/theory/:id" element={<SingleTheory />} />
        <Route path="/my-account" element={<UserAccount token={token} />} />
      </Routes>
    </div>
  );
}

export default App;
