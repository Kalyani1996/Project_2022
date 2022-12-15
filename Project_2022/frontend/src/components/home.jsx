import { useState, useEffect } from "react";
import { Fragment } from "react"
import UserService from "../services/UserServices";
import {Link} from 'react-router-dom';

const HomeComponent = () =>{
  const[getuserdata,setUserData] = useState([]);
  const[message,setMessage] = useState("");
  const serv = new UserService();
  async function loadUserData(){
            
    fetch(`http://localhost:7011/api/users`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
        
    })            
    .then(resp => resp.json())
    .then(resp => setUserData(resp.data))
    
}
  useEffect(()=>{
  
    
  loadUserData();
  },[]);

  const deleteUser = (id,imgName,e) =>{
 
    serv.deleteData(id,imgName).then((response)=>{
      
      alert("User Deleted Successfully")
      loadUserData();
    }).catch((error)=>{
      alert("Error in Deleting data")
    });
    
  }
    return(

        <Fragment>
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2">
                        <Link to="/create-user"><button className="btn btn-warning">Create User</button></Link>
                    </div>
                    <table className="table table-bordered border-primary mt-5 shadow table-hover">
  <thead className="bg-info">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Profile Picture</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {
                       
                       getuserdata.map((u,idx)=>(
                         <tr key={idx}>
                                  <td>{idx+1}</td>
                                 <td >{u.name}</td>
                                 <td >{u.email}</td>
                                 <td >{u.mobno}</td>
                                 <td>{u.image}</td>
                                <td className="d-flex justify-content-between">
                               <Link to={`my-profile/${u.id}`}><button className="btn btn-primary"><i className="fas fa-eye"></i></button></Link>   
                               <Link to={`edit-user/${u.id}`}>  <button className="btn btn-success"><i className="fas fa-edit"></i></button></Link>
                               <button className="btn btn-danger" onClick={()=>deleteUser(u.id,u.image)}><i className="fas fa-remove"></i></button>
                                </td>
                               
                                   
                             </tr>
                         ))
                    }
  </tbody>
</table>
                </div>
                
            </div>
        </Fragment>
    )
}
export default HomeComponent;