//rfc
import React from 'react'
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  // this will help to redirect 
  // const history = useNavigate();
  const handelLogout = ()=>{
    localStorage.removeItem('token');
    console.log(location.pathname);
    // history("/login"); // not working but why??
  }
  // this will get us the end point location from where we can get which end point we are hiting
  let location = useLocation();
  // use effect to show this end point in console 
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">My<span className='text-danger'>Notebook</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                  <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
                  </li>
              </ul>
              {/* using ternary operator */}
              {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                  <Link className='btn btn-danger mx-1' type='button' to='/login'>Login</Link>
                  <Link className='btn btn-danger mx-1' type='button' to='/signup'>Sign Up</Link>
                </form>:<Link className='btn btn-danger mx-1' type='button' onClick={handelLogout} to="/login">Logout</Link>}
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar
