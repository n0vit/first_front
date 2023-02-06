import {useEffect, useState} from 'react';
import Input from "../components/Input";
import  "../styles/Auth.css";
import  {login} from "../store/action-creators/user";
import {useActions} from "../hooks/UseActions";
import {useAppSelector} from "../hooks/TypedSelectors";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const Login =() => {
    const  [login_input,setLogin] = useState("");
    const  [password,setPassword] = useState("");
    const {login}  = useActions();
    const  [toastId,setToastId] = useState(0);

    const  user_status = useAppSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(()=>{
        // check_login()
        if (user_status.error) {
            console.log(toastId)
            toast.update(toastId, {render: user_status.error,type: toast.TYPE.WARNING})

        }
        if (user_status.loading){
            console.log(toastId)
            toast("Wait Server Response", {toastId: toastId})
        }



        if(user_status.isAuthorized){
            navigate('/admin-panel');
        }

    },[user_status.error, user_status.loading, user_status.isAuthorized])



    return (<div className="modal">
            <ToastContainer/>
            <div className="modal__window">
                <Input name={"Login"} placeholder={"Elon Mask"} value={login_input}  onChange={(event)=>{setLogin(event.currentTarget.value)}}></Input>
                <Input name={"Password"}  value={password} type="password" onChange={(event)=>{setPassword(event.currentTarget.value)}}></Input>
                <div  className="primary_button"><text onClick={()=>{login(password, login_input); setToastId(toastId +1)}}>Login</text></div>
            </div>
        </div>
    );
};

export default Login;
