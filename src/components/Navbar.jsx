import React from 'react';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='/login'
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">GMhotels</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className="fa fa-bars" style={{color:"white"}}></i>  </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                <>
                  <div className="dropdown"  style={{ position: 'relative', display: 'inline-block' }}>

                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-user" aria-hidden="true"></i> {user.name}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><a className="dropdown-item" href="/profile">Profile</a></li>
                      {user.isAdmin ? (<li><a className="dropdown-item" href="/admin">Admin</a></li>):<></>}
                      <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                    </ul>
                  </div>
                </>) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li></>)}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
