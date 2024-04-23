import { Product } from './../models/product';
import { Request, Response } from 'express';
import { Order } from '../models/order';
import { OrderDetail } from '../models/orderDetail';
import { Model } from 'sequelize';
import { generateRandomCode } from '../utils/randomCode';
import User from '../models/user';
import UserDetail from '../models/userDetail';


interface IOrder extends Model {
    id: number,
    idUser: number,
    totalOrder: number
    codeOrder: string
}

interface IOrderDetails extends Model {
    idOrder: number,
    idProduct: number,
    quantity: number,
    valueUnit: number,
    valueTotal: number
}

interface ICountStock extends Model {
    stock: number,
}

export const getOrders = async (req: Request, res: Response) => {
    const userId = req.params.idUser;
    const listOrders = await Order.findAll({
        include: [
            {
                model: OrderDetail,
                as: 'orderDetails',
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price', 'image', 'description']
                    }
                ],
                attributes: ['quantity', 'valueTotal']
            }
        ],
        attributes: ['id', 'createdAt', 'totalOrder', 'codeOrder'],
        where: [{ idUser: userId }]
    });
    res.json(listOrders)
}

export const getOrdersAll = async (req: Request, res: Response) => {
    const listOrders = await Order.findAll({
        include: [
            {
                model: OrderDetail,
                as: 'orderDetails',
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price', 'image', 'description']
                    }
                ],
                attributes: ['quantity', 'valueTotal'],

            },
            {
                model: User,
                as: 'user',
                include: [
                    {
                        model: UserDetail,
                        as: 'details',
                        attributes: ['fullName', 'identification', 'email']
                    }
                ],
                attributes: ['id', 'username']
            }
        ],
        attributes: ['id', 'createdAt', 'totalOrder', 'codeOrder']
    });
    res.json(listOrders)
}

export const createOrder = async (req: Request, res: Response) => {
    const { idUser, total, items } = req.body
    try {
        const orderCreate = await Order.create({
            idUser,
            totalOrder: total,
            codeOrder: generateRandomCode()
        }) as IOrder | null;

        if (orderCreate) {
            for (let index = 0; index < items.length; index++) {
                const product = await Product.findOne({
                    where: { id: items[index].productId },
                    attributes: ['stock'],
                }) as ICountStock | null;

                if (!product) {
                    await Order.destroy({ where: [{ id: orderCreate.id }] });
                    await OrderDetail.destroy({ where: [{ idOrder: orderCreate.id }] });
                    res.status(404).json({
                        msg: `El producto con ID ${items[index].productId} ${items[index].productName} no fue encontrado.`,
                    });
                    return;
                }

                if (product.stock < items[index].quantity) {
                    await Order.destroy({ where: [{ id: orderCreate.id }] });
                    await OrderDetail.destroy({ where: [{ idOrder: orderCreate.id }] });
                    res.status(400).json({
                        msg: `El producto con ID ${items[index].productId} ${items[index].productName} no tiene suficiente stock.`,
                    });
                    return;
                }


                if (product && product.stock >= items[index].quantity) {
                    const restStock = product.stock - items[index].quantity;
                    await Product.update(
                        { stock: restStock },
                        { where: { id: items[index].productId } }
                    );

                    try {
                        const orderDetails = await OrderDetail.create({
                            idOrder: orderCreate.id,
                            idProduct: items[index].productId,
                            quantity: items[index].quantity,
                            valueUnit: items[index].unitPrice,
                            valueTotal: items[index].totalPrice
                        }) as IOrderDetails | null

                    } catch (error) {
                        await OrderDetail.destroy({ where: [{ idOrder: orderCreate.id }] });
                    }
                }


            }
        }

        if (orderCreate) {
            res.json({
                msg: `Orden ${orderCreate.codeOrder} Creada Correctamente.`,
            })
        }

    } catch (error) {
        res.status(400).json({
            msg: "Ups Ocurrio un Error",
            error: error
        })
    }


}