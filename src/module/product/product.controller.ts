import { Request, Response } from "express";
import Bike from "./product.model";

const createBike = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Bike.create(data);
    res.json({
      message: "Bike created successfully",
      success: true,
      data: result,
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

const getBike = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await Bike.find(data);
    res.json({
      message: "Bikes retrieved successfully",
      success: true,
      data: result,
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

const getSpecificBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await Bike.findById(id);
    res.json({
      message: "Bike retrieved successfully",
      success: true,
      data: result,
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

const updateBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updateData = req.body;
    const result = await Bike.findByIdAndUpdate(id, updateData);
    res.json({
      message: "Bike updated successfully",
      success: true,
      data: result,
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

const deleteBike = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await Bike.findByIdAndDelete(id);
    res.json({
      message: "Bike deleted successfully",
      success: true,
      data: result,
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

export const bikeController = {
  createBike,
  getBike,
  getSpecificBike,
  updateBike,
  deleteBike,
};
