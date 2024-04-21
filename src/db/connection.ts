import { Sequelize } from "sequelize";

const sequelize = new Sequelize('db-shop', 'hom669', 'Hom1223334..', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;