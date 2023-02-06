import React, {useReducer, useEffect} from 'react';
import Input from "../components/Input";
import Input_file from "../components/Input_photo";
import {useAppDispatch, useAppSelector} from "../hooks/TypedSelectors";
import {useNavigate, useParams} from "react-router-dom";
import {categories, ProductInitState} from "../models/product";
import {addProduct, editProduct} from "../store/reducers/product";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/AdminPanel.css"




enum ActionKind {

    COUNT="COUNT",
    PRICE= "PRICE",
    CATEGORY="CATEGORY",
    EDIT = "EDIT",

    NAME = 'NAME',
    DESCRIPTION = 'DESCRIPTION',
    PHOTO = "PHOTO",

    SEND="SEND"
}

// An interface for our actions
interface Action {
    type: ActionKind;
    payload: any;
}


let init_state: ProductInitState={
    name: '', photo: '', description: '', category: categories.all, price: 0, count: 1
}

function reducer(state: ProductInitState, action: Action) {
    switch (action.type) {
        case  ActionKind.EDIT:
            return {
                ...action.payload as ProductInitState
            }

        case ActionKind.DESCRIPTION:
            return {
                ...state,
                description: action.payload as string
            }
        case ActionKind.NAME:
            console.log(action)
            return {
                ...state,
                name: action.payload as string
            }
        case ActionKind.CATEGORY:
            console.log(action)
            return {
                ...state,
                category: action.payload as string
            }
        case ActionKind.PRICE:
            console.log(action)
            return {
                ...state,
                price: action.payload as number
            }


        case ActionKind.COUNT:
            console.log(action)
            return {
                ...state,
                count: action.payload as number
            }

        case  ActionKind.PHOTO:
            console.log(state)
            console.log(action)
            return {
                ...state,
                photo:   action.payload as string
            }
        case  ActionKind.SEND:
            console.log(state)
            console.log(action)
            return {
                ...init_state
            }
        default:
            return state;
    }
}


const AddEditProduct =() => {
    let  {id} = useParams();
    const  user_status = useAppSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [state, local_dispatch] = useReducer(reducer, init_state);


    const  AddOrEdit = (state: ProductInitState) => {
        console.log(id)
        if (id !=='0') dispatch(editProduct([state, id ?? '0'])).then(()=>   navigate('/admin-panel/'))
        else dispatch(addProduct(state)).then(()=>   navigate('/admin-panel/'))

    }
    useEffect(()=> {
        if (id) {
            const prod = user_status.products?.find(p => p._id === id)
            if (prod) {
                local_dispatch({
                    type: ActionKind.EDIT, payload: {
                        name: prod.name,
                        photo: prod.photo,
                        count: prod.count,
                        description: prod.description,
                        category: prod.category,
                        price: prod.price
                    }
                })
            }
        }

        if (user_status.error) {
            toast.error("Smt went wrong please try again")

        }
        if (user_status.loading) {
            toast("Wait" +
                "Server Response")
        }

        if (!user_status.isAuthorized) {
            navigate('/registration');
        }

    }, [user_status]);



    return (
        <div className="admin_page">
            <ToastContainer/>
            <div className="admin_page__title">{id !=='0'? 'Editing Product':'Go add Products'}</div>
            <Input  name="Product name" value={state.name} onChange={(event) => {local_dispatch({type:ActionKind.NAME, payload: event.currentTarget.value})}}></Input>
            <div className="input_component">
                <div className="input_component__title">Description</div>
                <textarea className="input_component__input_textarea" value={state.description} onChange={(event) => {local_dispatch({type:ActionKind.DESCRIPTION, payload: event.currentTarget.value})}}></textarea>
            </div>
            <div className="input_component">
                <div className="input_component__title">
                    Select Category:</div>
            <select onChange={event => local_dispatch({type:ActionKind.CATEGORY , payload: event.target.value})} name="Categories"  className="input_component__input_select">
                <option value={categories.all}>All</option>
                <option value={categories.electronic}>Electronic</option>
                <option value={categories.health}>Health</option>
                <option value={categories.home}>Home</option>
            </select></div>
            <Input  name="Products quantity"  type="number"  value={state.count.toString()} onChange={(event) => {local_dispatch({type:ActionKind.COUNT, payload: Number(event.currentTarget.value)})}}></Input>
            <Input  name="Price $"  type="number"  value={state.price.toString()} onChange={(event) => {local_dispatch({type:ActionKind.PRICE, payload: Number(event.currentTarget.value)})}}></Input>
            <Input_file text="photo size 512X512 px formats: .jpeg .png .jpg" value={state.photo} GetInput={(event)=>{local_dispatch({type:ActionKind.PHOTO, payload: event.target.files? event.target.files[0] : {}})} } title="Photo"></Input_file>
            <button disabled={Object.keys(state).map(key => Object.create(state)[key] !== "").includes(false)} onClick={()=>{AddOrEdit(state)}} className="admin_page__primary_button" >{id !=='0' ? 'Save Changes':'Add Product'}</button>
        </div>
    );
};

export default AddEditProduct;

