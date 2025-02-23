import { Router, Request, Response } from 'express';
import { createProduct, 
         getAllProducts, 
         getProductById, 
         updateProductById,  
         deleteProductById,
         getProductsInStock, 
         getProductByQuery, 
         getProductsBasedOnQuery
        } from './controllers/productController';    
import { loginUser, registerUser, verifyToken } from './controllers/authController';


const router : Router = Router();

// get, post, put, delete (CRUD)

router.get('/', (req: Request, res: Response) => {
    // connect
    res.status(200).send('Welcome to the MENTS API');
    // disconnect
});

//auth
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// create 
router.post('/products', verifyToken, createProduct);
// gets
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.get('/products/instock', getProductsInStock);
router.get('/products/query/:key/:val', getProductByQuery);
//update, delete
router.put('/products/:id', verifyToken, updateProductById);
router.delete('/products/:id', verifyToken, deleteProductById);
router.post('/products/query', getProductsBasedOnQuery);



export default router;