import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { EventParameters, ScheduleParameters } from '../interfaces/interface';
import { putItem } from "../services/dynamoDBService";
import { publishMessage } from "../services/snsService";

//Utilizo variables de entorno para obtener el ARN del topic de SNS
const SNS_TOPIC_ARN: string  = process.env.SNS_TOPIC_ARN ?? '';


/*  ejemplo de lo que recibire como evento desde el Body
{
"insuredId": "00015",
"scheduleId": "100 4 3 4 2024-30-09T12:30:00Z",
"countryISO": "CL"
} */
export const appointmentHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
    {
        try{
            if(!event.body){
                return{
                    statusCode: 400,
                    body: JSON.stringify({message: "Invalid request body"})
                }
            }

            //Parseo el body del evento
            const eventBody: EventParameters = JSON.parse(event.body);
            
            //Valido que el body del evento tenga los campos requeridos
            const scheduleParametersParts = eventBody.scheduleId.split(' ');
            const scheduleParams : ScheduleParameters = {
                scheduleId: Number.parseInt(scheduleParametersParts[0]),
                centerId: Number.parseInt(scheduleParametersParts[1]),
                specialtyId: Number.parseInt(scheduleParametersParts[2]),
                medicId: Number.parseInt(scheduleParametersParts[3]),
                date: scheduleParametersParts[4]
            }
            
            
            const appointmentId = uuidv4();

            //Creo el registro del evento
            const appEventRecod = {
                id: appointmentId,
                event: eventBody,
                Status: "PENDING",
                created_at: new Date().toISOString(),
                countryISO: eventBody.countryISO
            }

            //Guardo el registro en la tabla de DynamoDB
            await putItem (appEventRecod);
            
            if(!SNS_TOPIC_ARN){
                return{
                    statusCode: 400,
                    body: JSON.stringify({message: "Invalid request SNS_TOPIC_ARN"})
                }
            }
            
            await publishMessage(scheduleParams,SNS_TOPIC_ARN,eventBody.countryISO);
            
            console.log('Appointment created with id: '+appointmentId);

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

    


