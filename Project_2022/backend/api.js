import express from 'express';
import cors from 'cors';

const PORT =  process.env.PORT || 7011;
import multer from "multer";
import AWS from 'aws-sdk';
// create an instance
const instance = express();
// Add JSON Middleware in HTTP Pipeline
instance.use(express.json());
// do not parse incoming data other than HTTP Request Message Body
instance.use(express.urlencoded({extended:false}));
// configure CORS
instance.use(cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*"
})); 

const storage = multer.memoryStorage({
    destination:function(req,file,cb){
        cb(null,'')
    }
  });
  let upload = multer({storage:storage}).single('image');
// import dataaccess

import DataAccess from './dataaccess/dataaccess.js'

let ds = new DataAccess();
// lets create REST API
instance.post('/api/createuser',upload, ds.createNewUser);
instance.get('/api/users',ds.getUserData);
instance.get('/api/users/:id',ds.getUserById);
instance.put('/api/users/:id',upload,ds.putUserData);
instance.delete('/api/users/:id/:imgName',ds.deleteUserData);
instance.post('/api/register',ds.register);
instance.post('/api/login',ds.authentication);


// start listening
instance.listen(PORT, ()=>{
    console.log(`Started on port ${PORT}`);
});