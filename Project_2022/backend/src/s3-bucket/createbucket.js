// import AWS SDK
import AWS from 'aws-sdk';

const bucket_name = 'blaze-image-upload-assignment';

const s3 = new AWS.S3({
     accessKeyId:'AKIAQWRKM6SBOB64AUEV',
    secretAccessKey:'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'
 });

// //create bucket
s3.createBucket({
    Bucket:bucket_name
    
 },
(error,data)=>{
     if(error){
         console.log(`Error occured while creating bucket ${error}`);
         return;
     }
    console.log(`Bucket is created successfullu at ${data.Location}`);
 }
 );
