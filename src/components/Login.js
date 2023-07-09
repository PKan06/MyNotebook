import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const {showAlert} = props;
    const[credential , setCredential] = useState({email : "", password : ""});
    let history = useNavigate();
    const handelSubmit = async(e)=>{
        e.preventDefault();
        const url = `http://localhost:5000/api/auth/login`;
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credential.email, password : credential.password}),
          });
        
          const json = await response.json();
          console.log(json);
          if(json.success){
            // saving the auth token to local storage and redirect
            localStorage.setItem('token', json.authtoken);
            // using history hook to redirect 
            history("/");
            showAlert("Loged in Successfully", "success");
          }
          else{
            // alert("Tnvalid credentials");
            showAlert("Tnvalid credentials", "warning");
          }
    }
    const onChange = (e)=>{
        // this function will take care of the updated notes 
        // as they are reflected in real time in react developer tools
        setCredential({...credential, [e.target.name]: e.target.value})
      }
  return (
    <div className='container' onSubmit={handelSubmit}>
      <form>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Login
