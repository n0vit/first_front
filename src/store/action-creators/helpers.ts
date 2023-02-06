
import {Dispatch} from "redux";
import {AxiosError} from "axios";


export const error_handler= (e:unknown, type: any, dispatch: Dispatch)=>{

    if (e instanceof  AxiosError){
        if (e.response !== undefined){
            console.log(e.response.data['message'])
            dispatch({type: type, payload: e.response.data['message']})}
    }
}


export const error_thunk_handler= (e:unknown, rejectWithValue: Function)=>{

    if (e instanceof  AxiosError){
        if (e.response !== undefined) {
            console.log(e.response.data['message'])
            return rejectWithValue(e.response.data['message'])
        }
}
else rejectWithValue("something went wrong")}

