import { DBConstants, DBTables } from '../constants/app-constants'
import {generateUUID} from '../helper/helper.functions'

export class DBQueries {
    public static CTBL_schemas = `
    CREATE TABLE IF NOT EXISTS "${DBTables.SchemaTBL}" (
        "uuid" VARCHAR(40) PRIMARY KEY NOT NULL,
        "name" VARCHAR(30) NOT NULL UNIQUE,
        "schema" TEXT UNIQUE
    );`;
    public static CTBL_users = `
    CREATE TABLE IF NOT EXISTS "${DBTables.UserTBL}" (
        "uuid"	VARCHAR(40) PRIMARY KEY NOT NULL,
        "username"	TEXT NOT NULL UNIQUE,
        "payload"	TEXT
    );
    `;

    // public static insert2Schema =  `
    //     INSERT INTO schemas (uuid, name, schema) VALUES (?,?,?)
    // `;

    public static getQRY_INS_Schema(schemaName: string, schema:string )  {
    return `
        INSERT INTO ${DBTables.SchemaTBL} (uuid, name, schema) 
        SELECT '${generateUUID()}','${schemaName}','${schema}' 
        WHERE NOT EXISTS(SELECT 1 FROM ${DBTables.SchemaTBL} WHERE name='${schemaName}')
    `;
    }

    public static getSchema(schemaName: string) {
        return `SELECT * from ${DBTables.SchemaTBL} where name='${schemaName}'`
    }

    public static getQRY_INS_User(payload:any )  {
        return `
            INSERT INTO ${DBTables.UserTBL} (uuid, username, payload) 
            SELECT '${generateUUID()}','${payload.signature.username}','${JSON.stringify(payload)}' 
            WHERE NOT EXISTS(SELECT 1 FROM ${DBTables.UserTBL} WHERE username='${payload.signature.username}')
        `;
    }

    public static getUser(username: string) {
        return `SELECT uuid,payload FROM ${DBTables.UserTBL} WHERE username = '${username}'`;
    }
}