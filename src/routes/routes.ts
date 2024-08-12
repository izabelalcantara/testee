import { Router } from "express";
import { productController } from "../controllers/product.controller"; 
import {userController} from "../controllers/user.controller";
import { buyItemController } from "../controllers/buyitem.controller";
import { addressController } from "../controllers/addresses.controller";
import { messageController } from "../controllers/message.controller";

const router = Router();

//products
router.post("/product", productController.create);
router.get("/products", productController.readAll);
router.get("/product/:id", productController.read);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

//rotas usuário
router.post('/users', userController.create);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.put('/user/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/users/:id/messages', userController.getUserMessages);
router.get('/users/:id/orders', userController.getUserOrders);
router.get('/users/:id/cart', userController.getUserCart);
router.get('/users/:id/favorites', userController.getUserFavorites);

// Rotas BuyItem
router.post('/buyitems', buyItemController.createBuyItem);
router.get('/buyitems/:orderId/:productId', buyItemController.getBuyItemById);
router.get('/buyitems', buyItemController.getAllBuyItems);
router.put('/buyitems/:orderId/:productId', buyItemController.updateBuyItem);
router.delete('/buyitems/:orderId/:productId', buyItemController.deleteBuyItem);

// Rotas Address
router.post('/addresses', addressController.create);
router.get('/addresses/:id', addressController.getAddressById);
router.get('/addresses', addressController.getAllAddresses);
router.put('/addresses/:id', addressController.updateAddress);
router.delete('/addresses/:id', addressController.deleteAddress);

// Rotas Message
router.post('/messages', messageController.createMessage);
router.get('/messages/:id', messageController.getMessageById);
router.put('/messages/:id', messageController.updateMessage);
router.delete('/messages/:id', messageController.deleteMessage);





export default router;
