import { SNSHandler,SNSEvent } from "aws-lambda";
import {poolMySqlCL}  from '../services/mysqlService';
import { sendEvent } from "./eventBridge";

//Este handler se encarga de procesar los eventos de SNS que llegan al topic de SNS de appointmentPE
export const handler : SNSHandler = async (event: SNSEvent)=>{
    
    //me conecto a la base de datos
    const connection  = await poolMySqlCL();

    for(const recort of event.Records){
        const {scheduleId,centerId,specialtyId,medicId,date} = JSON.parse(recort.Sns.Message);
        const query = 'INSERT INTO appointment (scheduleId,centerId,specialtyId,medicId,date) VALUES (?,?,?,?,?)';
        
        try{
            await connection.query(query,[scheduleId,centerId,specialtyId,medicId,date]);
            sendEvent('completed');
            console.log('Processed appointment with id: '+scheduleId);

        }catch(e){
            console.log('Error inserting appointment ${e}');
        }
    }
    
    
}