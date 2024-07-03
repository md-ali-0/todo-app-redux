import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseAoi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    tagTypes: ["Todo"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (filter) => {
                const priority = new URLSearchParams();
                if (filter) {
                    priority.append("priority", filter);
                }
                return {
                    method: "GET",
                    url: `/tasks`,
                    params: priority,
                };
            },
            providesTags: ["Todo"],
        }),
        addTodo: builder.mutation({
            query: (data) => {
                return {
                    method: "POST",
                    url: "/task",
                    body: data,
                };
            },
            invalidatesTags: ["Todo"],
        }),
        removeTodo: builder.mutation({
            query: (id) => {
                console.log(id);

                return {
                    method: "DELETE",
                    url: `/task/${id}`,
                };
            },
            invalidatesTags: ["Todo"],
        }),
        updateTodo: builder.mutation({
            query: (taskData) => {
                const id = taskData.id;
                const data = taskData.data;
                return {
                    method: "PUT",
                    url: `/task/${id}`,
                    body: data,
                };
            },
            invalidatesTags: ["Todo"],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useRemoveTodoMutation,
    useUpdateTodoMutation,
} = baseApi;
