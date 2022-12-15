
import { useEffect,React } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useParams,Link } from "react-router-dom";
import UserService from "../services/UserServices";
import { useNavigate } from 'react-router-dom';

const ViewProfile = () => {
  const [user,setUser] = useState({name:"",email:"",mobno:"",image:""})
  const [url,setURL] = useState("");
  console.log(setUser);
  const [message, setMessage] = useState("");
  const [getuserdata,setUserData] = useState([]);
const serv = new UserService();

let navigate = useNavigate();

     

const {id} = useParams("");
  useEffect(()=>{
    async function loadUserDataById(){
            
      fetch(`http://localhost:7011/api/users/${id}`,{
          method:'GET',
          headers:{
              'Content-Type': 'application/json',
          }
          
      })            
      .then(resp => resp.json())
      .then(resp => {setUserData(resp.data);setURL(resp.url)})
      console.log("image---------------",url);
    }
    loadUserDataById();
  },[]);

  const updateUser = (e) => {
    console.log("heree");
    const data = {
        id:id,
      name: user.name,
      email: user.email,
      mobno: user.mobno,
      image: user.image,
    };
    console.log("data--"+data);
    serv
      .putUserData(data)
      .then((response) => {
        setMessage(`${response.data.message}`);
        alert("User Updated Successfully");
      })
      .catch((error) => {
        setMessage(`Error Occurred`);
      });
  };

  const deleteUser = (id,e) =>{
 
    serv.deleteData(id).then((response)=>{
      
      alert("User Deleted Successfully")
      navigate('/');
    }).catch((error)=>{
      alert("Error in Deleting data")
    });
    
  }
  return (
    <Fragment>
      <div className="container">
        <h1 style={{ fontWeight: 400 }}>Welcome User</h1>
        <div className="card" >
          {/* <img src="/profile.jpg" class="card-img-top" alt="Not found" /> */}
          <div className="card-body">
            <h5 className="card-title">My Profile</h5>
            <table className="table table-bordered border-primary mt-5 shadow table-hover">
            <thead className="bg-info">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                   <th>Phone Number</th>
                    <th>Image</th>
                    <th>Action</th>
                    </tr>
                </thead>
                    <tbody>
                    
                    <td>{getuserdata.name}</td>
                    <td>{getuserdata.email}</td>
                    <td>{getuserdata.mobno}</td>
                    {/* <td>{getuserdata.image}</td> */}
               <td><img src={url} height={100} width={100}/></td>
                
               <tr className="d-flex gap-3">
                <Link to={`/edit-user/${getuserdata.id}`}><button className="btn btn-success"><i className="fas fa-edit"></i>Edit</button></Link>
                <button className="btn btn-danger" onClick={()=>deleteUser(getuserdata.id)}><i className="fas fa-remove"></i></button>
                
                </tr>
                    </tbody>
                    
                    
            </table>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ViewProfile;
