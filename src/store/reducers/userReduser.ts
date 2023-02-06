import {UserAction, UserActionTypes, UserState} from "../../types/user";
import {ProductI} from "../../models/product";


const  initialState:UserState = {
    products: [],
    cart: [],
    isAuthorized: false,
    loading: false,
    error:null,
    isCustomer: false,
    toastId: 0,
    name: '',
    avatar: '',
    password:'',
    login:''

}



export const  userReducer = (state= initialState, action: UserAction): UserState =>{
    switch (action.type)
    {
        case UserActionTypes.LOGIN:
            return {...state, loading: true}

        case  UserActionTypes.REGISTER:
            return  {...state, isAuthorized: false, loading:true}

        case  UserActionTypes.LOGOUT:
            return  {...state, isAuthorized: false}

        case  UserActionTypes.LOGGED:
            return {...state,isAuthorized: true, loading:false,
                avatar: action.payload.avatar,
                isCustomer: action.payload.isCustomer,
                products: action.payload.products,
                name:action.payload.name,
                cart:action.payload.cart}

        case UserActionTypes.ADD_TO_CART:
            const old_item =  state.cart.some(pr=> pr._id ===action.payload._id)
            let new_cart;
            if(old_item){
               new_cart = state.cart.map((pr)=>{
                    if(pr._id===action.payload._id) { return {...pr,
                        count:  (pr.count ?? 0)+ 1}
                    }
                    else  return pr
                });
            } else {
                action.payload.count = 1;
                new_cart  = state.cart.slice()
                new_cart.push(action.payload)
            }
            const new_state = {...state};
            new_state.cart = new_cart;
            return  new_state;



        case UserActionTypes.REMOVE_FROM_CART:
            let  new_ct = state.cart.map(pr=>{
                if(pr._id===action.payload){
                    if ((pr.count ?? 1) !==1) {
                        return { ...pr, count: (pr.count?? 2) -1}
                    } else  return
                } else return  pr
            })
            new_ct =new_ct.filter(e=>e)
            return {
                ...state, cart: new_ct as Array<ProductI>
            }


        case  UserActionTypes.LOGOUT_ED:
            return {...state, isAuthorized: false, loading:false}

        case  UserActionTypes.TOAST:
            return {...state, toastId: state.toastId +1}

        case  UserActionTypes.ERROR:
            return {...state, error: action.payload, loading:false}
        default:
            return  state
    }

}
