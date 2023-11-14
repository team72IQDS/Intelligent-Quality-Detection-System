// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import AWS from "../../aws-config";

const client = new DynamoDBClient({});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  // Your DynamoDB table name
  const tableName = "iqds-team72-database";

  // DynamoDB query parameters
  const params = {
    TableName: tableName,
    // Add your query parameters here
  };

  // Query DynamoDB
  const data = await dynamoDB.scan(params).promise();

  // Respond with the data
  res.status(200).json(data.Items ?? []);
}
