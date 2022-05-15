import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../app/models/IUser";

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes:['User'],
  endpoints: (build) => ({
    createUser: build.mutation<IUser, IUser>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: {
          email: data.email,
          token: data.token,
          id: data.id,
        }
      }),
      invalidatesTags: ['User']
    }),
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User']
    })
})
})