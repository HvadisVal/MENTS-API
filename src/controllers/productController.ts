import { Request, Response } from 'express'
import { ProductModel } from '../models/productModel'
import { connect, disconnect } from '../repository/database';

/**
 * Creates a new product based on the request body
 * @param req
 * @param res
 */
export async function createProduct(req: Request, res: Response): Promise<void> {

    const data = req.body;

    try {
        await connect();

        const product = new ProductModel(data);
        const result = await product.save();
        res.status(201).send(result);
    }
    catch {
        res.status(500).send("Error creating product.");
    }
    finally {
        await disconnect();
    }
}

/**
 * Get all products
 * @param req
 * @param res
 */
export async function getAllProducts(req: Request, res: Response) {
    try {
        await connect();
        const result = await ProductModel.find({});
        res.status(200).send(result);
    }
    catch // (err) // advanced error handling
    {
        // simple error handling
        res.status(500).send("Error retrieving products.");
        /*
        // advanced error handling
        if (err instanceof Error) {
            res.status(500).send(
                {
                    message: 'Error retrieving products.',
                    error: err.message
                }
            );
        */
    }
    finally {
        await disconnect();
    }
}

/**
 * Get specific product by id
 * @param req
 * @param res
 */
export async function getProductById(req: Request, res: Response) {
    try {
        await connect();
        const result = await ProductModel.find({ _id: req.params.id });
        res.status(200).send(result);
    } catch {
        res.status(500).send("Error retrieving product with id=" + req.params.id);
    }
    finally {
        await disconnect();
    }
}

/**
 * Update specific product by id
 * @param req 
 * @param res 
 */
export async function updateProductById(req: Request, res: Response) {
    const id = req.params.id;

    try {
        await connect();
        const result = await ProductModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send('Cannot update product with id=' + id);
        }
        else { res.status(200).send('Product was succesfully updated.'); }
    }
    catch (err) {
        res.status(500).send('Error updating product with id=' + id);
    }
    finally {
        await disconnect();
    }
}

/**
 * Delete specific product by id
 * @param req 
 * @param res 
 */
export async function deleteProductById(req: Request, res: Response) {

    const id = req.params.id;

    try {
        await connect();
        const result = await ProductModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send('Cannot delete product with id=' + id);
        }
        else { res.status(200).send('Product was succesfully deleted.'); }
    }
    catch {
        res.status(500).send('Error deleting product with id=' + id);
    }
    finally {
        await disconnect();
    }
}

/**
 * Get all products in stock
 * @param req
 * @param res
 */
export async function getProductsInStock(req: Request, res: Response) {
    try {
        await connect();
        const result = await ProductModel.find({ stock: { $gt: 0 } });
        res.status(200).send(result);
    } catch {
        res.status(500).send("Error retrieving products in stock.");
    }
    finally {
        await disconnect();
    }
}


/**
 *
 * @param req
 * @param res
 */
export async function getProductsBasedOnQuery(req: Request, res: Response) {
    const field = req.body.field;
    const value = req.body.value;

    try {
        await connect();
        const result = await ProductModel.find({ [field]: [value] });
        res.status(200).send(result);
    } catch {
        res.status(500).send("Error retrieving products based on query.");
    }
    finally {
        await disconnect();
    }
}


/**
 * Get specific product by id
 * @param req
 * @param res
 */
export async function getProductByQuery(req: Request, res: Response) {

    const key = req.params.key;
    const val = req.params.val;

    try {
        await connect();

        const result = await ProductModel.find({ [key]: {$regex: val, $options: 'i' }});

        
        res.status(200).send(result);
    } catch {
        res.status(500).send("Error retrieving product with id=" + req.params.id);
    }
    finally {
        await disconnect();
    }
}