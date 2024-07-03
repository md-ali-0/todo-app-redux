import { configureStore } from "@reduxjs/toolkit";

import todoReducer from "@/redux/features/todoSlice";
import { baseApi } from "./api/api";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseApi.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
