import * as mysql from 'mysql';
import * as config from '../config';

let dbconnection = mysql.createConnection({
    host: config.HOST,
    user: config.user,
    password: config.password,
    database: config.database

});

export default dbconnection;