import { useState,useEffect } from "react";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserServices";
const EditUser = () =>{
    const [user,setUser] = useState({id:"",name:"",email:"",mobno:"",image:""})
    console.log(setUser);
    const [message, setMessage] = useState("");
    // const [getuserdata,setUserData] = useState([]);
const serv = new UserService();
const {id} = useParams(""); // to get id 
    

const [url,setURL] = useState("");





async function loadUserDataById(){
            
    fetch(`http://localhost:7011/api/users/${id}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
        
    })            
    .then(resp => resp.json())
    .then(resp => {setUser(resp.data);setURL(resp.url)})
  }
  useEffect(()=>{
       loadUserDataById();
  },[]);

    const handleInputChange = (evt) =>{
        console.log("is it called"+evt.target.value);
        setUser({...user,[evt.target.name]:evt.target.value});
    }
    const clear = () =>{
        setUser({name:"",email:"",mobno:"",image:""});
    }
    const imageUpload = (event) =>{
        console.log(event.target.files[0]);
        setUser({ ...user, image: event.target.files[0] });
      }
    const updateUser = (e) => {
        console.log("heree",id);
        const data = new FormData();
    //data.append('id',id)             
    data.append('name',user.name);
    data.append('email',user.email);
    data.append('mobno',user.mobno);
    data.append('image',user.image,user.image.name);
        // const data = {
        //     id:id,
        //   name: user.name,
        //   email: user.email,
        //   mobno: user.mobno,
        //   image: user.image,
        // };
      
        serv
          .putUserData(data,id)
          .then((response) => {
            setMessage(`${response.data.message}`);
            alert("User Updated Successfully");
          })
          .catch((error) => {
            setMessage(`Error Occurred`);
          });
      };
return(
    <Fragment>
        <div className="conatiner">
            <h1>Edit User</h1>
            <hr/>
        
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" name="name" onChange={handleInputChange} value={user.name}/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="email" onChange={handleInputChange} value={user.email}/>
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" className="form-control" name="mobno" onChange={handleInputChange} value={user.mobno}/>
                </div>
                <div className="form-group">
                    <label>Upload Image:</label>
                    <input type="file" className="form-control" name="image" onChange={imageUpload} />
                    <img src={url} alt="Not found" height={150} width={150}/>
                </div>
                <div className='container text-center mt-3 '>
                <div className='container'>
                <button class="btn btn-info" type="submit" onClick={updateUser}>Update</button>
                <button class="btn btn-danger" type="reset" onClick={clear}>Clear</button>
                </div>
                </div>
           
        </div>
    </Fragment>
)
}
export default EditUser;