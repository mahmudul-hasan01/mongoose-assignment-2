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
exports.orderController = void 0;
const product_model_1 = __importDefault(require("../module/product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const product = yield product_model_1.default.findById(data === null || data === void 0 ? void 0 : data.product);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        const updatedQuantity = product.quantity - data.quantity;
        if (product.quantity > 0) {
            yield product_model_1.default.findByIdAndUpdate(data.product, {
                quantity: updatedQuantity,
                updatedAt: new Date
            });
            const totalPrice = product.price * data.quantity;
            const orderData = Object.assign(Object.assign({}, data), { totalPrice });
            const newOrder = yield order_model_1.default.create(orderData);
            res.json({
                message: "Order created successfully",
                success: true,
                data: newOrder,
            });
        }
        else {
            yield product_model_1.default.findByIdAndUpdate(data.product, {
                inStock: updatedQuantity > 0,
                updatedAt: new Date
            });
            res.status(400).json({
                message: "Out Of Stock",
                success: false,
                data: {},
            });
        }
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
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aggregation pipeline to calculate total revenue
        const result = yield order_model_1.default.aggregate([
            {
                $group: {
                    _id: null, // Group all documents together
                    totalRevenue: { $sum: "$totalPrice" }, // Sum the totalPrice field
                },
            },
        ]);
        // Extract the total revenue or set to 0 if no orders exist
        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
        res.json({
            message: "Total revenue calculated successfully",
            success: true,
            data: {
                totalRevenue,
            },
        });
    }
    catch (error) {
        console.error("Error calculating revenue:", error);
        res.status(500).json({
            message: "Failed to calculate revenue",
            success: false,
            error: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getRevenue
};
