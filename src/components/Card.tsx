import React from 'react';
import '../styles/Card.css';
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/TypedSelectors";
import {deleteProduct} from "../store/reducers/product";
import {check_login} from "../store/action-creators/user";
import {useActions} from "../hooks/UseActions";
interface CardProps{
    name: string;
    photo: string;

    brand: string;

    price:number;

    id?: string;

    isAdminCard?: boolean;

}

const Card: React.FunctionComponent<CardProps> = ({name,id="0",photo,isAdminCard= false,price=100,brand= "Apple"}) => {
    const  dispatch = useAppDispatch();
    const {check_login} = useActions();

    function  endBar(){
        if(isAdminCard){
           return  <div className="icon_bar">
               <div className="icon" onClick={()=>{dispatch(deleteProduct(id)).then(()=> check_login())}}><AiFillDelete></AiFillDelete></div>
                <div className="bottom__price">{price} $</div>
            <Link to={`/product/${id}/add&edit`}><div className="icon"><AiFillEdit></AiFillEdit></div></Link>
            </div>
        }
        else  return <div><div className="bottom__price">{price} $</div></div>
    }

    return (
        <div className="CardStyle">
            {isAdminCard ? <Link to={`/product/${id}`}><img className="photo" src={photo} alt="Not Found"/></Link>: <img className="photo" src={photo} alt="Not Found"/>}
            <div className="bottom">
                <h3 className="bottom__name">{name}</h3>
                <h5 className="bottom__author">{brand}</h5>
                {endBar()}
            </div>
        </div>
    );
};

export default Card;
