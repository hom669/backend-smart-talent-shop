import { Router } from "express";
import validateToken from "./validate-token";
import { createOrder, getOrders, getOrdersAll } from "../controllers/order";

const router = Router();

router.get('/', validateToken, getOrdersAll)
router.get('/:idUser', validateToken, getOrders)
router.post('/', validateToken, createOrder)

export default router;