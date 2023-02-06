import {AnyAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {categories, ProductI, ProductInitState} from "../../models/product";
import {ProductState} from "../../types/product";
import axios from "axios";
import {error_thunk_handler} from "../action-creators/helpers";



const  initialState:ProductState = {
    products: [],
    category: categories.all,
    page: null,
    error: null,
    loading: false,
}
export  const  getProduct= createAsyncThunk<ProductI,string,{rejectValue:string}>(
    'products/get_product',
    async  function (product_id,{rejectWithValue}){
        console.log("Get Product")
        console.log(product_id)
        try {
            const response = await axios.get(`http://localhost:3001/product/one?product_id=${product_id}`)
            console.log(response)
            if (response.status === 200) return response.data as ProductI
            else return rejectWithValue(response.data.message)

        }
        catch (e){
            return error_thunk_handler(e, rejectWithValue)
        }
    }
);

export  const  editProduct = createAsyncThunk<ProductI, [product:ProductInitState, id: string], {rejectValue: string}>(
    "product/editProduct",
    async function ([product, id],{rejectWithValue}){
        try {
            const data =  new FormData();
            data.append("file", product.photo);
            const  obj = Object.create(product);
            Object.keys(product).map(key => {
                data.append(key, obj[key].toString());
            })
            const response = await axios.put(`http://localhost:3001/product/edit?id=${id}`, data);

            return  response.data;
        }
        catch (e) {
            return error_thunk_handler(e, rejectWithValue)
        }
    }

)

export const deleteProduct = createAsyncThunk<string, string, {rejectValue: string}>(
    "product/deleteProduct",
    async function (product, {rejectWithValue}){
        try {
            const response = await axios.delete(`http://localhost:3001/product/delete?productId=${product}`);
            console.log(response)
            if(response.status ===200) return product
        }
        catch (e) {
            return error_thunk_handler(e, rejectWithValue)
        }
    }
);



export const addProduct = createAsyncThunk<ProductI, ProductInitState, {rejectValue: string}>(
    "product/addProduct",
    async function (product, {rejectWithValue}){
        try {
        const data =  new FormData();
        data.append("file", product.photo);
        const  obj = Object.create(product);
        Object.keys(product).map(key => {
            data.append(key, obj[key].toString());
        })
        const response = await axios.put("http://localhost:3001/product/add", data);
        return  response.data;
        }
            catch (e) {
                return error_thunk_handler(e, rejectWithValue)
            }
    }
    );


export const getAllProducts =createAsyncThunk<Array<ProductI> | undefined, undefined , {rejectValue:string, state: {product: ProductState }}>(
    "products/get_all_product",
    async function(_,{rejectWithValue,getState}){
        try {
            console.log('load_all_products')

            const response = await axios.get(`http://localhost:3001/product/all?category=${getState().product.category}`)
            console.log(response)
            if (response.status === 200){
                if (response.data  === getState().product.products){
                   return  undefined
                }
                else return response.data as ProductI[]}
            else return rejectWithValue(response.data.message)

        }
        catch (e){
            return error_thunk_handler(e, rejectWithValue)
        }
    }
);
export  const  productsReducer= createSlice({
    name:"products",
    initialState,
    reducers:{
            set_category: (state, action:PayloadAction<categories>) => {state.category =action.payload},
            clear_product_page: state=> {state.page =null}

    },


    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, {payload})=>{state.loading = false; state.page = payload;})
        builder.addCase(getAllProducts.fulfilled, (state, {payload})=>{state.loading = false;
        if (payload !== undefined){
            state.products = payload
        }})
        builder.addCase(deleteProduct.fulfilled, (state => {state.loading = false}))
        builder.addCase(addProduct.fulfilled, (state, {payload})=>{state.page = payload; state.loading = false})
        builder.addCase(editProduct.fulfilled, (state, {payload})=>{state.page= payload; state.loading = false})
        builder.addMatcher(PendingHandler, (state)=>{state.loading = true; state.error= null})
        builder.addMatcher(ErrorHandler, (state,action)=>{state.loading=false; state.error= action.payload ?? "smt went wrong"})
    }
})

function  ErrorHandler(action: AnyAction){
    return action.type.endsWith("rejected")
}
function  PendingHandler(action:AnyAction){
    return action.type.endsWith("pending")
}


export const {clear_product_page, set_category} = productsReducer.actions;


export  default  productsReducer.reducer
