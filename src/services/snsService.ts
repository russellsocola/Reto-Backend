import { SNS } from 'aws-sdk';

const sns = new SNS();

export const publishMessage = async ( topicArn: string, message: string, attributes: { [key: string]: string}) =>{

    await sns.publish({TargetArn: topicArn, Message: message, MessageAttributes: Object.entries(attributes).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: { DataType: "String", StringValue: value },
        }),
        {}
      ),
    })
    .promise()
}