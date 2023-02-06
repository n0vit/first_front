import React, {useEffect} from 'react';
import Card from "../components/Card";
import {useAppDispatch, useAppSelector} from "../hooks/TypedSelectors";
import {getAllProducts, set_category} from "../store/reducers/product";
import {Link} from "react-router-dom";
import {categories} from "../models/product";
import {toast, ToastContainer} from "react-toastify";
import "../styles/Shop.css"

const Shop = () => {
    const  product_state = useAppSelector(state => state.product)
    const dispatch  = useAppDispatch();

    useEffect(()=>{
        dispatch(getAllProducts())


   }, [dispatch , product_state.category])


    if (product_state.error){
        toast.error( "Smt went wrong please try again")

    }
    if (product_state.loading){
        toast("Wait" +
            "Server Response", {toastId: 'loading'})
    }

   else {
        toast.update('loading',{render:"Successfully", type: toast.TYPE.SUCCESS, autoClose: 2000})
    }

    const  chip = (name: categories)=> {
       if(product_state.category ===name){
       return <div className="full_content__chip selected" onClick={()=>dispatch(set_category(name))}>{name}</div>
       }
        else return <div className="full_content__chip" onClick={()=>dispatch(set_category(name))}>{name}</div>}

    console.log(product_state)
    return (
        <div>
            <ToastContainer/>
            <div className="full_content"> Our Shop</div>
            <div className="full_content"> {chip(categories.all)} {chip(categories.health)} {chip(categories.home)} {chip(categories.electronic)} </div>
        <div className="shop">
            {product_state.products.map((prod ) =>{
                return <Link key={prod._id} to={"/product/" + prod._id}><Card brand={prod.brand} price={prod.price} name={prod.name} photo={prod.photo as string}></Card></Link>

            })}
        </div> </div>
    );
};

export default Shop;
