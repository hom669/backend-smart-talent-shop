"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const order_1 = require("../controllers/order");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, order_1.getOrdersAll);
router.get('/:idUser', validate_token_1.default, order_1.getOrders);
router.post('/', validate_token_1.default, order_1.createOrder);
exports.default = router;
