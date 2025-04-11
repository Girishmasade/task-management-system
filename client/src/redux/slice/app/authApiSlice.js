import { apiSlice } from "../apiSlice";

const AUTH_URL = "/auth"

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


        sendVerifyOtp: builder.mutation({
            query: ({ email }) => ({
              url: `${AUTH_URL}/send-verify-otp`,
              method: "POST",
              body: { email }, 
            }),
          }),
          

          verifyEmail: builder.mutation({
            query: (data) => ({
              url: `${AUTH_URL}/verify-email`, 
              method: "POST",                     
              body: data,               
            }),
          }),
          

        registerUser: builder.mutation({ //mutation is used to post, put, update, delete
            query: (data) => ({ //query is used to get the data or Get
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),

        logout: builder.mutation({ 
            query: () => ({ 
                url: `${AUTH_URL}/logout`,
                method: "POST",
                credentials: "include"
            })
        })
    })
})

export const {useLoginMutation, useRegisterUserMutation, useLogoutMutation, useSendVerifyOtpMutation, useVerifyEmailMutation} = authApiSlice