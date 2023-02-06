import {ProductI} from "./product";

export interface UserI {

    products?: Array<ProductI>;

    cart: Array<ProductI>;

    isCustomer: boolean;

    name: string;

    avatar:string | Blob;

    login: string;

    password: string;

}
