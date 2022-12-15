import { Sequelize } from "sequelize";
import fs from 'fs';
import pkg from "sequelize";
const { DataTypes } = pkg;
import {CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js'

//uploading file
import multer from "multer";
import AWS from 'aws-sdk';
import {fileURLToPath} from 'url';


//2. Database mapping metadata
//2.a Model mapping

import a_user from "../models/a_user.js";

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import pkg2 from 'amazon-cognito-auth-js';
const {CognitoAuth} = pkg2

const poolData = {
 UserPoolId: 'ap-southeast-1_EhRikthCF',
 ClientId: '6m7tafddpd485q1cf6pe1eogta'
}

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//2. b sequelize connection
const sequelize = new Sequelize("projectaws", "kalyaniadmin", "P@ssw0rd_", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});
const s3 = new AWS.S3({
    accessKeyId:'AKIATLEFVE2HA53NV2HH',
    secretAccessKey:'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',
    region:'ap-south-1'
});
//2. c Authentication
sequelize.authenticate().then(
  (authenticate) => {
    console.log(`Connected to DB successfully... ${authenticate}`);
  },
  (error) => {
    console.log(`failed.... ${error}`);
  }
);

class DataAccess {
  constructor() {
    a_user.init(sequelize, DataTypes);
  }

  async createNewUser(req, resp) {
   let imageName = req.file.originalname;
    console.log("FIle Name: "+imageName);
   
    let { name, email, mobno, image } = req.body;
    image = imageName;
    const userBody = req.body;
  const params = {
      Bucket: 'testimage-upload',
      Key:`${imageName}`,
      Body:req.file.buffer
  }
  s3.upload(params, (error,data)=>{
      if(error){
       console.log(`Error Occurred while uploading file to bucket`);
       return;
      }
      
      console.log(`File is uploaded successfully in bucket ${data.Bucket}`);
      
  })
    if(!name || !email || !mobno){
      return resp.status(401).send({
        message: `User with Email ${email} is already created`,
      });
    }
    await sequelize.sync({ force: false });   
    console.log("herereeee");
    let created = await a_user.create({ name, email, mobno, image });
    resp.status(201).send({
      message: `User ${JSON.stringify(userBody)} is created successfully`,
    });
  }

