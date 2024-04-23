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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.deleteProduct = exports.editProduct = exports.getProducts = void 0;
const product_1 = require("../models/product");
const randomCode_1 = require("../utils/randomCode");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.Product.findAll();
    res.json(listProducts);
});
exports.getProducts = getProducts;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    console.log(idProduct);
    const { description, name, price, stock } = req.body;
    try {
        const updateProduct = yield product_1.Product.update({
            stock: stock,
            price: price,
            name: name,
            description: description
        }, { where: { id: idProduct } });
        res.json({
            msg: `Producto Actualizado Correctamente.`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Orden No Actualizada Correctamente",
            error: error
        });
    }
});
exports.editProduct = editProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    try {
        const destroyProduct = yield product_1.Product.destroy({ where: { id: idProduct } });
        res.json({
            msg: `Producto Eliminado Correctamente.`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Orden No Eliminada Correctamente",
            error: error
        });
    }
});
exports.deleteProduct = deleteProduct;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    const { description, name, price, stock, userCreatedId } = req.body;
    try {
        const createProduct = yield product_1.Product.create({
            stock: stock,
            price: price,
            name: name,
            description: description,
            userCreated: userCreatedId,
            image: randomCode_1.imageRandon,
            codeProduct: (0, randomCode_1.generateRandomCode)()
        });
        res.json({
            msg: `Producto Creado Correctamente.`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Producto No Creado Correctamente",
            error: error
        });
    }
});
exports.addProduct = addProduct;
