import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import Switch from "react-switch";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";

const handleFieldChange = (fieldName, value, setUserInfo, userInfo) => {
  setUserInfo({...userInfo, [fieldName]: value}) // ...userInfo -> copie de userInfo
}

function App() {
  const [userInfo, setUserInfo] = useState({})
  const [home, setHome] = useState("")

  useEffect(() =>{
    axios.get("http://localhost:3001/home").then(function(response){
      setHome(response.data)
    })
  }, [])

  async function postName(e){
    e.preventDefault()

    try {
      await axios.post("http://localhost:3001/userInfo", {
        name: userInfo
      }) 
    } catch (error) {
      console.log(error)
    }
  }

  console.log(userInfo)

  return (
    <Router>
      <div>
        <Link to="/home">Home</Link>
      </div>
      
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
        
      
    
    <div className="App">
      <form onSubmit={postName}>
        <input type="text" onChange={(e) => handleFieldChange('firstname' , e.target.value, setUserInfo, userInfo)}/>
        <input type="text" onChange={(e) => handleFieldChange('lastname' , e.target.value, setUserInfo, userInfo)}/>
        <button type="submit">Send Name</button>
      </form>
      {home}
    </div>
    </Router>
  );
}

export default App;
