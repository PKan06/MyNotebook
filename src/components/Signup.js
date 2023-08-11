import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  // creating a credential state to record the updated user data in the form  
  const {showAlert} = props;
  const [credentials, setCredential] = useState({email:"", password:"", name:"", cpassword :""});
  const history = useNavigate();
  const handelSubmit = async(e)=>{
    e.preventDefault();
    const url = `https://my-notebook-two.vercel.app/api/auth/createuser`;
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
    <div className='text-center single-form-page'>
      <h2 className='my-4 '>Sign Up</h2>
      <p className = 'mb-5' style={{fontSize : 1.3 + 'rem'}}>Hurry Up!! Start your MyNotebook journey with us </p>
      <div className='container ' style={{width: 23+'rem'}} onSubmit={handelSubmit}>
        <form>
          <div className="mb-3 form-floating">
            <input type="text" className="form-control " id="name" name='name' placeholder='Name' onChange={onChnage}/>
            <label htmlFor="name" >Name</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="email" className="form-control" id="email"  name='email' placeholder='Email Address' onChange={onChnage}/>
            <label htmlFor="email" >Email address</label>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" className="form-control" id="password" name='password' placeholder='Password' onChange={onChnage} minLength={5} required/>
            <label htmlFor="password" className="form-label">Password</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder='Retype Password' onChange={onChnage} minLength={5} required/>
            <label htmlFor="cpassword" className="form-label">Retype Password</label>
          </div>
          <button disabled = {credentials.password !== credentials.cpassword} type="submit" className="btn btn-danger w-50">Submit</button>
          <p className="mt-5 mb-3 text-muted">© 2023</p>

        </form>
      </div>
    </div>
  )
}

export default Signup
