import { configureStore } from '@reduxjs/toolkit'
import {userReducer} from "./reducers/userReduser";
import {productsReducer} from "./reducers/product";



export const store = configureStore({
    reducer: {
        user:userReducer,
        product:productsReducer.reducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
