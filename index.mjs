
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
const REGION = "us-east-1"; 
const client = new DynamoDBClient({region: REGION});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "my-streaming-data";

export const handler = async (event) => {  
  
  const toBeSavedItems = event['Records'].map(async (el) => {   // returning array of promises    
    let key = el['kinesis']['partitionKey'];
    let data = Buffer.from(el['kinesis']['data'], 'base64').toString('utf-8');
    const params = {
      TableName: tableName,
      Item: {
        id: key,
        data: data,
      }
    };
    return saveItem(params);
  });

  await Promise.all(toBeSavedItems);  // resolving the promises

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };

  return response;
};

async function saveItem(params) {
   try{
      await dynamo.send(
        new PutCommand(params)
      );
   } catch(err) {
     console.log(err);
   }
}
