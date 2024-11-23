"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeController = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield product_model_1.default.create(data);
        res.json({
            message: "Bike created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
            stack: "Error: Something went wrong\n    at app.js:23:13\n    at...",
        });
    }
});
const getBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield product_model_1.default.find(data);
        res.json({
            message: "Bikes retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
            stack: "Error: Something went wrong\n    at app.js:23:13\n    at...",
        });
    }
});
const getSpecificBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_model_1.default.findById(id);
        res.json({
            message: "Bike retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
            stack: "Error: Something went wrong\n    at app.js:23:13\n    at...",
        });
    }
});
const updateBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const updateData = req.body;
        const result = yield product_model_1.default.findByIdAndUpdate(id, updateData);
        res.json({
            message: "Bike updated successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
            stack: "Error: Something went wrong\n    at app.js:23:13\n    at...",
        });
    }
});
const deleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield product_model_1.default.findByIdAndDelete(id);
        res.json({
            message: "Bike deleted successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
            stack: "Error: Something went wrong\n    at app.js:23:13\n    at...",
        });
    }
});
exports.bikeController = {
    createBike,
    getBike,
    getSpecificBike,
    updateBike,
    deleteBike,
};
