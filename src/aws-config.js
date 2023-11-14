import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2", // Replace with your AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
});

export default AWS;
