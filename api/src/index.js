const { DynamoDBClient, GetItemCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const express = require('express');
const app = express();
const appEnv = process.env.NODE_ENV || 'development';

// userId should be changed based on authenticated user, right now it's just dummy
const userId = process.env.APP_USER_ID || 'todos-rioastamal';
const tableName = process.env.APP_TABLE_NAME || `express-todo-${appEnv}`;
const ddbclient = new DynamoDBClient({ region: process.env.APP_REGION || 'ap-southeast-1' });
let data = [];

app.set('json spaces', 2);
app.get('/', async (req, res) => {
  const itemParam = {
    TableName: tableName,
    Key: marshall({
      pk: userId,
      sk: 'todos'
    })
  };
  
  const itemResponse = await ddbclient.send(new GetItemCommand(itemParam));
  console.log('itemResponse ->', itemResponse);
  if (itemResponse.Item !== undefined) {
    let item = unmarshall(itemResponse.Item);
    data = item.data;
  }
  
  res.json(data);
});

app.get('/info', (req, res) => {
  res.json({
    name: 'Serverless Todo',
    version: '1.0',
    state: 'demo'
  });
});

app.put('/', express.json(), (req, res) => {
  const todoItem = {
    pk: userId,
    sk: 'todos',
    data: req.body
  };
  
  const itemParam = {
    TableName: tableName,
    Item: marshall(todoItem)
  };
  
  const cmdPutResponse = ddbclient.send(new PutItemCommand(itemParam));
  console.log('cmdPutResponse =>', cmdPutResponse);
  
  console.log(req.body);
  res.json({
    "message": "Todo successfully added."
  });
});

module.exports = app;
