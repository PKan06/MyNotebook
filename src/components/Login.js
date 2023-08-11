import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';

const Login = (props) => {
    const {showAlert} = props;
    const[credential , setCredential] = useState({email : "", password : ""});
    let history = useNavigate();
    const handelSubmit = async(e)=>{
        e.preventDefault();
        const url = `https://my-notebook-two.vercel.app/api/auth/login`;
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
            // saving the auth token to local storage and so that we can redirect to notes page after getting auth token redirect
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
    <div className='text-center single-form-page' >
      <h2 className='my-4 '>Login</h2>
      <div className='container'  style={{width: 23+'rem'}} onSubmit={handelSubmit}>
        <form>
          <div className="mb-3 form-floating">
              <input type="email" className="form-control" id="floatingemail" name='email' placeholder="name@example.com" onChange={onChange}/>
              <label htmlFor="floatingemail" >Email address</label>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 form-floating">
              <input type="password" className="form-control" id="floatingpassword" name="password" placeholder="Password" onChange={onChange}/>
              <label htmlFor="floatingpassword">Password</label>
          </div>
          <button type="submit" className=" w-50 btn btn-danger">Submit</button>
          <p className="mt-5 mb-3 text-muted">© 2023</p>
          </form>
      </div>
    </div>
  )
}

export default Login
