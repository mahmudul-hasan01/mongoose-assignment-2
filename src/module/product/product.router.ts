import { Router } from "express";
import { bikeController } from "./product.controller";

const productRouter = Router()

productRouter.post('/products', bikeController.createBike)
productRouter.get('/products', bikeController.getBike)
productRouter.get('/products/:productId', bikeController.getSpecificBike)
productRouter.put('/products/:productId', bikeController.updateBike)
productRouter.delete('/products/:productId', bikeController.deleteBike)

export default productRouter