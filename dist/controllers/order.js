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
exports.createOrder = exports.getOrdersAll = exports.getOrders = void 0;
const product_1 = require("./../models/product");
const order_1 = require("../models/order");
const orderDetail_1 = require("../models/orderDetail");
const randomCode_1 = require("../utils/randomCode");
const user_1 = __importDefault(require("../models/user"));
const userDetail_1 = __importDefault(require("../models/userDetail"));
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.idUser;
    const listOrders = yield order_1.Order.findAll({
        include: [
            {
                model: orderDetail_1.OrderDetail,
                as: 'orderDetails',
                include: [
                    {
                        model: product_1.Product,
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
    res.json(listOrders);
});
exports.getOrders = getOrders;
const getOrdersAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listOrders = yield order_1.Order.findAll({
        include: [
            {
                model: orderDetail_1.OrderDetail,
                as: 'orderDetails',
                include: [
                    {
                        model: product_1.Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price', 'image', 'description']
                    }
                ],
                attributes: ['quantity', 'valueTotal'],
            },
            {
                model: user_1.default,
                as: 'user',
                include: [
                    {
                        model: userDetail_1.default,
                        as: 'details',
                        attributes: ['fullName', 'identification', 'email']
                    }
                ],
                attributes: ['id', 'username']
            }
        ],
        attributes: ['id', 'createdAt', 'totalOrder', 'codeOrder']
    });
    res.json(listOrders);
});
exports.getOrdersAll = getOrdersAll;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, total, items } = req.body;
    try {
        const orderCreate = yield order_1.Order.create({
            idUser,
            totalOrder: total,
            codeOrder: (0, randomCode_1.generateRandomCode)()
        });
        if (orderCreate) {
            for (let index = 0; index < items.length; index++) {
                const product = yield product_1.Product.findOne({
                    where: { id: items[index].productId },
                    attributes: ['stock'],
                });
                if (!product) {
                    yield order_1.Order.destroy({ where: [{ id: orderCreate.id }] });
                    yield orderDetail_1.OrderDetail.destroy({ where: [{ idOrder: orderCreate.id }] });
                    res.status(404).json({
                        msg: `El producto con ID ${items[index].productId} ${items[index].productName} no fue encontrado.`,
                    });
                    return;
                }
                if (product.stock < items[index].quantity) {
                    yield order_1.Order.destroy({ where: [{ id: orderCreate.id }] });
                    yield orderDetail_1.OrderDetail.destroy({ where: [{ idOrder: orderCreate.id }] });
                    res.status(400).json({
                        msg: `El producto con ID ${items[index].productId} ${items[index].productName} no tiene suficiente stock.`,
                    });
                    return;
                }
                if (product && product.stock >= items[index].quantity) {
                    const restStock = product.stock - items[index].quantity;
                    yield product_1.Product.update({ stock: restStock }, { where: { id: items[index].productId } });
                    try {
                        const orderDetails = yield orderDetail_1.OrderDetail.create({
                            idOrder: orderCreate.id,
                            idProduct: items[index].productId,
                            quantity: items[index].quantity,
                            valueUnit: items[index].unitPrice,
                            valueTotal: items[index].totalPrice
                        });
                    }
                    catch (error) {
                        yield orderDetail_1.OrderDetail.destroy({ where: [{ idOrder: orderCreate.id }] });
                    }
                }
            }
        }
        if (orderCreate) {
            res.json({
                msg: `Orden ${orderCreate.codeOrder} Creada Correctamente.`,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups Ocurrio un Error",
            error: error
        });
    }
});
exports.createOrder = createOrder;
