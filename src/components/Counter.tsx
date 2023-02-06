import React, {FC, useEffect} from 'react';
import {BiLike} from "@react-icons/all-files/bi/BiLike";
import {BiDislike} from "@react-icons/all-files/bi/BiDislike";
import "../styles/Counter.css"

import {useAppSelector} from "../hooks/TypedSelectors";
import {useActions} from "../hooks/UseActions";



interface CounterI{
    firstBtn?: JSX.Element
    secondBtn?: JSX.Element

    productId: string
}


const Counter:FC<CounterI>= ({firstBtn= <BiLike/>, secondBtn= <BiDislike/>, productId})=> {

    const  cart = useAppSelector(state => state.user.cart);
    const {add_to_cart, remove_from_cart, update_cart}  = useActions();
    useEffect(()=>{
        update_cart(cart)},[cart])
    return (
        <div className="count">
            <button  onClick={() =>remove_from_cart(productId)} >
                {firstBtn}
            </button>
                <div className="count__text"> {cart.find(pr=> pr._id === productId)?.count ?? 0}</div>
            <button onClick={() => {
                const product= cart.find(pr=> pr._id === productId)
                add_to_cart(product);}}>
                {secondBtn}
            </button>
        </div>
    );
};

export default Counter;
