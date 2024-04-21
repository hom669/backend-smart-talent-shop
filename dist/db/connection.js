"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('inghomac_heidy_berlham', 'inghomac_admin', 'Hom1223334..**', {
    host: 'localhost',
    dialect: 'mysql'
});
exports.default = sequelize;
