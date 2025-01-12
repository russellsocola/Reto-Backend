import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { putItem } from "../services/dynamoDBService";
import { publishMessage } from "../services/snsService";
import { v4 as uuidv4 } from "uuid";
import { SNS_TOPIC_ARN } from "../utils/constants";

export const appointmentHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
    {
        const body = JSON.parse(event.body||"{}");
        
        const appointmentId = uuidv4();

        const item = {
            id: appointmentId,
            name: body.name,
            status: "pending",
            createdAt: new Date().toISOString(),
            countryISO: body.countryISO,
        };

        await putItem("AppointmentsTable",item);

        await publishMessage(SNS_TOPIC_ARN,JSON.stringify(item),{
            countryISO: body.countryISO,
        });

        return {
            statusCode:200,
            body: JSON.stringify({
                message:"Appointment created successfully",id:appointmentId}),
        };
    };
