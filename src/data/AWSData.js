const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "iqds-team72-database", // Replace with your DynamoDB table name
};

dynamoDB.scan(params, (err, data) => {
  if (err) {
    console.error("Error scanning DynamoDB table:", err);
  } else {
    const dynamoData = data.Items.map((item) => ({
      id: item.key,
    }));

    console.log(dynamoData);
    console.log("HEYPPPP");
  }
});
