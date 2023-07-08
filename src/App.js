import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Switch -> Routes
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState({msg :"This is a best Notes App in the market", type:"success"});
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type : type
    })

    setTimeout(()=>{
      setAlert({msg :"", type:""});
    }, 2000); // setting the alert OFF setting its veriable null
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
