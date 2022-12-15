import { Fragment } from "react";
import {Link} from 'react-router-dom';

const NavBar = () => {
return(
    <Fragment>
        <nav className="navbar navbar-expand-lg bg-light bg-header">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" href="#" to="/">User Management</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white" aria-current="page"  to="/">Home</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link text-white" href="#" to="/create-user">Create User</Link>
        </li> */}
        
      </ul>
      
    </div>
  </div>
</nav>
    </Fragment>
)
}
export default NavBar;