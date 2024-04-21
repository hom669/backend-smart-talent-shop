import express, { Application } from 'express';
import routesProducts from '../routes/product'
import routesUsers from '../routes/user'
import routesOrders from '../routes/order'
import { Product } from './product';
import { User } from './user';
import UserDetail from './userDetail';
import Profile from './profile';
import { Order } from './order';
import { OrderDetail } from './orderDetail';
import cors from "cors";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        if (process.env.HOST_DB) {
            console.log(process.env.HOST_DB)
            this.dbConnect();
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicacion Corriendo en el puerto: " + this.port)
        })
    }

    routes() {
        this.app.use('/api/products', routesProducts);
        this.app.use('/api/users', routesUsers)
        this.app.use('/api/orders', routesOrders)
    }

    midlewares() {
        this.app.use(express.json());

        this.app.use(cors())
    }

    async dbConnect() {
        try {
            await Profile.sync()
            await User.sync()
            await UserDetail.sync()
            await Product.sync()
            await Order.sync()
            await OrderDetail.sync()
            this.initializeProfiles()
            console.log('Connection has been established successfully!!.')

        } catch (error) {
            console.log('Unable to connect to the database.', error)
        }
    }


    async initializeProfiles() {
        // Comprueba si hay algún registro en la tabla de profiles
        const count = await Profile.count();
        if (count === 0) {
            // La tabla está vacía, inserta los perfiles iniciales
            await Profile.findOrCreate({
                where: { name: 'Administrador' },
                defaults: { name: 'Administrador' }
            });
            await Profile.findOrCreate({
                where: { name: 'Cliente' },
                defaults: { name: 'Cliente' }
            });
            console.log('Perfiles iniciales creados.');
        } else {
            // La tabla no está vacía, no hacer nada
            console.log('La tabla de perfiles ya tiene registros, no se añaden perfiles iniciales.');
        }
    }
}

export default Server;