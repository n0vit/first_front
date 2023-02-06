import React, {useEffect} from 'react';
import  "../styles/Product.css";
import {FaCartPlus} from "react-icons/fa"
import {useAppDispatch, useAppSelector} from "../hooks/TypedSelectors";
import {useParams} from "react-router-dom";
import {clear_product_page, getProduct} from "../store/reducers/product";
import {toast, ToastContainer} from "react-toastify";
import Counter from "../components/Counter";
import {FaPlus} from "@react-icons/all-files/fa/FaPlus";
import {FaMinus} from "@react-icons/all-files/fa/FaMinus";
import {add_to_cart} from "../store/action-creators/user";
import {ProductI} from "../models/product";
import {useActions} from "../hooks/UseActions";


export  interface ProductPageProps{

    category: string;
    name: string;
    photo: string;

    description: string;

    price: number;

    brand: string;


}


const Product = () => {
    // const  [product, setProduct] = useState<ProductPageProps>({photo:'', price:0,name:'', description:'', brand:'',category:'c'})
    const  {id} = useParams();
    const  dispatch = useAppDispatch();
    const  product = useAppSelector(state => state.product);
    const  cart =  useAppSelector(state => state.user.cart);
    const {add_to_cart}  = useActions();
    useEffect(
        ()=>{
            dispatch(clear_product_page());
            dispatch(getProduct(id?? "0"));
            }, [dispatch, id]
    )

    if (product.error){toast.error( "Smt went wrong please try again")}
    if (product.loading){toast("Wait Server Response", {toastId: 'loading'})}
    if (product.page && product.page?._id === id){
            toast.update('loading',{render:"Successfully", type: toast.TYPE.SUCCESS ,autoClose:1000})}

    function  addToCart() {
        const product_to_cart = {
            ...product.page,
            count:0
        }

        if((cart.find(pr=> pr._id === id)?.count ?? 0)  === 0){
            return ( <div className="product__price_bar" onClick={()=>add_to_cart(product_to_cart as ProductI)}><FaCartPlus className="product__cart_icon"></FaCartPlus> {product.page?.price} $</div>)
        }
        else  return (<Counter secondBtn={<FaPlus/>} firstBtn={<FaMinus/>} productId={product.page?._id ?? '0'} />)

    }


    return (<div>
            <ToastContainer/>
        {product.loading ? <></> :
                <div className="product_page">

                <img className="product__photo"  src={product.page?.photo ?? ''} alt=''/>
                <div className="product__title">{product.page?.name}</div>
                <div className="product__description">Description: {product.page?.description}</div>
                {/*<div className="product__price_bar"><FaCartPlus className="cart_icon"></FaCartPlus> {product.page?.price} $</div>*/}
                    {addToCart()}
        </div>
        }</div>
    );
};




export default Product;
