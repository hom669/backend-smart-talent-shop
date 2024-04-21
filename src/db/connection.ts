import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.NAME_DB || '', process.env.USER_DB || '', process.env.PASS_DB || '', {
    host: process.env.HOST_DB || '',
    dialect: 'mysql'
});

export default sequelize;