import React, {useEffect} from 'react';
import Card from "../components/Card";
import {useAppSelector} from "../hooks/TypedSelectors";
import {Link, useNavigate} from "react-router-dom";

import "../styles/Shop.css"
import {useActions} from "../hooks/UseActions";


const AdminPanel = () => {
    const  user= useAppSelector(state => state.user)
    const navigate = useNavigate();
    const {check_login} = useActions();
    useEffect(()=>{
        check_login()
        if(!user.isAuthorized  || user.isCustomer){
            navigate("/shop")
        }
    }, [])

    return (
        <div>
            <div className="full_content">Admin Panel</div>
            <div className="shop">
                <Link to="/product/0/add&edit"><Card  price={0}  key="0" name={"Add New Product"} photo={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe-j5PJRX4f6Ykaa2SrlVbJeiqGk0cRAzfUQ&usqp=CAU"} brand={user.name}></Card></Link>
                {user.products?.map((prod) =>{
                    return <Card key={prod._id} brand={prod.brand} price={prod.price} id={prod._id} isAdminCard={true} name={prod.name} photo={prod.photo}></Card>

                })}
            </div></div>
    );
};

export default AdminPanel;
