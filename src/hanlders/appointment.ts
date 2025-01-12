import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

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

        return {
            statusCode:200,
            body: JSON.stringify({
                message:"Appointment created successfully",id:appointmentId}),
        };
    };
