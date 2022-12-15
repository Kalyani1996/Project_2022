import { useState } from "react";
import { Fragment } from "react";
import UserService from "../services/UserServices";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobno: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  // craete object of UserService
  const serv = new UserService();
  const handleInputChange = (evt) => {
    console.log("is it called" + evt.target.value);
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };
  const clear = () => {
    setUser({ name: "", email: "", mobno: "", image: "" });
  };
  const imageUpload = (event) =>{
    console.log(event.target.files[0]);
    setUser({ ...user, image: event.target.files[0] });
  }
  const createNewUser = (e) => {
    const data = new FormData();
    data.append('image',user.image,user.image.name);
    data.append('name',user.name);
    data.append('email',user.email);
    data.append('mobno',user.mobno);

    // const data = {
    //   name: user.name,
    //   email: user.email,
    //   mobno: user.mobno,
    //   image: user.image.replace('C:\\fakepath\\', ''),
      
    // };
    serv
      .createNewUser(data)
      .then((response) => {
       alert(response)
        setMessage(`${response.data.message}`);
        alert("User Added Successfully");
      })
      .catch((error) => {
        setMessage(`Error Occurred`);
      });
  };
  return (
    <Fragment>
      <div className="conatiner">
        <h1>Create User</h1>
        <hr />

        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" onChange={handleInputChange} value={user.name} />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" onChange={handleInputChange} value={user.email} />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" className="form-control" name="mobno" onChange={handleInputChange} value={user.mobno} />
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" className="form-control" name="image" onChange={imageUpload} />
        </div>

       <div className='container text-center mt-3 '>
       <div className='container'>
        <button className="btn btn-info" type="submit" onClick={createNewUser}>Add</button>
        <button className="btn btn-danger" type="reset" onClick={clear}>Clear</button>
        </div>
        </div>
      </div>

     
    </Fragment>
  );
};
export default CreateUser;
