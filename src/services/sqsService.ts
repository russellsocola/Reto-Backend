import  AWS  from 'aws-sdk';

const sqs = new AWS.SQS();

export const sendMessage = async(queueUrl: string, message: string) => {
    await sqs.sendMessage({QueueUrl: queueUrl, MessageBody: message}).promise();
};