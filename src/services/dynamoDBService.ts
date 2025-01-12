import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const putItem  = async (tablename: string, item: any) => {

    await dynamoDB.put({TableName: tablename, Item: item}).promise();
}

export const getItem = async (tablename: string , key: any)=>{
    const result  = await dynamoDB.get({TableName: tablename, Key: key}).promise();
    return result.Item;
}
