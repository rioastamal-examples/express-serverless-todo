const { DynamoDBClient, GetItemCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const express = require('express');
const app = express();
const appEnv = process.env.NODE_ENV || 'development';

const tableName = process.env.APP_TABLE_NAME || `express-todo-${appEnv}`;
const ddbclient = new DynamoDBClient({ region: process.env.APP_REGION || 'ap-southeast-1' });

app.set('json spaces', 2);
app.get('/:id', async (req, res) => {
  if (! req.params.id) {
    res.json([]);
    return;
  }
  
  let data = [];
  const itemParam = {
    TableName: tableName,
    Key: marshall({
      pk: req.params.id,
      sk: 'todos'
    })
  };
  console.log('itemParam ->', itemParam);
  
  const itemResponse = await ddbclient.send(new GetItemCommand(itemParam));
  console.log('itemResponse ->', itemResponse);
  if (itemResponse.Item !== undefined) {
    let item = unmarshall(itemResponse.Item);
    data = item.data;
  }
  
  res.json(data);
});

app.put('/:id', express.json(), (req, res) => {
  if (! req.params.id) {
    res.status(400).json({
      message: "Bad request: Missing todo id."
    });
    
    return;
  }
  
  const todoItem = {
    pk: req.params.id,
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
