"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, product_1.getProducts);
router.put('/:idProduct', validate_token_1.default, product_1.editProduct);
router.delete('/:idProduct', validate_token_1.default, product_1.deleteProduct);
router.post('/', validate_token_1.default, product_1.addProduct);
exports.default = router;
