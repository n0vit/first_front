import React, {useEffect, useState} from 'react';
import Input from "../components/Input";
import  "../styles/Auth.css";
import  "../styles/Input.css"
import {useAppSelector} from "../hooks/TypedSelectors";
import {UserI} from "../models/user";
import {useActions} from "../hooks/UseActions";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Input_file from "../components/Input_photo";
import {toastIdIncrement} from "../store/action-creators/user";

const Signin=() => {
    const  [form,setForm] = useState<UserI>({
        avatar: "", cart: [], isCustomer: false, login: "", name: "", password: "", products: undefined
    });

    const  [toastId,setToastId] = useState(0);
    const {register}  = useActions()
    const  user = useAppSelector(state => state.user)
    const navigate = useNavigate();
    useEffect(()=>{
        if (user.error){
            toast.update(toastId, {render: user.error,type: toast.TYPE.WARNING});
            toastIdIncrement();

        }
        if (user.loading){
            console.log(toastId)
            toast("Wait Server Response", {toastId: user.toastId})
                }

        if(user.isAuthorized){
            navigate('/admin-panel');
        }

    },[user.error, user.loading, user.isAuthorized])


    const onChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
        const  {value,name} = e.target;
        setForm((state)=>({
            ...state,
            [name]: value
        }));
        console.log(form);
    }
    return (
        <div className="modal">
            <div className="modal__window">
                <ToastContainer/>
                <form>
                    <div className="input_component" >
                <div className="input_component__title">
                    Who are You:</div>
                    <select onChange={onChange} name="isCustomer"  className="input_component__input_select">
                        <option value={"true"}>Customer</option>
                        <option value={"false"}>Seller</option>
                    </select></div>

                <Input name={"Login"} targetName="login" placeholder={"Elon Mask"} value={form.login}  onChange={onChange}></Input>
                <Input name={"Password"}  targetName="password" value={form.password} type="password" onChange={onChange}></Input>
                <Input name={form.isCustomer ?"Brand Name":"Public Name"}  targetName="name" placeholder={"Elon | SpaceX"} value={form.name} onChange={onChange}></Input>
                    <div className="wrapper"><Input_file input={"modal__login__avatar"} preview_style={"modal__login__avatar"} small_input={"modal__login__avatar"}
                          text="avatar 125X125 px supports .jpeg .png .jpg"   value={form.avatar}
                          GetInput={(e)=>{setForm((state) =>({...state, "avatar": e.target.files![0]}))}}
                          title="Avatar"></Input_file></div>
                </form>
                <div>
                    <div className="modal__login">
                        <h4>Already have account?</h4>
                        <a href="http://localhost:3000/login">LogIn</a>
                    </div>
                    <div  className="primary_button"><div onClick={()=>{register(form); setToastId(toastId+1)}} >Create</div></div>
                </div>
            </div>
        </div>
    )
};

export default Signin;