  // get user data 
   async getUserData(req, resp) {

    
    // 1. Synchronize with DB using sequelize object
    // do not overwrite DB
    var preSignedURL = [];
    await sequelize.sync({ force: false });
    // 2. read all records
    let records = await a_user.findAll();
    // get objects from S3
    const params = {
      Bucket:'testimage-upload',
    }

    // Call S3 to obtain a list of the objects in the bucket
    var list = [];
    var url="";
   
   s3.listObjects(params,function(err,data){
      if (err) {
        console.log("Error", err);
      } else {
        for(var value of data.Contents){
          list = value.Key;
          // now we need to generate url
         url =   s3.getSignedUrlPromise('getObject',{
            Bucket: 'testimage-upload',
            Key: `${list}`,
            Expires: 6000,
           })   
           Promise.resolve(url).then((val)=>{
            preSignedURL = val;
            console.log("Val ",preSignedURL);
           }).catch((err)=>{
            console.log("Error in generating url",err);
           })   
        }     
       
        
        
      }
      
    })
    
    
    
    // 3. send response
    if (records) {
      return resp
        .status(200)
        .send({ message: "Data is read successfully", data: records,u:preSignedURL });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while reading data" });
  } 

  // get individual data
  async getUserById(req,resp){
    // 1. Synchronize with DB using sequelize object
    // do not overwrite DB
    await sequelize.sync({ force: false });

     // 2. read record by id
     let id = parseInt(req.params.id);
     let record = await a_user.findOne({ where: { id: id } });
     const url = await s3.getSignedUrlPromise('getObject',{
      Bucket: 'testimage-upload',
      Key: `${record.image}`,
      Expires: 6000,
     })
     console.log("PRE-SIGNED-URL "+url);
     // 3. send response
     if (record) {
       return resp
         .status(200)
         .send({ message: "Data is read successfully", data: record,url });
     }
     return resp
       .status(500)
       .send({ message: "Error Occured while reading data" });
   
  }

  // update user data
  async putUserData(req, resp) {
     // 1. Synchronize with DB using sequelize object
    // do not overwrite DB
    await sequelize.sync({ force: false });
    let userData = req.body;
    // 3. read request parameter
    let id = parseInt(req.params.id);
    let imageName = req.file.originalname;
    console.log("FIle Name: "+imageName);
   
    let { name, email, mobno, image } = req.body;
    image = imageName;
   // const userBody = req.body;
  const params = {
      Bucket: 'testimage-upload',
      Key:`${imageName}`,
      Body:req.file.buffer
  }
  s3.upload(params, (error,data)=>{
      if(error){
       console.log(`Error Occurred while uploading file to bucket`);
       return;
      }
      
      console.log(`File is updated successfully in bucket ${data.Bucket}`);
      
  })
    // 4. update record
    let record = await a_user.update(
      {
        name: name,
        email: email,
        mobno: mobno,
        image: imageName,
      },
      { where: { id: id } }
    );
    if (record) {
      return resp
        .status(200)
        .send({ message: "Data is upadated successfully", data: record });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while updating data" });
  
  }

  //DELETE User DATA
  async deleteUserData(req, resp) {
     // 1. Synchronize with DB using sequelize object
    // do not overwrite DB
    await sequelize.sync({ force: false });
    // 2. read record by id
      let id = parseInt(req.params.id);
      let imageName = req.params.imgName;
      console.log("Image name",+imageName);
      let record = await a_user.destroy({ where: { id: id } });
      const params = {
        Bucket: 'testimage-upload',
        Key:`${imageName}`,
        //Body:req.file.buffer
    }
    s3.deleteObject(params, (error,data)=>{
        if(error){
         console.log(`Error Occurred while uploading file to bucket`);
         return;
        }
        
        console.log(`File is Deleted successfully from bucket ${data.Bucket}`);
        
    })
      // 3. send response
      if (record) {
        return resp
          .status(200)
          .send({ message: "Data is deleted successfully", data: record });
      }
      return resp
        .status(500)
        .send({ message: "Error Occured while deleting data" });
    }

    // // generate pre-signed url
    // main = async()=>{
    //   try {
    //     const url = await s3.getSignedUrlPromise('getObject',{
    //       Bucket: 'testimage-upload',
    //       Key: 'user3.jpg',
    //       Expires: 60,

    //     });
    //   } catch (error) {
    //     console.log(err);
    //   }
    // };

      
    async register(req,resp){
      //  const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
        let { uname, email, phoneno, password } = req.body;
       // const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData)
        var attributeList = [];
        var dataUserName = {
          Name: 'name',
          Value: req.body.name,
        }
        var dataEmail = {
          Name: 'email',
          Value: req.body.email,
        }
        var dataPhone = {
          Name: 'phone_number',
          Value: req.body.phoneno,
        }
        // store in the form of AWS
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributePhone = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhone);
        var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataUserName);
        //push it to list
        attributeList.push(attributeEmail);
        attributeList.push(attributePhone);
        attributeList.push(attributeName);
        // call signUp function to register users...
        userPool.signUp(email,password,attributeList,null,function(err,data){
          if(err){
            console.log(`Some Error occured ${err}`);
            return;
          }
          //userPool = data.email;
          console.log(data);
          return resp
          .status(200)
          .send({ message: "Check mail for verification"});
        });
      }
      async authentication(req,resp){
        var authenticationData = {
          Username:req.body.email,
          Password:req.body.password
        }
        // now convert it into AWS form
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
          Username: req.body.email,
          Pool: userPool
        };
        // now convert it into AWS form
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails,{
          onSuccess: function (result){
            var accessToken  = result.getAccessToken().getJwtToken();
            console.log(`access token is ${accessToken}`);
            return resp
            .status(200)
            .send({ message: `access token is ${accessToken}`});
          },
          onFailure: function(err){
            console.log(`${err.message} || ${JSON.stringify(err)}`);
            return resp
            .status(404)
            .send({ message: `${err.message} || ${JSON.stringify(err)}`});
          },
        });
      }
  
}
export default DataAccess;
