import { Request, Response } from 'express';
import { Product } from '../models/product';
import { generateRandomCode, imageRandon } from '../utils/randomCode';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Product.findAll();
    res.json(listProducts)
}

export const editProduct = async (req: Request, res: Response) => {
    const idProduct = req.params.idProduct;
    console.log(idProduct)
    const { description, name, price, stock } = req.body
    try {
        const updateProduct = await Product.update(
            {
                stock: stock,
                price: price,
                name: name,
                description: description
            },
            { where: { id: idProduct } }
        );
        res.json({
            msg: `Producto Actualizado Correctamente.`,
        })

    } catch (error) {
        res.status(400).json({
            msg: "Orden No Actualizada Correctamente",
            error: error
        })
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    const idProduct = req.params.idProduct;
    try {
        const destroyProduct = await Product.destroy(
            { where: { id: idProduct } }
        );
        res.json({
            msg: `Producto Eliminado Correctamente.`,
        })

    } catch (error) {
        res.status(400).json({
            msg: "Orden No Eliminada Correctamente",
            error: error
        })
    }
}

export const addProduct = async (req: Request, res: Response) => {
    const idProduct = req.params.idProduct;
    const { description, name, price, stock, userCreatedId } = req.body

    try {
        const createProduct = await Product.create({
            stock: stock,
            price: price,
            name: name,
            description: description,
            userCreated: userCreatedId,
            image: imageRandon,
            codeProduct: generateRandomCode()
        });
        res.json({
            msg: `Producto Creado Correctamente.`,
        })

    } catch (error) {
        res.status(400).json({
            msg: "Producto No Creado Correctamente",
            error: error
        })
    }
}