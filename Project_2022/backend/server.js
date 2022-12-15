import express from 'express';
import cors from 'cors';
import mysql from 'mysql'

const PORT =  process.env.PORT || 7011;

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
// configure mysql
const conn = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'awsdb'
})

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};