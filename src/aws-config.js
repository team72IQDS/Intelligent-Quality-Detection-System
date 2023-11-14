import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2", // Replace with your AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export default AWS;
