import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { EventParameters} from "../interfaces/interface"
 
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


        }catch(e){
            return{
                statusCode: 400,
                body: JSON.stringify({message: "Invalid request body"})
            }
        }
        
        const appointmentId = uuidv4();

        return {
            statusCode:200,
            body: JSON.stringify({
                message:"Appointment created successfully",id:appointmentId}),
        };
    };


