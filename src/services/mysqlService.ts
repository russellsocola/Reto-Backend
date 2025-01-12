import mysql from 'mysql2/promise';
//import { DatabaseCredentials } from '../interfaces/interface';

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

export const poolMySqlPE = async()=>{
    const Connection = await mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPassword,
    });
    return Connection;
};