import React from 'react'
import axios from 'axios'
import { Button, Pane, Text, majorScale, toaster } from 'evergreen-ui'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const handleFieldChange = (fieldName, value, setUserInfo, userInfo) => {
    setUserInfo({...userInfo, [fieldName]: value}) // ...userInfo -> copie de userInfo
}

function App(){
    const [userInfo, setUserInfo] = useState({})
    const [home, setHome] = useState("")
    const navigate = useNavigate()
    useEffect(() =>{
        axios.get("http://localhost:3001/home").then(function(response){
        setHome(response.data)
        })
    }, [])

    async function postName(e){
        e.preventDefault()
    
        try {
        await axios.post("http://localhost:3001/logIn", {
            name: userInfo
        }).then(() => {
            toaster.success('Vous êtes reconnus !')
            sessionStorage.setItem("firstname", userInfo.firstname)
            sessionStorage.setItem("lastname", userInfo.lastname)
            console.log(navigate)
            navigate('/Hi')
        })
        } catch (error) {
        console.log(error)
        }
    }
    
    console.log(userInfo)

    return(<form onSubmit={postName}>
        <h2>Log in</h2>
        <input type="text" onChange={(e) => handleFieldChange('firstname' , e.target.value, setUserInfo, userInfo)}/>
        <input type="text" onChange={(e) => handleFieldChange('lastname' , e.target.value, setUserInfo, userInfo)}/>
        <button type="submit">Send Name</button>
        </form>)
}

export default App