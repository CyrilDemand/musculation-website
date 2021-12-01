import React from 'react'

function App(){
    let firstname = sessionStorage.getItem("firstname")
    let lastname = sessionStorage.getItem("lastname")

    return(<h1>Hello {firstname} {lastname}</h1>)
}


export default App