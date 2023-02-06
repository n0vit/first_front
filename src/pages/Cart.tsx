import React, {FC} from 'react';
import "../styles/Cart.css"
import Counter from "../components/Counter";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {FaMinus} from "@react-icons/all-files/fa/FaMinus";
import {useAppSelector} from "../hooks/TypedSelectors";
import {useActions} from "../hooks/UseActions";
import {Link} from "react-router-dom";


interface CartItemsI
{
    photo: string;
    title: string;
    description: string;
    price: number;
    productId: string;
}

const  CartItems:FC<CartItemsI> =({photo, title, description, price, productId})=>{
    return (
        <div className="Cart_item">
        <img  className="Cart_item__product_photo" src={photo} alt="" />
            <div className="Cart_item__product_title">
                <text className="Cart_item__product_title__name">{title}</text>
                 <br/>
                <div className="Cart_item__product_title__description">{description}</div>
            </div>
            <div className="Cart_item__product_title__end_block">
                <div>{price}$</div>
                <Counter secondBtn={<FaPlus/>} firstBtn={<FaMinus/>} productId={productId} />
            </div></div>
    );
}


const Cart = () => {
    const  cart  = useAppSelector(state => state.user.cart)
    const {update_cart}  = useActions();
    let total = 0
    function CartIsEmpty () {
        if (cart.length !== 0) {
            total = cart.map(pr => pr.price * (pr.count ?? 1)).reduce((a, b) => a + b);

        return <div className="Cart_page">
            {cart.map(pr => <CartItems key={pr._id} productId={pr._id} photo={pr.photo} price={pr.price}
                                       description={pr.description} title={pr.name}/>)}
            <footer className="Cart_bottom"> Total: {total}$ <div
                className="primary_button Cart_bottom__spaces">Buy</div>   <span></span></footer>
        </div>}
    else
        {update_cart(cart);
        return <div> <img
            src="https://www.djsuperstore.com/pub/static/frontend/MageBig/martfury_layout05/en_GB/images/empty-cart.svg"
            alt=''/>
            <div className="Cart_empty">
            <div className="Navbar__logo_title">Cart Empty</div> <br/>
            <div
                className="primary_button Cart_bottom__spaces"><Link  to="/shop">Shop</Link></div></div>
        </div>}
    }

    return (
        <>{CartIsEmpty()}</>
    );
};

export default Cart;
