import {categories, ProductI} from "../models/product";


export interface ProductState {
    products: Array<ProductI>;

    category: categories;
    page: ProductI| null;
    loading: boolean;

    error:  string| null;
}

export enum ProductActionTypes {

    GET_ALL ="GET_ALL",
    LOADING="LOADING",
    LOGGED="LOGGED",
    LOGOUT_ED= "LOGOUT_ED",

    ERROR="ERROR",

}
