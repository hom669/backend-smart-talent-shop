import { Router } from "express";
import { addProduct, deleteProduct, editProduct, getProducts } from "../controllers/product";
import validateToken from "./validate-token";

const router = Router();

router.get('/', validateToken, getProducts)
router.put('/:idProduct', validateToken, editProduct)
router.delete('/:idProduct', validateToken, deleteProduct)
router.post('/', validateToken, addProduct)

export default router;