import {ProductI} from "../models/product";
import {UserI} from "../models/user";



export interface UserState extends  UserI{
    toastId: number;
    loading: boolean;
    isAuthorized: boolean;
    error: null | string;
}

export enum UserActionTypes {


    ADD_TO_CART= "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_ART",
    TOAST= "TOAST",
    REGISTER ="REGISTER",
    LOGIN="LOGIN",
    LOGOUT="LOGOUT",
    LOGGED="LOGGED",
    LOGOUT_ED= "LOGOUT_ED",
    ERROR="ERROR"
}


interface Logout_edAction {
    type: UserActionTypes.LOGOUT_ED;


}

interface  ToastIdIncrement{
    type: UserActionTypes.TOAST;
    payload: number
}


interface LoginAction {
    type: UserActionTypes.LOGIN;
    payload: Array<string>;

}


interface LogoutAction {
    type: UserActionTypes.LOGOUT;
    payload: string;

}


interface LoggedAction {
    type: UserActionTypes.LOGGED;
    payload: UserI;

}
interface RegisterUserAction {
    type:UserActionTypes.REGISTER;
    payload: Array<string>;

}

interface AddToCartAction {
    type:UserActionTypes.ADD_TO_CART;
    payload: ProductI;

}

interface  RemoveFromCartAction{
    type: UserActionTypes.REMOVE_FROM_CART;
    payload: string;
}


interface ErrorAction {
    type:UserActionTypes.ERROR;
    payload: string;

}

export type  UserAction =  LoggedAction |ToastIdIncrement| AddToCartAction |RegisterUserAction| RemoveFromCartAction | ErrorAction | Logout_edAction|LoginAction| LogoutAction
