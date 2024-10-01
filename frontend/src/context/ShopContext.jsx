import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { io } from 'socket.io-client';

// Create the ShopContext
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'LKR';
    const delivery_fee = 200;
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const socket = io('http://localhost:4000'); // Connect to the Socket.IO server

    // Function to add items to the cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Please select a product size');
            return;
        }

        // Clone the current cartItems state
        let cartData = structuredClone(cartItems);

        // If the item is already in the cart, increment its quantity
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        // Send the cart update to the backend and emit the updated cart to other clients
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error('Error adding item to cart');
            }
        }

        // Emit the updated cart data to the server
        socket.emit('cart_update', cartData);
    };

    // Function to update item quantity in the cart
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        // Update the quantity for the specific item and size
        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.error(error);
                toast.error('Error updating item quantity');
            }
        }

        // Emit the updated cart data to the server
        socket.emit('cart_update', cartData);
    };

    // Function to calculate the total number of items in the cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                totalCount += cartItems[items][item];
            }
        }
        return totalCount;
    };

    // Function to calculate the total cart amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    totalAmount += itemInfo.price * cartItems[itemId][size];
                }
            }
        }
        return totalAmount;
    };

    // Fetch the products data from the backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error('Error fetching products');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching products');
        }
    };

    // Fetch the user's cart from the backend using the token
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error fetching cart data');
        }
    };

    // On component mount, fetch products and initialize the cart from localStorage
    useEffect(() => {
        getProductsData();
    }, []);

    // Set the token if it's in localStorage and fetch the cart for the logged-in user
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
        if (token) {
            getUserCart(token);
        }

        // Listen for cart updates from the server
        socket.on('cart_updated', (updatedCart) => {
            setCartItems(updatedCart); // Update the cart with real-time data from the server
        });

        return () => {
            socket.off('cart_updated'); // Clean up listener when the component unmounts
        };
    }, [token]);

    // Values and functions passed to components using this context
    const value = {
        products,
        currency,
        delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems,
        addToCart,
        updateQuantity,
        setCartItems,
        getCartCount,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
