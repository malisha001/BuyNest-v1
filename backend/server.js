import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import assistRouter from './routes/assistRoute.js';
import messageRoutes from './routes/messageRoute.js';
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import Socket.io

// App Config
const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: '*', // Allow requests from all origins (update this with your frontend URL in production)
    },
}); // Initialize Socket.io with the server

connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/assist', assistRouter);
//message route
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    res.send("API Working");
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for a cart update event from a user
    socket.on('cart_update', (cartData) => {
        console.log('Cart updated:', cartData);

        // Broadcast the updated cart to all connected clients (including helpers)
        io.emit('cart_updated', cartData); // Use `io.emit` to broadcast to all clients
    });

    // Listen for the acceptance of assistance
    socket.on('acceptAssistance', (userId, cartData) => {
        console.log('Assistance accepted for user:', userId);
        // Emit the cart data to the helper (or specific client if needed)
        socket.broadcast.emit('cartInfo', cartData); // Use `broadcast` to send to all other clients
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(port, () => console.log('Server started on PORT: ' + port));
