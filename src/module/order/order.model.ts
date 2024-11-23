import { model, Schema } from "mongoose";


const orderSchema = new Schema({
   email: {
     type: String,
     required: true,
   },
   product:  {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Order = model('Order', orderSchema)

export default Order;