import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  // creating a credential state to record the updated user data in the form  
  const {showAlert} = props;
  const [credentials, setCredential] = useState({email:"", password:"", name:"", cpassword :""});
  const history = useNavigate();
  const handelSubmit = async(e)=>{
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/createuser`;
    const {name , email , password} = credentials;
    const response = await fetch(url, {
        // destructuring 
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name , email , password}),
      });
    
      const json = await response.json();
      console.log(json);
      if(json.success){
        // saving the auth token to local storage and redirect
        localStorage.setItem('token', json.authtoken);
        showAlert("Account created Succesfully", "success");
        // using history hook to redirect 
        history("/login");
      }
      else{
        // alert("Tnvalid credentials");
        showAlert("Tnvalid credentials", "warning");
      }
  }
  // store the user updated data in the credential state in runtime 
  const onChnage = (e)=>{
    setCredential({...credentials, [e.target.name]: e.target.value});
  }
  return (
    <div className='container' onSubmit={handelSubmit}>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChnage}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChnage}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChnage} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChnage} minLength={5} required/>
        </div>
        <button disabled = {credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
