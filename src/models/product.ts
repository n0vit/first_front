
export enum categories {
    all="all",
    electronic="electronic",
    home= "home",
    health="health",

}


export interface ProductI {

    _id: string;
    count?: number
    category: categories;
    user_id: string;
    brand:string;
    name: string;
    photo: string;
    price:number;
    description: string;

}

export  interface ProductInitState{
    price: number;
    category: string;

    count: number;
    name: string;
    description: string;

    photo: string| Blob;
}
