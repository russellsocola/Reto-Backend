import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tablename = 'appointments';

export const putItem  = async ( item: any) => {

    try{
        await dynamoDB.put({TableName: tablename, Item: item}).promise();
        console.log('Se agrego un item a la tabla ${tablename}');
    }catch(e){
        console.error('Error adding item to DynamoDB '+ e);
        throw e;
    }
}


export const getItem = async (key: any)=>{
    try{
        const result  = await dynamoDB.get({TableName: tablename, Key: key}).promise();
        console.log(result);
        if(!result.Item){
            console.log('No se encontro el item en la tabla ${tablename}');
            throw new Error('Item not found');
        }
        return result.Item;    
    }catch(e){
        console.log('Error getting item from DynamoDB '+ e);
        throw e;
    }
}

export const  updateItem = async (key:any , updateExpression: string, expressionAttributeValues: any):Promise<void> =>{
    try{
        await dynamoDB.update({
            TableName: tablename,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues
        }).promise();
        console.log('Item actualizado en la tabla ${tablename}');
    }catch(e){
        console.error('Error updating item in DynamoDB '+ e);
        throw e;
    }
}