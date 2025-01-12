import AWS from 'aws-sdk';
import { ScheduleParameters } from '../interfaces/interface';

interface MessageAttribute {
  DataType: string;
  StringValue: string;
};

const sns = new AWS.SNS();

//voy a recibir un mensaje y lo voy a publicar en el topic de SNS haciendo un filtro si es para PE o CL
export const publishMessage = async (message: ScheduleParameters, topicArn: string, countryISO: string): Promise<void> => {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: topicArn,
    MessageAttributes: {
      countryISO: {
        DataType: 'String',
        StringValue: countryISO
      }
    }
  };

  await sns.publish(params).promise();
}