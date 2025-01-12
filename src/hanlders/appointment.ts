import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { EventParameters } from "../interfaces/interface";
import { putItem } from "../services/dynamoDBService";
import { publishMessage } from "../services/snsService";

const SNS_TOPIC_ARN: string  = process.env.SNS_TOPIC_ARN ?? '';

export const appointmentHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
    {
        try{
            if(!event.body){
                return{
                    statusCode: 400,
                    body: JSON.stringify({message: "Invalid request body"})
                }
            }

            const eventBody: EventParameters = JSON.parse(event.body);
            const appointmentId = uuidv4();
            const appEventRecod = {
                id: appointmentId,
                event: eventBody,
                Status: "PENDING",
                created_at: new Date().toISOString()
            }

            await putItem (appEventRecod);
            
            if(!SNS_TOPIC_ARN){
                return{
                    statusCode: 400,
                    body: JSON.stringify({message: "Invalid request SNS_TOPIC_ARN"})
                }
            }
            
            await publishMessage(SNS_TOPIC_ARN,JSON.stringify(appEventRecod),{});

            return{
                statusCode: 201,
                body: JSON.stringify({message: "Appointment created successfully",id: appointmentId})
            }

        }catch(e){
            return{
                statusCode: 400,
                body: JSON.stringify({message: "Invalid request body"})
            }
        }
    };

    //const event = async ()


