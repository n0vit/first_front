import {UserActionTypes} from "../../types/user";
import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {UserI} from "../../models/user";
import {ProductI} from "../../models/product";
import {error_handler} from "./helpers";





export const  check_login= () =>{
    return   async function (dispatch: Dispatch) {
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get("http://localhost:3001/user/check_access")
        if (response.status ===200){
        dispatch({type: UserActionTypes.LOGGED, payload: response.data})}
    } catch (e) {
        if (e instanceof  AxiosError){
            if (e.response !== undefined){
                console.log(e)
                console.log(e.response.data['message'])
        }
    }

    }
}}


export  const add_to_cart = (product: ProductI | undefined | null)=>{
    return async  function (dispatch: Dispatch){
        if (product) {
        dispatch({type: UserActionTypes.ADD_TO_CART, payload: product})
        }
    }
}

export  const remove_from_cart = (productId: string)=>{
    return function (dispatch: Dispatch){
        dispatch({type: UserActionTypes.REMOVE_FROM_CART, payload: productId});

    }
}

export  const update_cart =(cart: Array<any> ) =>{
    return async function () {
        try {
            await axios.put("http://localhost:3001/user/cart", {cart: cart})
        }  catch (e) {
            console.log(e)
        }
    }
}


export const login = (password: string, login_input: string) =>{
    return  async function (dispatch: Dispatch) {
        try {
            dispatch({type: UserActionTypes.LOGIN});
            const response = await axios.post("http://localhost:3001/user/login", {password: password, login: login_input})
            if (response.status ===200){
                console.log(response)
                dispatch({type: UserActionTypes.LOGGED, payload: response.data})}
            else {
                dispatch({type: UserActionTypes.ERROR, payload: response.data['message']})
            }
        } catch (e) {
            error_handler(e, UserActionTypes.ERROR, dispatch);
        }
    }
}

export const toastIdIncrement =() =>{
    return async function (dispatch: Dispatch) {
        dispatch({type: UserActionTypes.TOAST})
    }
}



export const logout =() =>{
    return async function (dispatch: Dispatch) {
        try {
            dispatch({type: UserActionTypes.LOGOUT})
            const response = await axios.get("http://localhost:3001/user/logout")
            dispatch({type: UserActionTypes.LOGOUT_ED})
            console.log(response)
        }  catch (e) {
            error_handler(e, UserActionTypes.ERROR, dispatch)
        }
    }
}


export  const register=(user: UserI)=>{
    return async function(dispatch: Dispatch) {
        try {
            const  data  = new FormData();
            data.append("name", user.name);
            data.append("password", user.password);
            data.append("isCustomer" , `${user.isCustomer}`);
            data.append("avatar", user.avatar);
            data.append("login", user.login);

            dispatch({type: UserActionTypes.REGISTER})
            axios.defaults.withCredentials = true;
            const response  = await  axios.postForm("http://localhost:3001/user/registration", user);
            console.log(response)

            if (response.status ===201){
                dispatch({type: UserActionTypes.LOGGED, payload:response.data})}

            else {
                dispatch({type: UserActionTypes.ERROR, payload: response.data.message})
            }

        }  catch (e) {
            error_handler(e, UserActionTypes.ERROR, dispatch)
        }
    }
}



