import { apiSlice } from "../apiSlice";

const AUTH_URL = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({ //mutation is used to post, put, update, delete
            query: (data) => ({ //query is used to get the data or Get
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),


             registerUser: builder.mutation({ //mutation is used to post, put, update, delete
            query: (data) => ({ //query is used to get the data or Get
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),

        // registerUserTask: builder.mutation({ //mutation is used to post, put, update, delete
        //     query: (data) => ({ //query is used to get the data or Get
        //         url: `${AUTH_URL}/registerusertask`,
        //         method: "POST",
        //         body: data,
        //         credentials: "include"
        //     })
        // }),

        logout: builder.mutation({ 
            query: () => ({ 
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include"
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useRegisterUserMutation ,useLogoutMutation} = authApiSlice