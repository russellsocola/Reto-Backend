import mysql from 'mysql2/promise';
import { DatabaseCredentials } from '../interfaces/interface';

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const Credentials : DatabaseCredentials={
    host: dbHost ?? '',
    user: dbUser ?? '',
    password: dbPassword ?? ''
}

export const poolMySqlPE = async (): Promise<mysql.Pool> =>{
    try{
        const Connection = mysql.createPool(Credentials);
        console.log('Connected to MySQL');
        return Connection;
    }catch(e){
        console.log('Error coneccting to MySQL '+ e);
        throw e;
    }
}

export const poolMySqlCL = async (): Promise<mysql.Pool> =>{
    try{
        const Connection = mysql.createPool(Credentials);
        console.log('Connected to MySQL');
        return Connection;
    }catch(e){
        console.log('Error coneccting to MySQL '+ e);
        throw e;
    }
}