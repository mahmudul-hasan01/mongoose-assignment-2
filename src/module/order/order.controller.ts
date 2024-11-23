import { Request, Response } from "express";
import Bike from "../product/product.model";
import Order from "./order.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const product = await Bike.findById(data?.product);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const updatedQuantity = product.quantity - data.quantity;

    if (product.quantity > 0) {
      await Bike.findByIdAndUpdate(data.product, {
        quantity: updatedQuantity,
        updatedAt: new Date(),
      });
      const totalPrice = product.price * data.quantity;
      const orderData = {
        ...data,
        totalPrice,
      };
      const newOrder = await Order.create(orderData);

      res.json({
        message: "Order created successfully",
        success: true,
        data: newOrder,
      });
    } else {
      await Bike.findByIdAndUpdate(data.product, {
        inStock: updatedQuantity > 0,
        updatedAt: new Date(),
      });
      res.status(400).json({
        message: "Out Of Stock",
        success: false,
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
      stack: "Error: Something went wrong\n    at app.js:23:13\n    at...",
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.json({
      message: "Revenue calculated successfully",
      success: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
      stack: "Error: Something went wrong\n    at app.js:23:13\n    at...",
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue,
};
