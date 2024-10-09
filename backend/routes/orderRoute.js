import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay,getOrderDetails } from '../controllers/orderController.js'
import { getAllRefunds, placeRefund, getRefundByUser,deleteRefund } from '../controllers/refundController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { get } from 'mongoose'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.get('/get-refunds',getAllRefunds);

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/track-order', getOrderDetails);
orderRouter.post('/refund', getOrderDetails);
orderRouter.post('/submit-refund',placeRefund);
orderRouter.post('/get-refunds',getRefundByUser);
orderRouter.post('/refund-status',updateStatus);
orderRouter.post('/refund-delete',deleteRefund);

// verify payment
orderRouter.post('/verifyStripe',authUser, verifyStripe)
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)

export default orderRouter