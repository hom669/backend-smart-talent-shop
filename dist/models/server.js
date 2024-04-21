"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const order_1 = __importDefault(require("../routes/order"));
const product_2 = require("./product");
const user_2 = require("./user");
const userDetail_1 = __importDefault(require("./userDetail"));
const profile_1 = __importDefault(require("./profile"));
const order_2 = require("./order");
const orderDetail_1 = require("./orderDetail");
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        if (process.env.HOST_DB) {
            console.log(process.env.HOST_DB);
            this.dbConnect();
        }
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicacion Corriendo en el puerto: " + this.port);
        });
    }
    routes() {
        this.app.use('/api/products', product_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/orders', order_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield profile_1.default.sync();
                yield user_2.User.sync();
                yield userDetail_1.default.sync();
                yield product_2.Product.sync();
                yield order_2.Order.sync();
                yield orderDetail_1.OrderDetail.sync();
                this.initializeProfiles();
                console.log('Connection has been established successfully!!.');
            }
            catch (error) {
                console.log('Unable to connect to the database.', error);
            }
        });
    }
    initializeProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            // Comprueba si hay algún registro en la tabla de profiles
            const count = yield profile_1.default.count();
            if (count === 0) {
                // La tabla está vacía, inserta los perfiles iniciales
                yield profile_1.default.findOrCreate({
                    where: { name: 'Administrador' },
                    defaults: { name: 'Administrador' }
                });
                yield profile_1.default.findOrCreate({
                    where: { name: 'Cliente' },
                    defaults: { name: 'Cliente' }
                });
                console.log('Perfiles iniciales creados.');
            }
            else {
                // La tabla no está vacía, no hacer nada
                console.log('La tabla de perfiles ya tiene registros, no se añaden perfiles iniciales.');
            }
        });
    }
}
exports.default = Server;
