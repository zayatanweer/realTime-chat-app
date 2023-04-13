import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from 'react-router-dom';

let user;

const sendUser = () =>{
    user = document.getElementById("JoinInput").value;
    document.getElementById("JoinInput").value = "";
}
const Join = () => {

    const [name, setname] = useState("");

    return (
        <div className='JoinPage'>
           <div className='JoinContainer'>
            <img src={logo} alt="logo" />
            <h1>ANGEL</h1>
            <input onChange={(e) => setname(e.target.value)} placeholder='Enter Your Name' type="text" id='JoinInput' />
            <Link onClick={(event)=>!name?event.preventDefault():null} to = "/chat"> <button onClick={sendUser} className='Joinbtn'>Log in</button></Link>

            </div> 
        </div>
    )
}

export default Join
export{user}
