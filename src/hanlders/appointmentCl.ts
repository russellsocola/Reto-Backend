import { SNSHandler,SNSEvent } from "aws-lambda";
import mysql from 'mysql2/promise';
import {poolMySqlCL}  from '../services/mysqlService';
import { sendEvent } from "./eventBridge";


export const handler : SNSHandler = async (event: SNSEvent)=>{
    
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