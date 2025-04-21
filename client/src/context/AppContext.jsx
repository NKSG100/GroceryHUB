import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const currency = "₹";

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    const fetchSeller = async ()=> {
        try {
            const {data} = await axios.get("/api/seller/is-auth");
            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    const fetchUser = async ()=> {
        try {
            const {data} = await axios.get("/api/user/is-auth");
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
            else{
                setUser(null);
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            setUser(null);
        }
    }

    const fetchProducts = async ()=> {
        try {
            const {data} = await axios.get("/api/product/list");
            if(data.success){
                setProducts(data.products);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const addToCart = (itemId)=> {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Item added to cart");

    }

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated");
    }

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if(cartData[itemId] <= 0){
                delete cartData[itemId];
            }
        }
        toast.success("Item removed from cart");
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let count = 0;
        for(let item in cartItems){
            count += cartItems[item];
        }
        return count;
    }

    const getCartAmount = () => {
        let total = 0;
        for(let item in cartItems){
            let product = products.find((product) => product._id === item);
            if(cartItems[item] > 0){
                total += product.offerPrice * cartItems[item];
            }
            return total;
        }
        return Math.floor(total*100)/100;
    }

    useEffect(()=>{
        fetchUser();
        fetchSeller();
        fetchProducts();
    },[])

    useEffect(()=>{
        const updateCart = async ()=> {
            try {
                const {data} = await axios.post("/api/cart/update", {cartItems})
                if(!data.success){
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }

        if(user){
            updateCart();
        }
    },[cartItems])

    const value = {
        navigate,
        user, setUser,
        setIsSeller, isSeller,
        showUserLogin, setShowUserLogin,
        products,
        currency, addToCart, updateCartItem, removeFromCart,
        cartItems, searchQuery, setSearchQuery,
        getCartCount, getCartAmount,
        axios, fetchProducts,setCartItems
    };
    return <AppContext.Provider value={value}>
            {children}
           </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}